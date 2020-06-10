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
import { categoriesSlice } from '../../../../Store/categoriesSlice';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { loadersSlice } from '../../../../Store/loadersSlice';
import CategoryService from '../../../../Services/CategoryService';

const CategoryCreateEdit = () => {
  const { categoryModalOpen: { open, editCategory, editMode } } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const resetModal = () => {
    dispatch(categoriesSlice.actions.setCategoryModalTo(
      {
        editCategory: {
          _id: '',
          name: '',
        },
        editMode: false,
        open: false,
      },
    ));
  };
  const initialState = {
    id: editMode ? editCategory._id : null,
    name: editMode ? editCategory.name : '',
  };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .label('Name')
      .required(),
  });
  return (
    <MDBContainer>

      <MDBModal isOpen={open} toggle={resetModal} inline={false} noClickableBodyWithoutBackdrop={false}
        overflowScroll={false}>
        <MDBModalHeader toggle={resetModal}>{editMode ? 'Edit Category' : 'Create Category'}</MDBModalHeader>
        <MDBModalBody>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              dispatch(loadersSlice.actions.addLoader('CREATE_EDIT_CATEGORY_LOADER'));
              const response = await CategoryService.createUpdateCategory(values);
              dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_CATEGORY_LOADER'));

              if(response.hasError) {
                addToast(response.errorMessage, {appearance: 'error'});
                dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_CATEGORY_LOADER'));
                return;
              }
              // dispatch(authSlice.actions.login(response.data.user));
              addToast('Operation done Successfully', {appearance: 'success'});
              // addToast('Being redirected to home page.', {appearance: 'info'});
              const categoriesResult = await CategoryService.getCategories();
              if(categoriesResult.hasError) {
                addToast(categoriesResult.errorMessage, { appearance: 'error' });
                dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_CATEGORY_LOADER'));
                return;
              }

              dispatch(categoriesSlice.actions.setCategoriesTo(categoriesResult.data.categories));
              dispatch(loadersSlice.actions.removeLoader('CREATE_EDIT_CATEGORY_LOADER'));
              actions.setSubmitting(false);
              resetModal();
            }}
            render={() => (
              <Form>
                <Field
                  name="name"
                  render={({ field, meta }: any) => (
                    <div>
                      <MDBInput {...field} label={'Name'}
                        className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                        icon="envelope" group type="text" error="wrong"
                        success="right"/>
                      <p style={{ color: 'red' }}>{meta.touched && meta.error && meta.error}</p>
                    </div>
                  )}
                />
                <div className="text-center">
                  <MDBBtn outline color="primary" type={'submit'}>{editMode ? "Save" : "Create"}</MDBBtn>
                </div>
              </Form>
            )}
          />
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default CategoryCreateEdit;

