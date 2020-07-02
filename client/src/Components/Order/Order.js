import React from 'react';
import axios from 'axios';
import './Order.scss'

const API_URL = process.env.REACT_APP_API_URL;

class Order extends React.Component{
    state = {
        "name" : "",
        "email" : "",
        "description" : "",
        "accessory" : {}
    }

    componentDidMount(){
        this.accessoryName(this.props.match.params.id)
    }

    accessoryName(id){
        axios.get(`${API_URL}/accessories/${id}`)
        .then(res=>{
            this.setState({
                accessory: res.data,
            })
        })
        .catch(err=> {
            console.log("error" , err)
        })
    }

    updateForm = event =>{
        const{name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    cancel = e => {
         this.setState({
            "name" : "",
            "email" : "",
            "description" : ""
         })
    }

    handleClick = (e) =>{
        e.preventDefault();
        console.log(this.state)
        axios.post(`${API_URL}/send`, this.state)
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
            <form className="form" onSubmit={this.handleClick}>
                <div className="form__container">
                <h3 className="order-title">Click Confirm to have the item reserved in store.</h3>
                <p className="order-step">Once confirmed you will recieve an email saying the item is ready for pickup.</p>
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
                        placeholder="Add a text for eg: quantity or time when you will be picking it up">
                    </textarea></span>
                
                
                <div className="button__container">
                    <button className="publishButton" type="submit" >CONFIRM</button>
                    <button className="publishButton cancel" onClick={this.cancel} type="button">CANCEL</button>
                </div>
                </div>
            </form>
        )
    }
    
}

export default Order;

