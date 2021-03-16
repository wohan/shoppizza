import { observable } from "mobx";

class BasketStore {
  @observable productsInBasket = [{name: 'Пицца1', price: 5555}, {name: 'Пицца1', price: 5555}, {name: 'Пицца1', price: 5555}];
}

export default new BasketStore();
