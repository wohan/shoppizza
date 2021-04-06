import {persist} from 'mobx-persist';
import {action, observable} from 'mobx';
import {hydrate} from './utils';

class OrderStore {
  @persist('list') @observable orders = [];

  @action.bound
  addOrder(order) {
    console.log('order', order);
    this.orders.push(order);
  }

  @action.bound
  updateStatus(idOrder, newStatus) {
    this.orders.forEach((item) => {
      if (idOrder === item.id) {
        item.status = newStatus;
      }
    });
  }
}

const orderStore = new OrderStore();
hydrate('orderStore', orderStore);

export default orderStore;
