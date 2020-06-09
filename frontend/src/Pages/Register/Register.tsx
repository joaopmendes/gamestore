import React from 'react';
import UserService from '../../Services/UserService';
import MainLayout from '../../Components/MainLayout/MainLayout';
import { Formik, Field, Form } from 'formik';
import { MDBBtn, MDBCol, MDBContainer, MDBCardBody, MDBCard, MDBIcon, MDBInput, MDBRow, MDBCardHeader } from 'mdbreact';
import { DefaultForm, DefaultFormHeaderOffset, DefaultFormTitle } from '../../global.styles';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import { useAppDispatch } from '../../create-store.config';
import { loadersSlice } from '../../Store/loadersSlice';

interface IProps {
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Name')
    .required('The field name is required'),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password1: yup
    .string()
    .label('Password')
    .required(),
  password2: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match.', function(value) {
      return this.parent.password1 === value;
    }),
});
const Register: React.FC<IProps> = () => {
  const {addToast} = useToasts();
  const history = useHistory();
  const dispatch = useAppDispatch();
  return <MainLayout footerFixedBottom={true}>
    <DefaultForm>
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="12">
                <DefaultFormHeaderOffset>
                  <MDBCardHeader className="form-header blue-gradient rounded">
                    <DefaultFormTitle className="my-3">
                      <MDBIcon icon="lock"/> Sign In:
                    </DefaultFormTitle>
                  </MDBCardHeader>
                </DefaultFormHeaderOffset>
                <div className="mt-5"/>
                <Formik
                  initialValues={{
                    email: '',
                    name: '',
                    password1: '',
                    password2: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={ async (values, actions) => {
                    dispatch(loadersSlice.actions.addLoader('register_loader'));
                    const response = await UserService.register(values);
                    dispatch(loadersSlice.actions.removeLoader('register_loader'));

                    if(response.hasError) {
                      addToast(response.errorMessage, {appearance: 'error'});
                      return;
                    }
                    addToast('Registered Successfully. Please Login.', {appearance: 'success'});
                    addToast('Being redirected to login page.', {appearance: 'info'});
                    history.push('/login');
                    actions.setSubmitting(false);
                  }}
                  render={() => (
                    <Form>
                      <Field
                        name="name"
                        render={({ field, meta }: any) => (
                          <div>
                            <MDBInput {...field} label={'Name'}
                              className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                              icon="user" group type="text" error="wrong"
                              success="right"/>
                            <p style={{color: 'red'}}>{meta.touched && meta.error && meta.error}</p>
                          </div>
                        )}
                      />
                      <Field
                        name="email"
                        render={({ field, meta }: any) => (
                          <div>
                            <MDBInput {...field} label={'Email'}
                              className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                              icon="envelope" group type="text" error="wrong"
                              success="right"/>
                            <p style={{color: 'red'}}>{meta.touched && meta.error && meta.error}</p>
                          </div>
                        )}
                      />
                      <Field
                        name="password1"
                        render={({ field, meta }: any) => (
                          <div>
                            <MDBInput {...field} label={'Password'}
                              className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                              icon="lock" group type="password" error="wrong"
                              success="right"/>
                            <p style={{color: 'red'}}>{meta.touched && meta.error && meta.error}</p>
                          </div>
                        )}
                      />
                      <Field
                        name="password2"
                        render={({ field, meta }: any) => (
                          <div>
                            <MDBInput {...field} label={'Confirm Password'}
                              className={meta.touched ? meta.error ? 'is-invalid' : 'is-valid' : ''}
                              icon="exclamation-triangle" group type="password" error="wrong"
                              success="right"/>
                            <p style={{color: 'red'}}>{meta.touched && meta.error && meta.error}</p>
                          </div>
                        )}
                      />
                      <div className="text-center">
                        <MDBBtn outline color="primary" type={'submit'}>Register</MDBBtn>
                      </div>
                    </Form>
                  )}
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>
    </DefaultForm>

  </MainLayout>;
};
export default Register;
