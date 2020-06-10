import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../create-store.config';
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { productSlice } from '../../../../Store/productSlice';
import { SelectField } from '../../../Components/SelectField';
import { loadersSlice } from '../../../../Store/loadersSlice';
import ProductService from '../../../../Services/ProductService';
import { CreateUpdateProduct } from '../../../../Services/ProductService/interface';

const ProductCreateEdit = () => {
  const { productModalOpen: { open, editProduct, editMode } } = useSelector((state: RootState) => state.products);
  const categories = useSelector((store: RootState) => store.categories.categories);
  const categoriesOptions = categories?.map(cat => ({
    label: cat.name,
    value: cat._id,
  }));
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const resetModal = () => {
    dispatch(productSlice.actions.setProductModalTo(
      {
        editProduct: {
          _id: '',
          categories: [],
          name: '',
          price: 0,
          console: '',
          productImage: '',
        },
        editMode: false,
        open: false,
      },
    ));
  };
  const initialState = {
    id: editMode ? editProduct._id : null,
    name: editMode ? editProduct.name : '',
    categories: editMode ? editProduct.categories.map(cat => ({ label: cat.name, value: cat._id })) : [],
    price: editMode ? editProduct.price : 0,
    console: editMode ? editProduct.console : '',
    productImage: '',

  };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .label('Name')
      .required(),
    console: yup
      .string()
      .label('Platform')
      .oneOf(['PS4', 'XBOX', 'PC'])
      .required(),
    price: yup.number()
      .label('Price')
      .min(30)
      .required(),
    categories: yup.array().min(1),
  });
  return (
    <MDBContainer>
      <MDBModal isOpen={open} toggle={resetModal} inline={false} noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}>
        <MDBModalHeader toggle={resetModal}>{editMode ? 'Edit Product' : 'Create Product'}</MDBModalHeader>
        <MDBModalBody>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              console.log(values);
              dispatch(loadersSlice.actions.addLoader('CREATE_EDIT_PRODUCT_LOADER'));

              const servicePayload: CreateUpdateProduct = {
                ...values,
                categories: values.categories.reduce((acc: string[], curr: any) => {
                  acc.push(curr.value);
                  return acc;
                }, [] as string[]),
              };
              const response = await ProductService.createUpdateProduct(servicePayload);
              dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_PRODUCT_LOADER'));

              if (response.hasError) {
                addToast(response.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_PRODUCT_LOADER'));
                return;
              }
              addToast('Operation done Successfully', { appearance: 'success' });
              // addToast('Being redirected to home page.', {appearance: 'info'});
              const productResult = await ProductService.getListOfProducts();
              if (productResult.hasError) {
                addToast(productResult.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_PRODUCT_LOADER'));
                return;
              }

              dispatch(productSlice.actions.setProductsTo(productResult.data.products));
              dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_PRODUCT_LOADER'));
              actions.setSubmitting(false);
              resetModal();
            }}
            render={() => (
              <Form>
                <Field
                  name="name"
                  render={({ field, meta }: any) => (
                    <>
                      <div>
                        <MDBInput {...field} label={'Name'}
                          className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                          icon="envelope" group type="text" error="wrong"
                          success="right"/>
                        <p style={{ color: 'red' }}>{meta.touched && meta.error && meta.error}</p>
                      </div>
                    </>
                  )}
                />
                <Field
                  name="price"
                  render={({ field, meta }: any) => (
                    <>
                      <div>
                        <MDBInput {...field} label={'Price'}
                          className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                          icon="envelope" group type="number" error="wrong"
                          success="right"/>
                        <p style={{ color: 'red' }}>{meta.touched && meta.error && meta.error}</p>
                      </div>
                    </>
                  )}
                />
                <Field
                  name="console"
                  render={({ field, meta }: any) => (
                    <>
                      <div>
                        <MDBInput {...field} label={'Platform'}
                          className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                          icon="envelope" group type="text" error="wrong"
                          success="right"/>
                        <p style={{ color: 'red' }}>{meta.touched && meta.error && meta.error}</p>
                      </div>
                    </>
                  )}
                />

                <Field id={'categories'} name={'categories'} component={SelectField} options={categoriesOptions}/>
                <Field
                  name="productImage"
                  render={({ field, meta, form }: any) => {
                    console.log('form',form);
                    console.log('field', field);

                    return (
                      <>
                        <label style={{ margin: '1rem 0' }}>Product Image</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">
                            Upload
                            </span>
                          </div>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                              onChange={(e) => {
                                form.setFieldValue('productImage', e?.target?.files?.[0] || '');
                              }}
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                              {field.value.name || 'Choose a file'}
                            </label>
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
                <div className="text-center">
                  <MDBBtn outline color="primary" type={'submit'}>{editMode ? 'Save' : 'Create'}</MDBBtn>
                </div>
              </Form>
            )}
          />
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default ProductCreateEdit;

