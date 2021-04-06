import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {inject, observer} from 'mobx-react';
import {IconBack, IconShare} from '../../assets/icon/icons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../assets/colors/colors';
import {onShare} from './utils';
import {server} from '../stories/utils';

const images = [
  {
    image: 'https://test2.sionic.ru//img/products/601a7316569d1.jpg',
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  {
    image: 'https://test2.sionic.ru//img/products/601a7316569d1.jpg',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];

const vars1 = ['30см / 650гр.', '40см / 1050гр. +300₽'];
const vars2 = [
  'Стандартное',
  'Сырный борт +30₽',
  'Тонкое',
  'Мясной борт +200 000₽',
];

const Product = inject(
  'categoryStore',
  'productStore',
  'basketStore',
)(
  observer(({navigation, route, productStore, basketStore}) => {
    const {
      productsVariations,
      productVariations,
      productVariationPropertyValues,
      getProductVariations,
      getProductVariationPropertyValues,
      getAllProductVariationProperty,
      getAllProductVariationPropertyListValues,
      getDataProductVariation,
      loadProductImages,
    } = productStore;
    const {addProduct} = basketStore;
    const {item} = route.params;

    const [linksImage, setLinksImage] = useState([]);
    const [currentTypeProduct, setCurrentTypeProduct] = useState({});
    const [price, setPrice] = useState(0);
    const [productVariationProperty, setProductVariationProperty] = useState(
      [],
    );
    const [
      productVariationPropertyListValues,
      setProductVariationPropertyListValues,
    ] = useState(0);

    useLayoutEffect(() => {
      getProductVariations(item.id);
      getProductVariationPropertyValues();
      getAllProductVariationProperty().then((values) => {
        let ttt = values.map((item) => item.data);
        setProductVariationProperty(ttt);
        console.log('getAllProductVariationProperty333 ', ttt);
      });
      getAllProductVariationPropertyListValues().then((values) => {
        let ttt = values.map((item) => item.data);
        setProductVariationPropertyListValues(ttt);
        console.log('getAllProductVariationPropertyListValues333 ', ttt);
      });
      loadProductImages(item.id).then((response) => {
        let list = [];
        response.data.forEach((value) => {
          list.push({image: server + value.image_url});
        });
        setLinksImage(list);
      });
      console.log('productVariations333 ', productVariations);
      console.log(
        'productVariationPropertyValues333 ',
        productVariationPropertyValues,
      );
    }, []);

    useEffect(() => {
      if (
        productVariationPropertyValues.length > 0 &&
        productVariationProperty.length > 0 &&
        productVariationPropertyListValues.length > 0
      ) {
        let dataVar = getDataProductVariation(
          3,
          productVariationProperty,
          productVariationPropertyListValues,
        );
        console.log('dataVar777 ', dataVar);
      }
    }, [
      productVariationPropertyValues,
      productVariationProperty,
      productVariationPropertyListValues,
    ]);

    const renderVariantProduct = (
      variant,
      selected = currentTypeProduct === variant,
    ) => {
      return (
        <TouchableOpacity
          style={
            selected ? styles.variantWrapper : styles.variantWrapperNotCheck
          }
          onPress={() => setCurrentTypeProduct(variant)}>
          <Text
            style={
              selected ? styles.variantTextSize : styles.variantTextSizeNotCheck
            }>
            {variant.price}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBack />
            </TouchableOpacity>
            <Text style={styles.headerText}>{item.name}</Text>
            <TouchableOpacity onPress={() => onShare()}>
              <IconShare />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollWrapper}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
              height: 416,
            }}>
            {linksImage.length > 0 ? (
              <FlatListSlider
                data={linksImage}
                onPress={() => {}}
                autoscroll={false}
                height={416}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{`От ${price}₽`}</Text>
            <Text style={styles.priceOld}>{`${price}₽`}</Text>
          </View>
          <Text style={styles.textHeading}>Размер</Text>
          <View style={styles.variantProductWrapper}>
            {productVariations.map((item) => renderVariantProduct(item))}
          </View>
          <Text style={{...styles.textHeading, paddingTop: 25}}>Тесто</Text>
          <View style={styles.variantProductWrapper}>
            {vars2.map((item) => renderVariantProduct(item))}
          </View>
          <Text style={{...styles.textHeading, paddingTop: 25}}>Описание</Text>
          <View style={styles.textDescriptionWrapper}>
            <Text style={styles.textDescription}>{item.description}</Text>
          </View>
          <View style={styles.buyButtonWrapper}>
            <View style={styles.buyProductButton}>
              <TouchableOpacity
                onPress={() => {
                  addProduct({
                    count: 1,
                    product: item,
                    variation: currentTypeProduct,
                  });
                  navigation.navigate('basket');
                }}>
                <View style={styles.textBuyProductWrapper}>
                  <Text style={styles.textBuyProduct}>Заказать сейчас</Text>
                  <Text
                    style={
                      styles.textBuyProductPrice
                    }>{`${currentTypeProduct.price}₽`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buyTwoProductButton}>
              <TouchableOpacity
                onPress={() => {
                  addProduct({
                    count: 2,
                    product: item,
                    variation: currentTypeProduct,
                  });
                  navigation.navigate('basket');
                }}>
                <View style={styles.textBuyProductWrapper}>
                  <Text style={styles.textBuyProduct}>Заказать 2 товара</Text>
                  <Text style={styles.textBuyProductPrice}>{`${
                    2 * currentTypeProduct.price
                  }₽`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  textBuyProduct: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
    color: colors.white,
  },
  textBuyProductPrice: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: colors.white,
  },
  textBuyProductWrapper: {
    alignItems: 'center',
  },
  buyTwoProductButton: {
    backgroundColor: colors.blue,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    width: '50%',
    padding: 16,
  },
  buyProductButton: {
    backgroundColor: colors.pink,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    width: '50%',
    padding: 16,
  },
  buyButtonWrapper: {
    flexDirection: 'row',
    marginTop: 33,
    marginBottom: 35,
  },
  textDescriptionWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textDescription: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: colors.grey,
    lineHeight: 24,
  },
  variantTextSize: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '900',
    color: colors.white,
  },
  variantTextSizeNotCheck: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '900',
    color: colors.black,
  },
  variantWrapper: {
    marginTop: 8,
    marginLeft: 8,
    backgroundColor: colors.pink,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.pink,
  },
  variantWrapperNotCheck: {
    marginTop: 8,
    marginLeft: 8,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
  },
  variantProductWrapper: {
    flex: 1,
    paddingTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: 8,
  },
  textHeading: {
    fontWeight: '500',
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    marginTop: 3,
    marginLeft: 16,
  },
  scrollWrapper: {
    height: '90%',
  },
  price: {
    fontFamily: 'Montserrat-Regular',
    color: colors.blue,
    fontSize: 32,
    fontWeight: '800',
  },
  priceOld: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.gray,
    textDecorationLine: 'line-through',
    fontWeight: '400',
    marginLeft: 16,
    marginTop: 13,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginTop: 16,
  },
  headerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 24,
    paddingRight: 14,
    paddingLeft: 16,
    paddingBottom: 20,
  },
  headerText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Product;
