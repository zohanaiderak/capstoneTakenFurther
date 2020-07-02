import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AccessoryList from '../../Components/Accessory/Accessory';
import './Accessory.scss';

const API_URL = process.env.REACT_APP_API_URL;

class Accessories extends React.Component{
    state={
        phone: {},
        accessories : [],
        searchValue : []
    }

    componentDidMount(){
        this.accessories(this.props.match.params.id);  
    }

    searchPhones = e => {
        let searchInput = e.target.value.toLowerCase();
        let searchResult = this.state.accessories.filter(accessory => {
            if(
                accessory.name.toLowerCase().includes(searchInput)
                ){
                    return accessory;
                }
            return(console.log(accessory));
        })
        this.setState({
            searchValue : searchResult 
        })
    }

    accessories(id){
        axios.get(`${API_URL}/phones/${id}`)
        .then(res=>{
            this.setState({
                phone: res.data,
                accessories: res.data.accessory,
                searchValue : res.data.accessory
            })
        })
        .catch(err=> {
            console.log("error" , err)
        })
    }



    
    
    render(){
        console.log(this.state.accessories)
        return(
            <div className="phones">
            <h1 className="phones__title">Accessories for {this.state.phone.name}</h1>
            <input className="phones__search" name="search" type="text" placeholder="Search" onChange={this.searchPhones} />
            <span className="phones__list">
                {
                    this.state.accessories.map(accessory=>{
                        return (
                            <Link to={`/phones/${accessory.phoneid}/${accessory.id}`} className={this.state.searchValue.includes(accessory) ? 'link show' : 'hidden'}>
                            <AccessoryList
                                id= {accessory.id}
                                phoneid = {accessory.phoneid}
                                name = {accessory.name}
                                description = {accessory.description}
                                quantity = {accessory.quantity}
                                image = {accessory.image}
                                isInstock = {accessory.isInstock} 
                            />
                            </Link>
                        )
                    })
                }
            </span>
            </div>
        )
    }
}

export default Accessories;