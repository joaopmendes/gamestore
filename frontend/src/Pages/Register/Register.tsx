import React, { useEffect, useState } from 'react';
import UserService from '../../Services/UserService';
import MainLayout from '../../Components/MainLayout/MainLayout';
import { useFormik } from 'formik';
import { MDBBtn, MDBCol, MDBContainer, MDBCardBody, MDBCard, MDBIcon, MDBInput, MDBRow, MDBCardHeader } from 'mdbreact';
import { DefaultForm, DefaultFormHeaderOffset, DefaultFormTitle } from '../../global.styles';

interface IProps {
}

const Register: React.FC<IProps> = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return <MainLayout>
    <DefaultForm>
      <MDBContainer>
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="12">
                <DefaultFormHeaderOffset>
                  <MDBCardHeader className="form-header peach-gradient rounded">
                    <DefaultFormTitle className="my-3">
                      <MDBIcon icon="lock" /> Sign In:
                    </DefaultFormTitle>
                  </MDBCardHeader>
                </DefaultFormHeaderOffset>
                <form className={'mt-5'}>
                  <div className="grey-text">
                    <MDBInput label="Your name" icon="user" group type="text" error="wrong"
                              success="right"/>
                    <MDBInput label="Your email" icon="envelope" group type="email" error="wrong"
                              success="right"/>
                    <MDBInput label="Your password" icon="lock" group type="password"/>
                    <MDBInput label="Confirm Password" icon="lock" group type="password"/>
                  </div>
                  <div className="text-center">
                    <MDBBtn outline color="primary">Register</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>
    </DefaultForm>

  </MainLayout>;
};
export default Register;
