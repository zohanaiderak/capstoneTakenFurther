import React from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class Contact extends React.Component{
    state = {
        name : "",
        email : "",
        description : ""
    }

    updateForm = event =>{
        const{name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    cancel = e => {
         this.setState({
            name : "",
            email : "",
            description : ""
         })
    }

    handleClick = (e) =>{
        e.preventDefault();
        console.log(this.state)
        axios.post(`${API_URL}/contact`, this.state)
            .then(()=>{
                alert("ORDER SUBMITTED")
            })
            .catch(()=> alert('Please Try Again'))
        this.setState({
            "name": "",
            "email": "",
            "description": ""
        })
    }

    render(){
        return(
            <form className="form">
                <div className="form__container">
                <span className="input-container"><label className ="uploadInput">Name :</label>
                    <input className="uploadName"
                        type="text"
                        name="name"
                        onChange={this.updateForm}
                        value = {this.state.name}
                        placeholder="First &amp; Last Name"
                    /></span>
                
                <span className="input-container"><label className ="uploadInput">E-mail :</label>
                    <input className="uploadName"
                        type="text"
                        name="email"
                        onChange={this.updateForm}
                        value = {this.state.email}
                        placeholder="xyz@email.com"
                    /></span>
                
                <span className="input-container"><label className="uploadInput des">Description :</label>
                    <textarea className="uploadDescription"
                        type="text"
                        name="description"
                        onChange={this.updateForm}
                        value={this.state.description}
                        placeholder="Inquire anything or ask a question.">
                    </textarea></span>
                
                
                <div className="button__container">
                    <button className="publishButton" type="button" onClick={this.handleClick}>REQUEST REPAIR</button>
                    <button className="publishButton cancel" onClick={this.cancel} type="button">CANCEL</button>
                </div>
                </div>
            </form>
        )
    }
    
}

export default Contact;