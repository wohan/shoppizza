import React, {useEffect, useState, useLayoutEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  IconBack,
  IconFooterProductsList, IconImageCategory,
  IconSearch,
} from "../../assets/icon/icons";
import {server} from '../stories/utils';

const categories = ['Одежда и обувь', 'Еда', 'Компьютеры и техника'];

const Categories = inject(
  'categoryStore',
  'productStore',
)(
  observer(({navigation, categoryStore, productStore}) => {
    const renderButtonCategory = (item) => {
      const onClick = (item) => {
        console.log('onClick item ', item);
      };

      return (
        <TouchableOpacity
          style={styles.categoryButtonWrapper}
          onPress={onClick}>
          <View style={styles.categoryWrapper}>
            <IconImageCategory />
            <View>
              <View style={styles.rowOneWrapper}>
                <Text style={styles.textСlothes}>Одежда и обувь</Text>
                <View style={styles.rowOneWrapper}>
                  <Text style={styles.textBefore}>до </Text>
                  <Text style={styles.textSale}>70%</Text>
                </View>
              </View>
              <View style={styles.rowOneWrapper}>
                <Text style={styles.categoryButtonText}>товаров</Text>
                <Text style={styles.categoryButtonText}>Скидка на товары</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.textHeader}>Категории</Text>
        </View>
        <ScrollView>
          {categories.map((item) => renderButtonCategory(item))}
        </ScrollView>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  textSale: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    marginTop: 2,
    marginLeft: 8,
  },
  textBefore: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    marginTop: 2,
    marginLeft: 8,
  },
  textСlothes: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    marginTop: 2,
    marginLeft: 8,
  },
  rowOneWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  categoryButtonWrapper: {
    borderRadius: 8,
    height: 92,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 7,
    backgroundColor: colors.gray,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textHeader: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '500',
    lineHeight: 21,
  },
  headerWrapper: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 27,
  },
});

export default Categories;
