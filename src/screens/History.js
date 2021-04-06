import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconBack} from '../../assets/icon/icons';
import {colors} from '../../assets/colors/colors';
import {inject, observer} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {ScrollView} from 'react-native-gesture-handler';
import RenderOrder from '../components/RenderOrder';

const History = inject('orderStore')(
  observer(({navigation, orderStore}) => {
    const {orders} = orderStore;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <Text style={styles.textHeader}>История заказов</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orders.map((item) => (
            <RenderOrder order={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    flex: 1,
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
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default History;
