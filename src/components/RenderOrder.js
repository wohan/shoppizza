import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconCursorUp, IconEye, IconOrder} from '../../assets/icon/icons';
import {colors} from '../../assets/colors/colors';

const RenderOrder = ({order}) => {
  const [showOrder, setShowOrder] = useState(false);

  const countProducts = () => {
    let count = 0;
    order.products.forEach((item) => {
      count = count + item.count;
    });
    return count;
  };

  const costBasket = () => {
    let cost = 0;
    order.products.forEach((item) => {
      cost = cost + item.count * item.variation.price;
    });
    return cost;
  };

  return (
    <View>
      <View style={styles.headerOrderWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo_1.jpg')}
        />
        <View style={styles.textBrandWrapper}>
          <Text style={styles.textBrand}>Ситипицца</Text>
          <Text style={styles.textNameOrder}>Совместная покупка #1</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowOrder(!showOrder)}
          style={{transform: [{rotate: showOrder ? '0deg' : '180deg'}]}}>
          <IconCursorUp />
        </TouchableOpacity>
      </View>
      <View style={{display: !showOrder ? 'none' : ''}}>
        <View style={styles.statusOrderWrapper}>
          <Text style={styles.textStatusTopic}>Статус заказа:</Text>
          <View style={styles.statusWrapper}>
            <Text style={styles.textStatusPay}>{order.status.description}</Text>
            {/*<Text style={styles.textStatusShipping}>Доставляется</Text>*/}
          </View>
        </View>
        <View style={styles.statusOrderNumberWrapper}>
          <Text style={styles.textStatusTopic}>Номер заказа:</Text>
          <View style={styles.numberWrapper}>
            <Text style={styles.textNumber}>{order.number}</Text>
            <IconOrder />
          </View>
        </View>
        <View style={styles.countWrapper}>
          <Text style={styles.textStatusTopic}>Количество товаров:</Text>
          <Text style={styles.textCount}>{`${countProducts()} шт`}</Text>
        </View>
        <View style={styles.memberWrapper}>
          <Text style={styles.textStatusTopic}>Участники:</Text>
          <View style={styles.numberWrapper}>
            <Text style={styles.textCount}>{order.members}</Text>
            <IconEye />
          </View>
        </View>
        <View style={styles.countWrapper}>
          <Text style={styles.textStatusTopic}>Стоимость общего заказа:</Text>
          <Text style={styles.textCount}>{`${costBasket() + 500} ₽`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  memberWrapper: {
    flexDirection: 'row',
    marginTop: 19,
    justifyContent: 'space-between',
  },
  textCount: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    paddingRight: 11,
  },
  countWrapper: {
    flexDirection: 'row',
    marginTop: 11,
    justifyContent: 'space-between',
  },
  textNumber: {
    color: colors.blue,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    paddingRight: 11,
  },
  numberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusOrderNumberWrapper: {
    flexDirection: 'row',
    marginTop: 19,
    justifyContent: 'space-between',
  },
  textStatusShipping: {
    color: colors.green,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  textStatusPay: {
    color: colors.green,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  textStatusTopic: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
  },
  statusWrapper: {
    flexDirection: 'row',
  },
  statusOrderWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  textBrandWrapper: {
    flex: 1,
    marginLeft: 8.5,
  },
  textNameOrder: {
    color: colors.pink,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    marginTop: 4,
  },
  textBrand: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
  },
  image: {
    width: 60,
    height: 60,
  },
  headerOrderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default RenderOrder;
