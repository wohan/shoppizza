import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../assets/colors/colors';
import {IconBack} from '../../assets/icon/icons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import 'moment/locale/ru';
import Autocomplete from 'react-native-autocomplete-input';
import {statusOrder} from '../stories/utils';
moment.locale('ru');

const Delivery = inject(
  'basketStore',
  'orderStore',
)(
  observer(({navigation, basketStore, orderStore}) => {
    const {
      adress,
      productsInBasket,
      autocomplitAdress,
      autocomplitAdressList,
      costBasket,
      setAdress,
      delAllProduct,
    } = basketStore;
    const {addOrder, orders} = orderStore;

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeAdress = (value, field) => {
      if (field === 'adress') {
        autocomplitAdress(value);
      }
      setAdress({...adress, [field]: value});
    };

    const createOrder = () => {
      let idOrder = new Date().getUTCMilliseconds();
      let order = {
        id: idOrder,
        products: productsInBasket.map((product) => ({...product})),
        adress,
        status: statusOrder.CREATE,
        number: `Z${moment(new Date()).format('YYYY')}-${orders.length}`,
        members: 18,
      };
      addOrder(order);
      //delAllProduct();
      navigation.navigate('payment', {order});
    };

    return (
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Доставка</Text>
        </View>
        <ScrollView>
          <View style={styles.deliveryWrapper}>
            <View style={styles.dateDeliveryWrapper}>
              <Text style={styles.textDelivery}>Когда доставить?</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(!showDatePicker)}>
                <Text style={styles.changedDate}>Выбрать дату</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.datePickerWrapper}>
              {showDatePicker && (
                <DatePicker
                  locale={'ru'}
                  date={new Date(adress.date)}
                  onDateChange={(date) => onChangeAdress(date, 'date')}
                />
              )}
            </View>
            <View style={styles.dateWrapper}>
              <Text style={styles.textDate}>Дата и время:</Text>
              <Text style={styles.currentDate}>
                {moment(new Date(adress.date)).format(
                  'DD MMMM, dd, YYYY/hh:mm',
                )}
              </Text>
            </View>
            <Text style={styles.textQuestion}>Куда доставить?</Text>
            <Autocomplete
              style={styles.inputAdress}
              inputContainerStyle={styles.inputAdressWrapper}
              data={autocomplitAdressList}
              defaultValue={adress.adress}
              onChangeText={(value) => onChangeAdress(value, 'adress')}
              renderItem={({item, i}) => (
                <TouchableOpacity
                  onPress={() => onChangeAdress(item, 'adress')}>
                  <Text style={styles.textAutocomplete}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            {false && (
              <Text style={styles.textAdressNotCorrect}>
                Адрес вне зоны доставки поставщика
              </Text>
            )}
            <View style={styles.inputRowWrapper}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputDescription}>Подъезд</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={adress.entrance.toString()}
                  onChangeText={(value) => onChangeAdress(value, 'entrance')}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputDescription}>Этаж</Text>
                <TextInput
                  onChangeText={(value) => onChangeAdress(value, 'floor')}
                  style={styles.input}
                  value={adress.floor.toString()}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.inputRowWrapper}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputDescription}>Офис/квартира</Text>
                <TextInput
                  onChangeText={(value) => onChangeAdress(value, 'apartment')}
                  style={styles.input}
                  value={adress.apartment.toString()}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputDescription}>Домофон</Text>
                <TextInput
                  keyboardType="numeric"
                  value={adress.intercom.toString()}
                  onChangeText={(value) => onChangeAdress(value, 'intercom')}
                  style={styles.input}
                />
              </View>
            </View>
            <View style={styles.checkBoxWrapper}>
              <CheckBox
                tintColor={colors.white}
                onTintColor={colors.white}
                onCheckColor={colors.white}
                style={styles.checkBox}
                value={adress.otherMan}
                boxType={'square'}
                onValueChange={(value) => onChangeAdress(value, 'otherMan')}
              />
              <Text style={styles.checkBoxDescription}>
                Посылку примет другой человек.
              </Text>
            </View>
            <TextInput
              placeholder={'Имя'}
              value={adress.name.toString()}
              onChangeText={(value) => onChangeAdress(value, 'name')}
              style={styles.inputName}
            />
            <TextInput
              placeholder={'Номер телефона'}
              value={adress.phone.toString()}
              keyboardType="numeric"
              onChangeText={(value) => onChangeAdress(value, 'phone')}
              style={styles.inputPhone}
            />
          </View>
          <View style={styles.costWrapper}>
            <View style={styles.totalWrapper}>
              <Text style={styles.totalDescription}>Стоимость товаров:</Text>
              <Text style={styles.totalValue}>{costBasket}₽</Text>
            </View>
            <View style={styles.totalWrapper}>
              <Text style={styles.totalDescription}>Стоимость доставки:</Text>
              <Text style={styles.totalValue}>500₽</Text>
            </View>
            <View style={styles.totalWrapper}>
              <Text style={styles.totalDescription}>Итого:</Text>
              <Text style={styles.totalValue}>{500 + costBasket}₽</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonOrder}
              onPress={() => createOrder()}>
              <Text style={styles.textButtonOrder}>{`Заказать за ${
                500 + costBasket
              }₽`}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  textAutocomplete: {
    marginHorizontal: 30,
    marginVertical: 10,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  datePickerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonOrder: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: colors.white,
    textAlign: 'center',
  },
  buttonOrder: {
    flex: 1,
    height: 56,
    paddingTop: 16,
    marginTop: 16,
    marginBottom: 70,
    backgroundColor: colors.pink,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  costWrapper: {
    backgroundColor: colors.white,
    paddingTop: 8,
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
  checkBox: {
    width: 16,
    height: 16,
    backgroundColor: colors.red,
    color: colors.white,
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  inputRowWrapper: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 56,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 14,
    paddingHorizontal: 16,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  checkBoxDescription: {
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 16,
  },
  inputDescription: {
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'column',
    width: '50%',
  },
  textAdressNotCorrect: {
    color: colors.red,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    paddingHorizontal: 25,
    paddingTop: 5,
  },
  inputName: {
    flex: 1,
    height: 56,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  inputPhone: {
    flex: 1,
    height: 56,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 14,
    marginTop: 24,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  inputAdressWrapper: {
    borderWidth: 0,
  },
  inputAdress: {
    flex: 1,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 14,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 19,
  },
  textQuestion: {
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 16,
  },
  currentDate: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    color: colors.grey,
  },
  textDate: {
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 20,
  },
  changedDate: {
    color: colors.blue,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
  },
  textDelivery: {
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
  },
  deliveryWrapper: {
    backgroundColor: colors.white,
    paddingBottom: 38,
    marginBottom: 8,
    flex: 1,
  },
  dateDeliveryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 25,
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
  wrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
});

export default Delivery;
