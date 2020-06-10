import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBBtnToolbar, MDBDataTableV5 } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../create-store.config';
import CategoryService from '../../../../Services/CategoryService';
import { categoriesSlice } from '../../../../Store/categoriesSlice';
import ProductService from '../../../../Services/ProductService';
import { productSlice } from '../../../../Store/productSlice';
import { loadersSlice } from '../../../../Store/loadersSlice';
import { useToasts } from 'react-toast-notifications';

const CategoryList = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const {addToast} = useToasts();
  const [datatable, setDatatable] = React.useState<any>({
    columns: [
      {
        label: 'Id',
        field: 'id',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Id',
        },
      },
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Options',
        field: 'options',
        width: 150,
      },
    ],
    rows: [],
  },
  );
  useEffect(() => {
    setDatatable(
      {
        columns: [
          {
            label: 'Id',
            field: 'id',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Id',
            },
          },
          {
            label: 'Name',
            field: 'name',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Name',
            },
          },
          {
            label: 'Options',
            field: 'options',
            width: 150,
          },
        ],
        rows: categories.map(cat => ({
          name: cat.name,
          id: cat._id,
          options: [
            <MDBBtn key={'1'} color={'danger'} onClick={ async () => {
              // Remove Category
              const removeCategoryResponse = await CategoryService.removeCategories({ ids: cat._id });
              if(removeCategoryResponse.hasError) {
                addToast(removeCategoryResponse.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('DELETE_CATEGORIES'));
                return;
              }
              //! Fetch Products
              dispatch(loadersSlice.actions.addLoader('DELETE_CATEGORIES'));
              const categoriesResult = await CategoryService.getCategories();
              if(categoriesResult.hasError) {
                addToast(categoriesResult.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('DELETE_CATEGORIES'));
                return;
              }

              addToast('Category Removed Successfully', { appearance: 'success' });
              dispatch(loadersSlice.actions.removeLoader('DELETE_CATEGORIES'));
              dispatch(categoriesSlice.actions.setCategoriesTo(categoriesResult.data.categories));
            }}>Delete</MDBBtn>,
            <MDBBtn key={'2'} color={'warning'} onClick={
              () => {
                dispatch(categoriesSlice.actions.setCategoryModalTo(
                  {
                    open: true,
                    editMode: true,
                    editCategory: {
                      name: cat.name,
                      _id: cat._id,
                    }
                  }
                ));
              }
            }>
              Edit
            </MDBBtn>
          ]
        })),
      },
    );
  }, [categories] );

  return <>
    <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable}
      fullPagination/>
    <MDBBtn onClick={
      () => {
        dispatch(categoriesSlice.actions.setCategoryModalTo(
          {
            open: true,
            editMode: false,
            editCategory: {
              name: '',
              _id: '',
            }
          }
        ));
      }
    }>
      Create Category
    </MDBBtn>
  </>;
};

export default CategoryList;
