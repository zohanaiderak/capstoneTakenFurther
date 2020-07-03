import React from 'react';
import {Link} from 'react-router-dom';

const SelectPhone = () =>{
        return(
                <div className="form">
                <Link to="/admin/phones/add" className="publishButton admin__phones--button">Add Phone</Link>
                <Link to="/admin/phones/edit" className="publishButton admin__accessories--button">Edit Phone</Link>
                <Link to="/admin/phones/delete" className="publishButton admin__accessories--button">Delete Phone</Link>
                </div>
        )
}

export default SelectPhone;