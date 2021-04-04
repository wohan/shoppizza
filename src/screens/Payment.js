import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import {
  IconApplePay,
  IconBack,
  IconGooglePay,
  IconOrder,
  IconSuccess,
} from '../../assets/icon/icons';
import {colors} from '../../assets/colors/colors';
import {inject, observer} from 'mobx-react';

const windowWidth = Dimensions.get('window').width;

const typesPay = {CARD: 1, GOOGLE_PAY: 2, APPLE_PAY: 3};

const Payment = inject('basketStore')(
  observer(({navigation, basketStore}) => {
    const {costBasket} = basketStore;
    const [showModalPay, setShowModalPay] = useState(false);
    const [typePay, setTypePay] = useState(typesPay.CARD);

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
        <TouchableOpacity
          onPress={() => setShowModalPay(true)}
          style={styles.bankCardWrapper}>
          <IconSuccess />
          {typePay === typesPay.CARD ? (
            <Text style={styles.textBankCard}>Оплата банковской картой</Text>
          ) : Platform.OS === 'ios' ? (
            <View style={styles.iconPay}>
              <IconApplePay />
            </View>
          ) : (
            <View style={styles.iconPay}>
              <IconGooglePay />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalDescription}>Стоимость товаров:</Text>
          <Text style={styles.totalValue}>{costBasket}₽</Text>
        </View>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalDescription}>
            Стоимость доставки поставщиком:
          </Text>
          <Text style={styles.totalValue}>500₽</Text>
        </View>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalDescription}>
            Стоимость доставки до вас:
          </Text>
          <Text style={styles.totalValue}>500₽</Text>
        </View>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalDescription}>Итого:</Text>
          <Text style={styles.totalValue}>{500 + costBasket}₽</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonSelect}
          // onPress={() => navigation.navigate('paymentsuccess')}>
          onPress={() => navigation.navigate('paymenterror')}>
          <Text style={styles.textSelect}>Выбрать</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={showModalPay}>
          <View style={styles.modalWrapper}>
            <Text style={styles.textHeaderModal}>Метод оплаты</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModalPay(false);
                setTypePay(
                  Platform.OS === 'ios'
                    ? typesPay.APPLE_PAY
                    : typesPay.GOOGLE_PAY,
                );
              }}
              style={styles.buttonPaySystem}>
              {Platform.OS === 'ios' ? <IconApplePay /> : <IconGooglePay />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModalPay(false);
                setTypePay(typesPay.CARD);
              }}
              style={styles.buttonPayCard}>
              <Text style={styles.textButtonPayCard}>Банковская карта</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  iconPay: {
    paddingLeft: 14,
    paddingTop: 4,
  },
  textButtonPayCard: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'center',
  },
  buttonPayCard: {
    paddingHorizontal: 24,
    width: 312,
    height: 58,
    backgroundColor: colors.blue,
    borderRadius: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonPaySystem: {
    paddingHorizontal: 24,
    width: 312,
    height: 58,
    backgroundColor: colors.whiteGray,
    borderRadius: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeaderModal: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    lineHeight: 21,
    marginTop: 32,
    marginBottom: 24,
  },
  modalWrapper: {
    width: 360,
    height: 230,
    backgroundColor: colors.white,
    borderRadius: 8,
    top: '30%',
    left: (windowWidth - 360) / 2,
    alignItems: 'center',
  },
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
