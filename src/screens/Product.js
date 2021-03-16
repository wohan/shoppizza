import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {inject, observer} from 'mobx-react';
import {IconBack, IconShare} from '../../assets/icon/icons';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../assets/colors/colors';

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

const Product = inject(
  'categoryStore',
  'productStore',
)(
  observer(({navigation, route, productStore}) => {
    const {product} = productStore;

    console.log('route.params  ', route.params);

    // const { item } = route.params;

    return (
      <View>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBack />
            </TouchableOpacity>
            <Text style={styles.headerText}>{product.name}</Text>
            <IconShare />
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
              width: 328,
              height: 316,
            }}>
            <FlatListSlider
              data={images}
              autoscroll={false}
              width={328}
              height={316}
            />
          </View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{`От ${product.price}₽`}</Text>
            <Text style={styles.priceOld}>{`${product.price}₽`}</Text>
          </View>
          <Text style={styles.textHeading}>Размер</Text>
          <View style={styles.sizeProductSizeWrapper}>
            <View style={styles.sizeWrapper}>
              <Text style={styles.textSize}>30см / 650гр.</Text>
            </View>
            <View style={styles.sizeWrapperNotCheck}>
              <Text style={styles.textSizeNotCheck}>40см / 1050гр. +300₽</Text>
            </View>
          </View>
          <Text style={{...styles.textHeading, paddingTop: 25}}>Тесто</Text>
          <View style={styles.sizeProductSizeWrapper}>
            <View style={styles.sizeWrapper}>
              <Text style={styles.textSize}>Стандартное</Text>
            </View>
            <View style={styles.sizeWrapperNotCheck}>
              <Text style={styles.textSizeNotCheck}>Сырный борт +30₽</Text>
            </View>
            <View style={styles.sizeWrapperNotCheck}>
              <Text style={styles.textSizeNotCheck}>Тонкое</Text>
            </View>
            <View style={styles.sizeWrapperNotCheck}>
              <Text style={styles.textSizeNotCheck}>Мясной борт +200 000₽</Text>
            </View>
          </View>
          <Text style={{...styles.textHeading, paddingTop: 25}}>Описание</Text>
          <View style={styles.textDescriptionWrapper}>
            <Text style={styles.textDescription}>
              Соус «Барбекю», сыр «Моцарелла», колбаса «Пепперони», куриные
              грудки, бекон, петрушка
            </Text>
          </View>
          <View style={styles.buyButtonWrapper}>
            <View style={styles.buyProductButton}>
              <TouchableOpacity>
                <View style={styles.textBuyProductWrapper}>
                  <Text style={styles.textBuyProduct}>Заказать сейчас</Text>
                  <Text style={styles.textBuyProductPrice}>5600₽</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buyTwoProductButton}>
              <TouchableOpacity>
                <View style={styles.textBuyProductWrapper}>
                  <Text style={styles.textBuyProduct}>Заказать 2 товара</Text>
                  <Text style={styles.textBuyProductPrice}>5600₽</Text>
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
  textSize: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '900',
    color: colors.white,
  },
  textSizeNotCheck: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '900',
    color: colors.black,
  },
  sizeWrapper: {
    backgroundColor: colors.pink,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
  },
  sizeWrapperNotCheck: {
    paddingLeft: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 35,
    borderWidth: 1,
  },
  sizeProductSizeWrapper: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
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
