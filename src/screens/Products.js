import React, {useState, useLayoutEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { IconBack, IconFooterProductsList, IconShare } from "../../assets/icon/icons";

const Products = inject(
  'categoryStore',
  'productStore',
)(
  observer(({navigation, categoryStore, productStore, route}) => {
    const {
      products,
      loadFirstList,
      loadNextList,
    } = productStore;

    useLayoutEffect(() => {
      loadFirstList();
    }, []);

    const renderProduct = ({item}) => {
      const onClick = () => {
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
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <Text style={styles.textHeader}>{route.params.item.name}</Text>
          <IconShare />
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
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  textHeader: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    lineHeight: 21,
  },
  headerWrapper: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
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
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Products;
