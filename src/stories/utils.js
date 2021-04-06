import {create} from 'mobx-persist';
import {AsyncStorage} from 'react-native';

export const api = 'https://test2.sionic.ru/api/';
export const server = 'https://test2.sionic.ru/';

export const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export const typesPay = {CARD: 1, GOOGLE_PAY: 2, APPLE_PAY: 3};

export const statusOrder = {
  CREATE: {status: 1, description: 'Создан'},
  PAID: {status: 2, description: 'Оплачен/Доставляется'},
  DELIVERED: {status: 3, description: 'Доставлен'},
};
