import React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors} from '../colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const categories = ['Одежда и обувь', 'Еда', 'Компьютеры и техника'];

const Categories = ({navigation}) => {
  const onChangeText = (value) => {
    console.log('value ', value);
  };

  const renderButtonCategory = (item) => {
    const onClick = (item) => {
      console.log('onClick item ', item);
    };

    return (
      <TouchableOpacity style={styles.categoryButtonWrapper} onPress={onClick}>
        <Text style={styles.categoryButtonText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderImageCategory = (item) => {
    const onClick = (item) => {
      console.log('onClick item ', item);
    };

    return (
      <TouchableOpacity style={styles.categoryImageWrapper} onPress={onClick}>
        <Text style={styles.categoryButtonText}>Тут будет картинка</Text>
      </TouchableOpacity>
    );
  };

  const renderProduct = (item) => {
    const onClick = (item) => {
      console.log('onClick item ', item);
    };

    return (
      <TouchableOpacity style={styles.categoryImageWrapper} onPress={onClick}>
        <Text style={styles.categoryButtonText}>Тут будет картинка</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        <TextInput
          style={styles.inputSearch}
          onChangeText={(text) => onChangeText(text)}
          placeholder={'поисковый запрос'}
          placeholderTextColor={colors.black}
          underlineColorAndroid={colors.black}
        />
      </SafeAreaView>
      <View styles={{flex: 1, flexDirection: 'row'}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesWrapper}>
          {categories.map((item) => renderButtonCategory(item))}
        </ScrollView>
      </View>
      <View styles={{flex: 1, flexDirection: 'row', height: 200}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesWrapper}>
          {categories.map((item) => renderImageCategory(item))}
        </ScrollView>
      </View>
      <View>
        <FlatList>

        </FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButtonText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: colors.black,
  },
  categoryImageWrapper: {
    borderRadius: 8,
    height: 220,
    padding: 16,
    marginLeft: 16,
    backgroundColor: colors.gray,
  },
  categoryButtonWrapper: {
    borderRadius: 8,
    height: 53,
    padding: 16,
    marginLeft: 16,
    backgroundColor: colors.gray,
  },
  categoriesWrapper: {
    marginTop: 16,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputSearch: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    width: 288,
    height: 56,
    marginLeft: 16,
    marginTop: 24,
    paddingLeft: 16,
    backgroundColor: colors.gray,
    borderRadius: 8,
  },
});

export default Categories;
