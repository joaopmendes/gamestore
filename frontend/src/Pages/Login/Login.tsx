import React from 'react';
import UserService from '../../Services/UserService';
import MainLayout from '../../Components/MainLayout/MainLayout';
import { Formik, Field, Form } from 'formik';
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBCardBody,
  MDBCard,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBCardHeader,
  MDBLink,
} from 'mdbreact';
import { DefaultForm, DefaultFormHeaderOffset, DefaultFormTitle, Spacer } from '../../global.styles';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import { useAppDispatch } from '../../create-store.config';
import { loadersSlice } from '../../Store/loadersSlice';
import { authSlice } from '../../Store/authSlice';

interface IProps {}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required(),
});
const Login: React.FC<IProps> = () => {
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
                      <MDBIcon icon="lock"/> Login:
                    </DefaultFormTitle>
                  </MDBCardHeader>
                </DefaultFormHeaderOffset>
                <Spacer height={'50px'}/>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={ async (values, actions) => {
                    dispatch(loadersSlice.actions.addLoader('login_loader'));
                    const response = await UserService.login(values);
                    dispatch(loadersSlice.actions.removeLoader('login_loader'));

                    if(response.hasError) {
                      addToast(response.errorMessage, {appearance: 'error'});
                      return;
                    }
                    dispatch(authSlice.actions.login(response.data.user));
                    addToast('Login Successfully', {appearance: 'success'});
                    addToast('Being redirected to home page.', {appearance: 'info'});
                    history.push('/');
                    actions.setSubmitting(false);
                  }}
                  render={() => (
                    <Form>
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
                        name="password"
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
                      <p>
                        Yet not a member? Sign In <MDBLink className={'d-inline m-0 p-0'} to={'/register'}>here</MDBLink>.
                      </p>
                      <div className="text-center">
                        <MDBBtn outline color="primary" type={'submit'}>Login</MDBBtn>
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
export default Login;
