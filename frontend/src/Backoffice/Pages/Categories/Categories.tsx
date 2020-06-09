import React from 'react';
import AdminLayout from '../../Components/Layout/Layout';
import CategoryList from './Components/CategoryList';
import { HeadingTitle } from '../../../global.styles';
import CategoryCreateEdit from './Components/CategoryCreateEdit';

const Categories = () => {
  return (
    <AdminLayout>
      <HeadingTitle>Categories List</HeadingTitle>
      <CategoryList />
      <CategoryCreateEdit />
    </AdminLayout>
  );
};

export default Categories;
