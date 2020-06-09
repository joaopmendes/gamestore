import React from 'react';
import SideNavigation from '../sideNavigation';
import { MDBContainer } from 'mdbreact';

const AdminLayout = ({ children }) => {
  return (
    <>
      <SideNavigation/>
      <div style={{ marginLeft: '270px', paddingTop: "2rem" }}>
        <MDBContainer>
          {children}
        </MDBContainer>
      </div>
    </>
  );
};

export default AdminLayout;
