import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import {
  IconBack,
  IconCursorUp,
  IconEye,
  IconOrder,
} from '../../assets/icon/icons';
import {colors} from '../../assets/colors/colors';

const History = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack />
        </TouchableOpacity>
        <Text style={styles.textHeader}>История заказов</Text>
      </View>
      <View style={styles.headerOrderWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo_1.jpg')}
        />
        <View style={styles.textBrandWrapper}>
          <Text style={styles.textBrand}>Ситипицца</Text>
          <Text style={styles.textNameOrder}>Совместная покупка #1</Text>
        </View>
        <TouchableOpacity>
          <IconCursorUp />
        </TouchableOpacity>
      </View>
      <View style={styles.statusOrderWrapper}>
        <Text style={styles.textStatusTopic}>Статус заказа:</Text>
        <View style={styles.statusWrapper}>
          <Text style={styles.textStatusPay}>Оплачен/</Text>
          <Text style={styles.textStatusShipping}>Доставляется</Text>
        </View>
      </View>
      <View style={styles.statusOrderNumberWrapper}>
        <Text style={styles.textStatusTopic}>Номер заказа:</Text>
        <View style={styles.numberWrapper}>
          <Text style={styles.textNumber}>Z2020-17</Text>
          <IconOrder />
        </View>
      </View>
      <View style={styles.countWrapper}>
        <Text style={styles.textStatusTopic}>Количество товаров:</Text>
        <Text style={styles.textCount}>{`${34} шт`}</Text>
      </View>
      <View style={styles.memberWrapper}>
        <Text style={styles.textStatusTopic}>Участники:</Text>
        <View style={styles.numberWrapper}>
          <Text style={styles.textCount}>{18}</Text>
          <IconEye />
        </View>
      </View>
      <View style={styles.countWrapper}>
        <Text style={styles.textStatusTopic}>Стоимость общего заказа:</Text>
        <Text style={styles.textCount}>{`${52000} ₽`}</Text>
      </View>
    </SafeAreaView>
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
  wrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flex: 1,
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
  headerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 24,
    paddingRight: '30%',
    paddingBottom: 27,
  },
  textHeader: {
    //position: 'absolute',
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default History;
