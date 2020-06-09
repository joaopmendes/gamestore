import React, { useEffect } from 'react';
import { MDBBtn,  MDBDataTableV5 } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../create-store.config';
import { loadersSlice } from '../../../../Store/loadersSlice';
import { useToasts } from 'react-toast-notifications';
import ProductService from '../../../../Services/ProductService';
import { productSlice } from '../../../../Store/productSlice';

const ProductList = () => {
  const { products } = useSelector((state: RootState) => state.products);
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
        rows: products.map(prod => ({
          name: prod.name,
          id: prod._id,
          options: [
            <MDBBtn key={'1'} color={'danger'} onClick={ async () => {
              // Remove Category
              dispatch(loadersSlice.actions.addLoader('DELETE_PROD'));
              const removeProdResponse = await ProductService.removeProducts({ ids: prod._id });
              if(removeProdResponse.hasError) {
                addToast(removeProdResponse.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('DELETE_PROD'));
                return;
              }
              //! Fetch Products
              const categoriesResult = await ProductService.getListOfProducts();
              if(categoriesResult.hasError) {
                addToast(categoriesResult.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('DELETE_PROD'));
                return;
              }

              addToast('Product Removed Successfully', { appearance: 'success' });
              dispatch(loadersSlice.actions.removeLoader('DELETE_PROD'));
              dispatch(productSlice.actions.setProductsTo(categoriesResult.data.products));
            }}>Delete</MDBBtn>,
            <MDBBtn key={'2'} color={'warning'} onClick={
              () => {
                dispatch(productSlice.actions.setProductModalTo(
                  {
                    open: true,
                    editMode: true,
                    editProduct: {
                      _id: prod._id,
                      name: prod.name,
                      categories: prod.categories,
                      price: prod.price,
                      console: prod.console
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
  }, [products] );

  return <>
    <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable}
      fullPagination/>
    <MDBBtn onClick={
      () => {
        dispatch(productSlice.actions.setProductModalTo(
          {
            open: true,
            editMode: false,
            editProduct: {
              _id: '',
              categories: [],
              name: '',
              price: 0,
              console: '',
            }
          }
        ));
      }
    }>
      Create Category
    </MDBBtn>
  </>;
};

export default ProductList;
