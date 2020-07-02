import React from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'
import Switch from 'react-switch';

const API_URL = process.env.REACT_APP_API_URL;

class AdminAccessories extends React.Component{
    state={
        id : uuidv4() ,
        phoneid : "",
        name : "", 
        description : "",
        quantity : "",
        image : "",
        isInstock: false,
        selectedFile : null
    }

    changeHandler=event=>{
        this.setState({
        selectedFile : event.target.files[0],
        image : `http://localhost:8080/images/${event.target.files[0].name}`
        })
    }

    handleChange = this.handleChange.bind(this);

    handleChange(isInstock){
        this.setState({
            isInstock
        });
    }

    changeInput=(e)=>{
        const{name,value} = e.target;
        this.setState({
                [name] : value
        })
    }

    submit =(e) =>{
        e.preventDefault();
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        console.log(this.state.selectedFile);
        axios.post(`${API_URL}/upload`, data)
        .then(()=>alert("posted"))
        .catch((err)=>alert(err));
        const accessoryData = this.state;
        console.log(accessoryData);
        axios.post(`${API_URL}/accessories` , accessoryData)
            .then(()=>alert("posted accessory data"))
            .catch((err)=>alert(err))
    }

    render(){
        return(
            <form className="form" >
                <div className="form__container">
                <span className="input-container"><label className ="uploadInput">Id :</label>
                    <input className="uploadName" name="phoneid" onChange={this.changeInput}></input>
                </span>
                <span className="input-container"><label className ="uploadInput">Name :</label>
                    <input className="uploadName" onChange={this.changeInput} name="name"></input>
                </span>
                <span className="input-container"><label className ="uploadInput">Description :</label>
                    <textarea className="uploadDescription" onChange={this.changeInput} name="description"></textarea>
                </span>
                <span className="input-container"><label className ="uploadInput">Quantity :</label>
                    <input className="uploadName" onChange={this.changeInput} name="quantity"></input>
                </span>
                <span className="input-container"><label className ="uploadInput">In Stock :</label>
                <Switch height={24} width={40} onChange={this.handleChange} checked={this.state.isInstock} />
                </span>
                <span className="input-container"><label className ="uploadInput"> Upload Image :</label>
                <input type="file" name="image" onChange={this.changeHandler}/>
                </span>
                <div className="button__container"><button className="publishButton" type="submit" onClick={this.submit}>Submit</button></div>
                </div>
            </form>
        )
    }
}

export default AdminAccessories;