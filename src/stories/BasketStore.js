import {action, observable} from 'mobx';
import React, {useState} from 'react';
import axios from 'axios';

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

class BasketStore {
  @observable productsInBasket = [
    {name: 'Пицца1', price: 5555},
    {name: 'Пицца1', price: 5555},
    {name: 'Пицца1', price: 5555},
  ];
  @observable autocomplitAdressList = [];
  @observable loadingAutocomplitAdressList = false;

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

export default new BasketStore();
