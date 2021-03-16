import {action, observable} from 'mobx';
import axios from 'axios';
import {api} from './utils';

class CategoryStore {
  @observable categories = [];
  @observable category = {};
  @observable sort = ['name', 'ASC'];
  @observable range = [0, 24];
  @observable filter = {}; // view {"category_id":[20,21,22]}
  @observable loading = true;
  @observable categoryForCarousel = [];

  @action.bound
  async loadCategories() {
    this.loading = true;
    const response = await axios.get(
      api + `Categories?sort=${this.sort}&range=${this.range}`,
    );
    this.categories = response.data;
    this.loading = false;
    // axios
    //   .get(api + `Categories?sort=${this.sort}&range=${this.range}`)
    //   .then((response) => {
    //     this.categories = response.data;
    //     console.log('this.categories555 ', this.categories);
    //     console.log('response.data555 ', response.data);
    //     this.loading = false;
    //   });
  }

  @action.bound
  async loadCategory(id) {
    this.loading = true;
    const response = await axios.get(api + `Categories/${id}`);
    this.category = response.data;
    this.loading = false;
  }
}

export default new CategoryStore();
