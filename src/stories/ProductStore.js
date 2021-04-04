import {action, computed, observable} from 'mobx';
import axios from 'axios';
import {api, server} from './utils';

class ProductStore {
  @observable products = [];
  @observable product = {};
  @observable productImages = {};
  @observable productsImages = [];
  @observable productVariations = [];
  @observable productsVariations = [];
  @observable productVariationPropertyValues = [];
  @observable productsVariationPropertyValues = [];
  @observable productVariationProperties = [];
  @observable productVariationProperty = {};
  @observable productVariationPropertyListValues = [];
  @observable sort = ['name', 'ASC'];
  @observable countLoadProducts = 10;
  @observable currentList = 0;
  @observable range = [0, this.countLoadProducts];
  @observable filter = {};
  @observable loading = false;
  @observable filteredCategory = undefined;

  @action.bound
  setProduct(newProduct) {
    this.product = newProduct;
  }

  @action.bound
  setFilteredCategory(idCategory) {
    this.filteredCategory = idCategory;
  }

  @action.bound
  async loadProducts(startNumProduct, endNumProduct) {
    this.loading = true;
    const response = await axios.get(
      api +
        `Products?sort=${this.sort}
      &range=${[startNumProduct, endNumProduct]}
      &filter={"category_id":${this.filteredCategory}}`,
    );
    this.loading = false;
    return response.data;
  }

  @action.bound
  async loadFirstList() {
    this.products = await this.loadProducts(0, this.countLoadProducts);
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

  @action.bound
  async loadProductsImages(ids) {
    this.loading = true;
    axios
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

  loadProductImages(id) {
    return axios.get(api + `ProductImages?filter={"product_id":[${id}]}`);
  }

  @action.bound
  async loadProductsVariations() {
    console.log('workloadProductsVariations!');
    const response = await axios.get(api + 'ProductVariations');
    this.productsVariations = response.data;
  }

  @action.bound
  getProductVariations(idProduct) {
    this.productVariations = this.productsVariations
      .filter((item) => item.product_id === idProduct)
      .sort((item1, item2) => item1.price - item2.price);
    return this.productVariations;
  }

  // @action.bound
  loadProductVariationProperty(id) {
    return axios.get(api + `ProductVariationProperties/${id}`);
    //this.productVariationProperties = response.data;
    // return response.data;
  }

  // @action.bound
  loadProductVariationPropertyListValues(id) {
    //this.loading = true;
    return axios.get(api + `ProductVariationPropertyListValues/${id}`);
    // return response.data;
    // this.productVariationPropertyListValues = response.data;
    // this.loading = false;
    // console.log(
    //   'this.productVariationPropertyListValues ',
    //   this.productVariationPropertyListValues,
    // );
  }

  @action.bound
  async loadProductsVariationPropertyValues() {
    const response = await axios.get(api + 'ProductVariationPropertyValues/');
    this.productsVariationPropertyValues = response.data;
  }

  // @action.bound
  // getProductVariationPropertyValues(idProductVariationId) {
  //   this.productVariationPropertyValues = this.productsVariationPropertyValues.filter(
  //     (item) => item.product_variation_id === idProductVariationId,
  //   );
  // }

  @action.bound
  getProductVariationPropertyValues() {
    let propertyValues = [];
    this.productVariations.forEach((itemVariation) => {
      let productVariationPropertyValues = this.productsVariationPropertyValues.filter(
        (item) => item.product_variation_id === itemVariation.id,
      );
      propertyValues.push(...productVariationPropertyValues);
    });
    this.productVariationPropertyValues = propertyValues;
  }

  @action.bound
  getAllProductVariationProperty() {
    let stIdsProductVariationProperty = new Set();
    this.productVariationPropertyValues
      .filter((item) => item.product_variation_property_id !== null)
      .forEach((item) =>
        stIdsProductVariationProperty.add(item.product_variation_property_id),
      );

    return Promise.all(
      Array.from(stIdsProductVariationProperty).map((item) =>
        axios.get(api + `ProductVariationProperties/${item}`),
      ),
    );
  }

  @action.bound
  getAllProductVariationPropertyListValues() {
    let stIdsProductVariationPropertyListValues = new Set();
    this.productVariationPropertyValues
      .filter((item) => item.product_variation_property_list_value_id !== null)
      .forEach((item) =>
        stIdsProductVariationPropertyListValues.add(
          item.product_variation_property_list_value_id,
        ),
      );

    return Promise.all(
      Array.from(stIdsProductVariationPropertyListValues).map((item) =>
        axios.get(api + `ProductVariationPropertyListValues/${item}`),
      ),
    );
  }

  @action.bound
  getDataProductVariation(
    idVariation,
    productVariationProperty,
    productVariationPropertyListValues,
  ) {
    let productsVariationPropertyValues = this.productVariationPropertyValues.filter(
      (item) => {
        item.product_variation_id === idVariation;
      },
    );
    let variationProperty = [];
    productsVariationPropertyValues.forEach((itemValues) => {
      let tmp = productVariationProperty.filter((item) => {
        item.id === itemValues.product_variation_property_id;
      });
      variationProperty.push(...tmp);
    });
    let variationPropertyListValues = [];
    productsVariationPropertyValues.forEach((itemValues) => {
      let tmp = productVariationPropertyListValues.filter((item) => {
        item.id === itemValues.product_variation_property_list_value_id;
      });
      variationPropertyListValues.push(...tmp);
    });
    return {
      productsVariationPropertyValues,
      variationProperty,
      variationPropertyListValues,
    };
  }
}

export default new ProductStore();
