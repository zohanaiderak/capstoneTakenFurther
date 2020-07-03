import React from 'react';
import {Link} from 'react-router-dom';

const SelectAccessory = () =>{
        return(
                <div className="form">
                <Link to="/admin/accessories/add" className="publishButton admin__phones--button">Add Accessory</Link>
                <Link to="/admin/accessories/edit" className="publishButton admin__accessories--button">Edit Accessory</Link>
                <Link to="/admin/accessories/delete" className="publishButton admin__accessories--button">Delete Accessory</Link>
                </div>
        )
}

export default SelectAccessory;