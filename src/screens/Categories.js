import React, {useEffect, useState, useLayoutEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconFooterProductsList, IconSearch} from '../../assets/icon/icons';
import {server} from '../stories/utils';

// const categories = ['Одежда и обувь', 'Еда', 'Компьютеры и техника'];

const Categories = inject(
  'categoryStore',
  'productStore',
)(
  observer(({navigation, categoryStore, productStore}) => {
    const {loadCategories, categories, loading} = categoryStore;
    const {
      loadProductsImages,
      products,
      setProduct,
      productsImages,
      loadProducts,
      loadFirstList,
      loadNextList,
      loadProductImages,
    } = productStore;
    let [imagesCarosel, setImagesCarosel] = useState([]);

    useLayoutEffect(() => {
      loadCategories();
      loadProducts();
      loadFirstList();
      loadProductsImages([2001, 2002]);
    }, []);

    const onChangeText = (value) => {
      console.log('value ', value);
    };

    const renderButtonCategory = (item) => {
      const onClick = (item) => {
        console.log('onClick item ', item);
      };

      return (
        <TouchableOpacity
          style={styles.categoryButtonWrapper}
          onPress={onClick}>
          <Text style={styles.categoryButtonText}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    const renderImageCategory = (item) => {
      const onClick = (item) => {
        console.log('onClick item ', item);
      };

      return (
        <TouchableOpacity style={styles.categoryImageWrapper} onPress={onClick}>
          <Image style={styles.categoryImage} source={{uri: item.linkImage}} />
          <Text style={styles.categoryImageText}>Тут будет картинка11</Text>
        </TouchableOpacity>
      );
    };

    const renderProduct = ({item}) => {
      const onClick = () => {
        setProduct(item);
        navigation.navigate('product', {item});
      };

      item.price = 5600;

      return (
        <TouchableOpacity
          style={styles.productWrapper}
          onPress={() => onClick()}>
          <View style={styles.productImageWrapper}>
            <Image
              style={styles.productImage}
              source={{
                uri: 'https://test2.sionic.ru//img/products/601a7316569d1.jpg',
              }}
            />
          </View>
          <View style={styles.productInfoWrapper}>
            <Text style={styles.productInfoHeader}>Ситипицца</Text>
            <Text numberOfLines={1} style={styles.productInfoName}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.productInfoDescription}>
              {item.description}
            </Text>
            <Text style={styles.productInfoPrice}>{item.price}₽</Text>
          </View>
        </TouchableOpacity>
      );
    };

    const renderFooterListProducts = () => {
      return (
        <>
          {productStore.loading && (
            <View style={styles.footerListProductWrapper}>
              <IconFooterProductsList />
            </View>
          )}
        </>
      );
    };

    return (
      <View style={styles.wrapper}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TextInput
              style={styles.inputSearch}
              onChangeText={(text) => onChangeText(text)}
              placeholder={'поисковый запрос'}
              placeholderTextColor={colors.black}
              underlineColorAndroid={colors.black}
            />
            <TouchableOpacity style={styles.searchButtonHeader}>
              <IconSearch />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View styles={{flex: 1, flexDirection: 'row'}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesWrapper}>
            {categories.map((item) => renderButtonCategory(item))}
          </ScrollView>
        </View>
        <View styles={styles.categoriesImageWrapper1}>
          <View styles={styles.categoriesImageWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesImageScrollWrapper}>
              {productsImages.map((item) => renderImageCategory(item))}
            </ScrollView>
          </View>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.name}
            ListFooterComponent={renderFooterListProducts}
            onEndReached={loadNextList}
          />
        </View>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSearch: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    width: 288,
    height: 56,
    marginLeft: 16,
    marginTop: 24,
    paddingLeft: 16,
    backgroundColor: colors.gray,
    borderRadius: 8,
  },
  searchButtonHeader: {
    paddingRight: 16,
    marginTop: 38,
  },
  footerListProductWrapper: {
    alignItems: 'center',
  },
  productInfoHeader: {
    color: colors.pink,
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 18,
    paddingBottom: 6,
  },
  productInfoName: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 21,
    paddingBottom: 6,
    // //whiteSpace: 'nowrap',
    // overflow: 'hidden',

    //textOverflow: 'ellipsis',
  },
  productInfoDescription: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 21,
    paddingBottom: 5,
  },
  productInfoPrice: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 21,
  },
  productImage: {
    width: 119,
    height: 119,
    borderRadius: 6,
  },
  productImageWrapper: {
    // width: '100%',
    // height: '100%',
  },
  productWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
  },
  productInfoWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 19,
    paddingRight: 19,
  },
  categoriesImageWrapper1: {
    height: 220,
    // margin: 30,
    // padding: 30,
    left: '0%',
    right: '45.03%',
    position: 'absolute',
    top: 0,
    backgroundColor: colors.pink,
  },
  categoriesImageWrapper: {
    // flex: 1,
    flexDirection: 'row',
    height: 236,
    margin: 16,
    padding: 16,
    backgroundColor: colors.orange,
  },
  categoryButtonText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: colors.black,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  categoryImageText: {
    left: '24.14%',
    right: '24.14%',
    height: 74,
    borderRadius: 6,
    position: 'absolute',
    top: '30%',
    fontSize: 31,
    textAlign: 'center',
    color: colors.white,
  },
  categoryImageWrapper: {
    borderRadius: 8,
    height: 180,
    width: 319,
    marginLeft: 16,
  },
  categoryButtonWrapper: {
    borderRadius: 8,
    height: 53,
    padding: 16,
    marginLeft: 16,
    backgroundColor: colors.gray,
  },
  categoriesWrapper: {
    marginTop: 16,
  },
  categoriesImageScrollWrapper: {
    paddingTop: 16,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Categories;
