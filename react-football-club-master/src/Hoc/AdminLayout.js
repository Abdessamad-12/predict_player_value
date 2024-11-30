import React from 'react';
import AdminNav from '../Components/admin/nav/AdminNav';

const AdminLayout = (props) => {
    return (
      <div className="admin-container">
        <div className="admin-left-nav">
          <AdminNav/>
        </div>
        <div className="admin-right">
          {props.children}
        </div>
      </div>
    );
}

export default AdminLayout;
