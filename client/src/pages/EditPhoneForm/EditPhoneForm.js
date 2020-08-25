import React from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class EditForm extends React.Component{
    state={
        id : "",
        name : "",
        company : "",
        images : "",
        selectedFile : null,
    }

    addPhone=()=>{
        this.setState({
            add:"form",
            delete: "hidden",
            button: "hidden"
        })
    }

    deletePhone=()=>{
        this.setState({
            add: "hidden",
            delete: "form",
            button: "hidden"
        })
    }

    changeHandler=event=>{
        this.setState({
        selectedFile : event.target.files[0],
        images : `${API_URL}/images/${event.target.files[0].name}`
        })
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
        axios.patch(`${API_URL}/upload`, data)
        .then(()=>alert("posted"))
        .catch((err)=>alert(err));
        const phoneData = {
            id: this.state.id,
            name: this.state.name,
            company: this.state.company,
            images: this.state.images
        };
        console.log(phoneData);
        axios.patch(`${API_URL}/pdiv/${this.state.id}` , phoneData)
            .then(()=>alert("posted phones data"))
            .catch((err)=>alert(err))
    }

    render(){
        return(
            <form className="form" >
                <div className="form__container">
                    <h2 className="addPhone">EDIT</h2>
                    <div className="input-container">
                        <label className ="uploadInput">Id :</label>
                        <input className="uploadName" name="id" onChange={this.changeInput}></input>
                    </div>
                    <div className="input-container">
                        <label className ="uploadInput">Name :</label>
                        <input className="uploadName" onChange={this.changeInput} name="name"></input>
                    </div>
                    <div className="input-container">
                        <label className ="uploadInput">Comapny :</label>
                        <input className="uploadName" onChange={this.changeInput} name="company"></input>
                    </div>
                    <div className="input-container">
                        <label className ="uploadInput"> Upload Image :</label>
                        <input type="file" name="images" onChange={this.changeHandler}/></div> 
                    <div className="button__container">
                        <button className="publishButton" type="submit" onClick={this.submit}>Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default EditForm;