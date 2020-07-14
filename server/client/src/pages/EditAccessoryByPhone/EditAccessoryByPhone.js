import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import PhoneList from '../../Components/PhonesList/PhonesList';

const API_URL = process.env.REACT_APP_API_URL;

class EditAccessoryByPhone extends React.Component{
    state={
        phones : [],
        searchValue : []
    }

    componentDidMount(){
        axios.get(`${API_URL}/phone`)
        .then(res => {
            console.log(res.data);
            this.setState({
                phones : res.data,
                searchValue :res.data
            })
        })
        .catch(err => console.log("err" ,err))
    }

    searchPhones = e => {
        let searchInput = e.target.value.toLowerCase();
        let searchResult = this.state.phones.filter(phone => {
            if(
                phone.name.toLowerCase().includes(searchInput) || 
                phone.company.toLowerCase().includes(searchInput)
                ){
                    return phone
                }
                return(console.log(phone));
        });
        this.setState({
            searchValue : searchResult 
        })
    }

    // handleClick = () =>{

    // }

    phonesList(){
        const phonesCard = this.state.phones.map(phone => {
            return (
                <Link to={`/admin/accessories/editAccessory/${phone.id}`} className={this.state.searchValue.includes(phone) ? 'link show' : 'hidden'}>
                    <PhoneList 
                        id = {phone.id}
                        name = {phone.name}
                        company = {phone.company}
                        images = {phone.images}
                        hidden = {this.state.searchValue.includes(phone) ? 'show' : 'hidden'}
                    />
                </Link>
            )
        })
        return phonesCard;
    }
    
    render(){
        return(
            <div className="phones">
            <h1 className="phones__title">SELECT YOUR PHONE</h1>
            <input className="phones__search" name="search" type="text" placeholder="Search" onChange={this.searchPhones} />
            <span className="phones__list">
                {this.phonesList()}
            </span>
            </div>
        )
    }
}

export default EditAccessoryByPhone;