import React from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {
  IconBasket,
  IconButtonDown,
  IconButtonUp,
} from '../../assets/icon/icons';
import {inject, observer} from 'mobx-react';

const Basket = inject('basketStore')(
  observer(({navigation, basketStore}) => {
    const {productsInBasket} = basketStore;

    const renderItem = (product) => {
      product.cacheBack = 300;

      return (
        <View style={styles.productWrapper}>
          <Image
            style={styles.imageProduct}
            source={require('../../assets/images/logo_1.jpg')}
          />
          <View style={styles.descriptionWrapper}>
            <View style={styles.nameProductWrapper}>
              <Text style={styles.nameProduct}>{product.name}</Text>
              <Text style={styles.priceProduct}>{`${product.price}₽`}</Text>
            </View>
            <View style={styles.descriptionProductWrapper}>
              <Text style={styles.nameBrand}>Ситипицца</Text>
              <Text
                style={
                  styles.cacheBackInfo
                }>{`${product.cacheBack}₽ кешбека`}</Text>
            </View>
            <View style={styles.controlProductWrapper}>
              <View style={styles.controlCountProductWrapper}>
                <TextInput style={styles.countProduct} />
                <TouchableOpacity style={styles.downButton}>
                  <IconButtonDown />
                </TouchableOpacity>
                <TouchableOpacity style={styles.upButton}>
                  <IconButtonUp />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <IconBasket />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.textHeader}>Корзина</Text>
        </View>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo_1.jpg')}
          />
          <Text style={styles.textLogo}>Ситипицца</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.textBasket}>Моя корзина</Text>
          <Text style={styles.clearBasketButton}>Очистить корзину</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {productsInBasket.map((item) => renderItem(item))}
        </ScrollView>
        <View style={styles.footerWrapper}>
          <View style={styles.footerTextWrapper}>
            <Text style={styles.textCostBasket}>Стоимость корзины:</Text>
            <TouchableOpacity onPress={() => navigation.navigate('delivery')}>
              <Text style={styles.toRegistrationButton}>К оформлению</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.costProducts}>{`${10000}₽`}</Text>
        </View>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  scrollView: {
    height: '80%',
  },
  costProducts: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    paddingLeft: 16,
    paddingBottom: 12,
  },
  toRegistrationButton: {
    color: colors.white,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
  },
  textCostBasket: {
    color: colors.white,
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  footerTextWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
    justifyContent: 'space-between',
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: colors.blue,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  countProduct: {
    width: 54,
    height: 29,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    backgroundColor: colors.white,
    textAlign: 'center',
  },
  cacheBackInfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: colors.black,
  },
  nameBrand: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.pink,
  },
  priceProduct: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    lineHeight: 19,
    paddingTop: 2,
  },
  nameProduct: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
  },
  downButton: {
    paddingLeft: 8,
  },
  upButton: {
    paddingLeft: 4,
  },
  controlCountProductWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlProductWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  nameProductWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 5,
  },
  descriptionWrapper: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 8,
  },
  descriptionProductWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  productWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  imageProduct: {
    width: 51,
    height: 51,
    borderRadius: 6,
    paddingRight: 8,
  },
  clearBasketButton: {
    color: colors.red,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    lineHeight: 21,
    paddingLeft: 8,
  },
  textBasket: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    lineHeight: 22,
    paddingLeft: 8,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  image: {
    width: 60,
    height: 60,
  },
  textLogo: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    lineHeight: 20,
    paddingLeft: 8,
  },
  logoWrapper: {
    paddingTop: 24,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    lineHeight: 21,
    paddingTop: 24,
  },
  headerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
});

export default Basket;
