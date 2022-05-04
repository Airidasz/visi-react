export const productModel = {
  name: '',
  codename: '',
  description: '',
  price: '',
  quantity: '',
  categories: [],
  public: false,
  shop: {},
};

export const addressModel = { city: '', postalCode: '', street: '' };

export const shopModel = {
  name: '',
  description: '',
  locations: [],
  address: null,
};

export const orderModel = {
  orderedProducts: null,
  address: null,
  paymentType: null,
  cancelIfMissing: false,
  note: null,
  user: {
    temporary: null,
    email: null,
  },
};
