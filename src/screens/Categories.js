import React, {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import {Text, SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconImageCategory} from '../../assets/icon/icons';

const Categories = inject(
  'categoryStore',
  'productStore',
)(
  observer(({navigation, categoryStore, productStore}) => {
    const {loadCategories, categories} = categoryStore;
    const {setFilteredCategory} = productStore;
    useEffect(() => {
      loadCategories();
    }, []);

    const renderButtonCategory = (item) => {
      const onClick = () => {
        setFilteredCategory(item.id);
        navigation.navigate('products', {item});
      };

      return (
        <TouchableOpacity
          style={styles.categoryButtonWrapper}
          onPress={() => onClick()}>
          <View style={styles.categoryWrapper}>
            <IconImageCategory />
            <View style={styles.columnWrapper}>
              <View style={styles.rowOneWrapper}>
                <Text style={styles.textСlothes}>{item.name}</Text>
                <View style={styles.saleWrapper}>
                  <Text style={styles.textBefore}>до</Text>
                  <Text style={styles.textSale}>70%</Text>
                </View>
              </View>
              <View style={styles.rowTwoWrapper}>
                <Text style={styles.productText}>товаров</Text>
                <Text style={styles.saleText}>Скидка на товары</Text>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map((item) => renderButtonCategory(item))}
        </ScrollView>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  productText: {
    color: colors.pink,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
  },
  textSale: {
    color: colors.black,
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    marginLeft: 8,
  },
  textBefore: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
  },
  textСlothes: {
    color: colors.black,
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
  },
  rowOneWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flex: 1,
    marginLeft: 8,
  },
  rowTwoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  saleWrapper: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  categoryWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  columnWrapper: {
    flex: 1,
    marginTop: 4,
    marginBottom: 9,
  },
  categoryButtonWrapper: {
    borderRadius: 8,
    height: 92,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginTop: 7,
    backgroundColor: colors.gray,
    flex: 1,
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
