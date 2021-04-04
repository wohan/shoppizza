import {action, observable} from 'mobx';
import React, {useState} from 'react';
import axios from 'axios';
import {create, persist} from 'mobx-persist';
import {AsyncStorage} from 'react-native';

const url =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const token = '3dacbc0dc6db465754879f082b7ed6d33aee76a5';

let config = {
  method: 'post',
  url: url,
  headers: {
    Authorization: 'Token ' + token,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

class BasketStore {
  @persist('list') @observable productsInBasket = [];
  @observable autocomplitAdressList = [];
  @observable loadingAutocomplitAdressList = false;

  @action.bound
  addProduct(product) {
    this.productsInBasket.push(product);
  }

  @action.bound
  delProduct(product) {
    const index = this.productsInBasket.indexOf(product);
    if (index > -1) {
      this.productsInBasket.splice(index, 1);
    }
  }

  @action.bound
  delAllProduct() {
    this.productsInBasket = [];
  }

  @action.bound
  costBasket() {
    let cost = 0;
    this.productsInBasket.forEach((item) => {
      cost = cost + item.count * item.variation.price;
    });
    return cost;
  }

  @action.bound
  updateCountProduct(newCount, product) {
    if (newCount < 0) {
      newCount = 0;
    }
    this.productsInBasket.forEach((item) => {
      if (product.id === item.product.id) {
        item.count = newCount;
      }
    });
  }

  @action.bound
  async autocomplitAdress(adress) {
    this.loadingAutocomplitAdressList = true;
    config.data = JSON.stringify({query: adress});
    await axios(url, config).then((response) => {
      let array = JSON.parse(response.request._response);
      let request = array.suggestions.map((item) => item.value);
      this.loadingAutocomplitAdressList = false;
      if (request.length === 1 && request[0] === adress) {
        this.autocomplitAdressList = [];
      } else {
        this.autocomplitAdressList = request;
      }
    });
  }
}

const basketStore = new BasketStore();
hydrate('basketStore', basketStore).then(() => console.log('basketStore has been hydrated'));

export default basketStore;
