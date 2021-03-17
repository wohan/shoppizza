import React from 'react';
import {IconSmileySuccess} from '../../assets/icon/icons';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PaymentSuccess = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperContent}>
        <IconSmileySuccess />
        <Text style={styles.textHeader}>Поздравляем с покупкой!</Text>
        <View style={styles.costWrapper}>
          <Text style={styles.textCost}>Стоимость: </Text>
          <Text style={styles.numberCost}> 1 400₽</Text>
        </View>
        <View style={styles.percentWrapper}>
          <Text style={styles.textCost}>Ваша выгода: </Text>
          <Text style={styles.numberCost}> 5%</Text>
        </View>
        <Text style={styles.text}>
          Транзакция прошла успешно и ваш заказ поступил в обработку!
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Отслеживать статус заказа</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  costWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentWrapper: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberCost: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  textCost: {
    color: colors.grey,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    textAlign: 'center',
  },
  textButton: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    width: 'auto',
    height: 55,
    backgroundColor: colors.pink,
    borderRadius: 41,
    marginHorizontal: 16,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.grey,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 16,
  },
  textHeader: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
  },
  wrapperContent: {
    marginTop: '40%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default PaymentSuccess;
