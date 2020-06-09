import React from 'react';
import AdminLayout from '../../Components/Layout/Layout';
import ProductList from './Components/ProductList';
import { HeadingTitle } from '../../../global.styles';
import ProductCreateEdit from './Components/ProductCreateEdit';

const Products = () => {
  return (
    <AdminLayout>
      <HeadingTitle>Products List</HeadingTitle>
      <ProductList />
      <ProductCreateEdit />
    </AdminLayout>
  );
};

export default Products;
