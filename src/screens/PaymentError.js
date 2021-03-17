import React from 'react';
import {IconSmileyError} from '../../assets/icon/icons';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PaymentError = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapperContent}>
        <IconSmileyError />
        <Text style={styles.textHeader}>Покупка не совершена</Text>
        <Text style={styles.text}>
          Транзакция не прошла успешно и ваш заказ не поступил в обработку!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textButton}>Вернуться назад к оплате</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: colors.blue,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
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
    marginTop: '57%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default PaymentError;
