import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {inject, observer} from 'mobx-react';
import {server} from '../stories/utils';

const RenderProduct = inject('productStore')(
  observer(({item, onClick, productStore}) => {
    const {loadProductImages, getProductVariations} = productStore;
    const [imageLink, setImageLink] = useState(null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
      loadProductImages(item.id).then((response) => {
        setImageLink(server + response.data[0].image_url);
      });
      let array = getProductVariations(item.id);
      if (array.length > 0) {
        setPrice(array[0].price);
      } else {
        setPrice(null);
      }
    }, []);

    return (
      <TouchableOpacity
        style={styles.productWrapper}
        onPress={() => onClick(item)}>
        <View style={styles.productImageWrapper}>
          {imageLink ? (
            <Image
              style={styles.productImage}
              source={{
                uri: imageLink,
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View style={styles.productInfoWrapper}>
          <Text style={styles.productInfoHeader}>Ситипицца</Text>
          <Text numberOfLines={1} style={styles.productInfoName}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.productInfoDescription}>
            {item.description}
          </Text>
          <Text style={styles.productInfoPrice}>{price}₽</Text>
        </View>
      </TouchableOpacity>
    );
  }),
);

const styles = StyleSheet.create({
  productImageWrapper: {
    width: 119,
    height: 119,
    justifyContent: 'center',
  },
  footerListProductWrapper: {
    alignItems: 'center',
  },
  productInfoHeader: {
    color: colors.pink,
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 18,
    paddingBottom: 6,
  },
  productInfoName: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 21,
    paddingBottom: 6,
  },
  productInfoDescription: {
    color: colors.grey,
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 21,
    paddingBottom: 5,
  },
  productInfoPrice: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 21,
  },
  productImage: {
    width: 119,
    height: 119,
    borderRadius: 6,
  },
  productWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 16,
  },
  productInfoWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 19,
    paddingRight: 19,
  },
});

export default RenderProduct;
