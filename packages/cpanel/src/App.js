import React from "react";
import { Admin, Resource, ShowGuesser } from "react-admin";
import { ProductList, ProductCreate, ProductEdit } from "./endpoints/products";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
} from "./endpoints/categories";

import { AdminCreate, AdminEdit, AdminList } from "./endpoints/admins";
import { OrderList, OrderEdit, OrderShow } from "./endpoints/orders";
import authProvider from "./providers/authProvider";
import dataProvider from "./providers/dataProvider";

export const API_URL = "https://restaurant-server-43443.herokuapp.com/api/v1";
const dp = dataProvider(API_URL);

const App = () => {
  return (
    <Admin dataProvider={dp} authProvider={authProvider}>
      <Resource
        name="products"
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ShowGuesser}
      />
      <Resource
        name="categories"
        list={CategoryList}
        create={CategoryCreate}
        edit={CategoryEdit}
        show={ShowGuesser}
      />
      <Resource
        name="orders"
        list={OrderList}
        edit={OrderEdit}
        show={OrderShow}
      />

      <Resource
        name="admins"
        list={AdminList}
        create={AdminCreate}
        edit={AdminEdit}
        show={ShowGuesser}
      />
    </Admin>
  );
};

export default App;
