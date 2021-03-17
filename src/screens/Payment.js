import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {IconBack, IconOrder, IconSuccess} from '../../assets/icon/icons';
import {colors} from '../../assets/colors/colors';

const Payment = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Оплата</Text>
      </View>
      <View style={styles.orderWrapper}>
        <Text style={styles.textNumberOrder}>Номер заказа </Text>
        <Text style={styles.numberOrder}> Z2020-17</Text>
        <TouchableOpacity style={styles.orderWrapper}>
          <IconOrder />
        </TouchableOpacity>
      </View>
      <View style={styles.bankCardWrapper}>
        <IconSuccess />
        <Text style={styles.textBankCard}>Оплата банковской картой</Text>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={styles.totalDescription}>Стоимость товаров:</Text>
        <Text style={styles.totalValue}>11 584₽</Text>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={styles.totalDescription}>
          Стоимость доставки поставщиком:
        </Text>
        <Text style={styles.totalValue}>11 584₽</Text>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={styles.totalDescription}>Стоимость доставки до вас:</Text>
        <Text style={styles.totalValue}>11 584₽</Text>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={styles.totalDescription}>Итого:</Text>
        <Text style={styles.totalValue}>11 584₽</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonSelect}
        // onPress={() => navigation.navigate('paymentsuccess')}>
        onPress={() => navigation.navigate('paymenterror')}>
        <Text style={styles.textSelect}>Выбрать</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textSelect: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: colors.white,
  },
  buttonSelect: {
    width: 'auto',
    height: 55,
    backgroundColor: colors.pink,
    borderRadius: 41,
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: colors.grey,
  },
  totalDescription: {
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: colors.grey,
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  textBankCard: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    lineHeight: 21,
    marginLeft: 8,
  },
  bankCardWrapper: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIconWrapper: {
    marginLeft: 11,
  },
  numberOrder: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    lineHeight: 24,
  },
  textNumberOrder: {
    color: colors.grey,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    lineHeight: 24,
  },
  orderWrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  textHeader: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    lineHeight: 21,
  },
  headerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 24,
    paddingRight: '40%',
    paddingLeft: 16,
    paddingBottom: 27,
  },
});

export default Payment;
