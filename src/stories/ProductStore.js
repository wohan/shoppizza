import {action, observable} from 'mobx';
import axios from 'axios';
import {api, server} from './utils';

class ProductStore {
  @observable products = [];
  @observable product = {};
  @observable productImages = {};
  @observable productsImages = [];
  @observable productVariations = {};
  @observable productVariationProperties = {};
  @observable productVariationPropertyListValues = {};
  @observable productVariationPropertyValues = {};
  @observable sort = ['name', 'ASC'];
  @observable countLoadProducts = 10;
  @observable currentList = 0;
  @observable range = [0, this.countLoadProducts];
  @observable filter = {};
  @observable loading = false;

  @action.bound
  setProduct(newProduct) {
    this.product = newProduct;
  }

  @action.bound
  async loadProducts(startNumProduct, endNumProduct) {
    this.loading = true;
    const response = await axios.get(
      api + `Products?sort=${this.sort}&range=${[startNumProduct, endNumProduct]}`,
    );
    let products = response.data;
    this.loading = false;
    return response.data;
  }

  @action.bound
  async loadFirstList() {
    console.log('work loadFirstList 1');
    this.products = await this.loadProducts(0, this.countLoadProducts);
    console.log('work loadFirstList 2', this.products);
  }

  @action.bound
  async loadNextList() {
    this.currentList = this.currentList + 1;
    let newStartList = this.currentList * this.countLoadProducts + 1;
    let newEndList = (this.currentList + 1) * this.countLoadProducts;
    let newProducts = await this.loadProducts(newStartList, newEndList);
    this.products = [...this.products, newProducts];
  }

  @action.bound
  async loadProduct(id) {
    this.loading = true;
    const response = await axios.get(api + `Products/${id}`);
    this.product = response.data;
    this.loading = false;
    console.log('this.product ', this.product);
    console.log('response.data ', response.data);
  }

  // @action.bound
  // async loadProductImages(id) {
  //   this.loading = true;
  //   const response = await axios.get(api + `ProductImages/${id}`);
  //   this.productImages = response.data;
  //   this.loading = false;
  //   // console.log('loadProductImages', this.product);
  //   //ProductImages?filter={'product_id':[2001,2002]}
  //   console.log('loadProductImages ', response.data);
  // }

  @action.bound
  async loadProductsImages(ids) {
    this.loading = true;
    const response = await axios
      .get(api + `ProductImages?filter={"product_id":[${ids}]}`)
      .then((response) => {
        let links = response.data;
        links.forEach((item) => {
          item.linkImage = server + item.image_url;
        });
        this.loading = false;
        this.productsImages = links;
      });
  }

  @action.bound
  async loadProductVariations(id) {
    this.loading = true;
    const response = await axios.get(api + `ProductVariations/${id}`);
    this.productVariations = response.data;
    this.loading = false;
    // console.log('this.productVariations ', this.productVariations);
    // console.log('response.data ', response.data);
  }

  @action.bound
  async loadProductVariationProperties(id) {
    this.loading = true;
    const response = await axios.get(api + `ProductVariationProperties/${id}`);
    this.productVariationProperties = response.data;
    this.loading = false;
    // console.log('this.product ', this.productVariationProperties);
    // console.log('response.data ', response.data);
  }

  @action.bound
  async loadProductVariationPropertyListValues(id) {
    this.loading = true;
    const response = await axios.get(
      api + `ProductVariationPropertyListValues/${id}`,
    );
    this.productVariationPropertyListValues = response.data;
    this.loading = false;
    console.log('this.product ', this.productVariationProperties);
    console.log('response.data ', response.data);
  }

  @action.bound
  async loadProductVariationPropertyValues(id) {
    this.loading = true;
    const response = await axios.get(
      api + `ProductVariationPropertyListValues/${id}`,
    );
    this.productVariationPropertyValues = response.data;
    this.loading = false;
    console.log('this.product ', this.productVariationPropertyValues);
    console.log('response.data ', response.data);
  }
}

export default new ProductStore();
