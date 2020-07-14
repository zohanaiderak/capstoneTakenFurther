import React from 'react';
import {Link} from 'react-router-dom';
import './Admin.scss';

const Admin = () => {
    return(
        <div className="form">
        <Link to="/admin/phones" className="publishButton admin__phones--button">Phones</Link>
        <Link to="/admin/accessories" className="publishButton admin__accessories--button">Accessories</Link>
        </div>
    )
}

export default Admin;