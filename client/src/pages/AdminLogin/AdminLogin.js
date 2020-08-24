import React from 'react';
import axios from 'axios';
import { Route , Link} from 'react-router-dom';
import Admin from '../Admin/Admin';
import AdminPhones from '../AdminPhones/AdminPhones';
import AdminAccessories from '../AdminAccessories/AdminAccessories';
import SelectPhone from '../SelectPhone/SelectPhone';
import SelectAccessory from '../SelectAccessory/SelectAccessory';
import EditPhones from '../EditPhones/EditPhones';
import EditPhoneForm from '../EditPhoneForm/EditPhoneForm';
import EditAccessories from '../EditAccessories/EditAccessories';
import EditAccessoryByPhone from '../EditAccessoryByPhone/EditAccessoryByPhone';
import EditAccessoryForm from '../EditAccessoryForm/EditAccessoryForm';
import { getFromStorage, setInStorage} from '../../utils/storage'
import { BrowserRouter, Switch } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

class Login extends React.Component{
    state={
        isLoading: true,
        token: "",
        signInError: "",
        username: "",
        password: ""
    }

    componentDidMount(){
        const obj = getFromStorage('the_main_app');
        if(obj && obj.token){
            const { token } = obj
            axios.get(`${API_URL}/account/verify?token=${token}`)
                .then(res=> {
                    this.setState({
                        token,
                        isLoading: false
                    })}
                )
                .catch(
                    this.setState({
                        isLoading: false,
                    })
                )
        } else {
            this.setState({
                isLoading: false
            })
        }
    }
    
    handleLogin = () =>{
        this.setState({
            isLoading: true
        })
        axios.post(`${API_URL}/account/signin` , this.state)
            .then((res)=>{
                    setInStorage('the_main_app' , {token : res.data.token})
                    this.setState({
                        signInError : res.data.message,
                        isLoading: false,
                        username: "",
                        password: "",
                        token: res.data.token
                    })
                    console.log(res)
            })
            .catch((res)=>{
                this.setState({
                    signInError: res.data.message,
                    isLoading: false
                })
            }
               
            )
    }

    handleLogout = e =>{
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        const obj = getFromStorage('the_main_app');
        if(obj && obj.token){
            const { token } = obj
            axios.get(`${API_URL}/account/logout?token=${token}`)
                .then(res=> {
                    setInStorage('the_main_app' , {token : ""})
                    this.setState({
                        token : "",
                        isLoading: false
                    })}
                )
                .catch(
                    this.setState({
                        isLoading: false,
                    })
                )
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    changeHandler = (e) =>{
        const{name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    render(){
        const {
            isLoading,
            token,
            signInError,
            username,
            password
        } = this.state

        if(isLoading){
            return (<div className="form"><h1>Loading......</h1></div>)
        }

        if(!token){
            return(
                <div className="form">
                {
                    (signInError) ? (
                        <p>{signInError}</p>
                    ) : (null)
                }
            <form className="form__container">
                <span className="input-container">
                    <label className ="uploadInput">Username :</label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        className="uploadName" 
                        value={username}
                        onChange={this.changeHandler}>
                    </input>
                </span>
                <span className="input-container">
                    <label className ="uploadInput">Password :</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="uploadName" 
                        value={password}
                        onChange={this.changeHandler}>
                    </input>
                </span>
                <div className="button__container">
                    <button className="publishButton" type="button" onClick={this.handleLogin}>Login</button>
                    <button className="publishButton cancel" onClick={this.cancel} type="button">CANCEL</button>
                </div>
            </form>
            </div>
            )
        }
        return(
            <BrowserRouter>
                <div className="form">
                    <Link to="/admin" className="publishButton admin__phones--button">Home</Link>
                    <Link to="/adminLogin" className="publishButton admin__accessories--button" onClick={this.handleLogout}>Logout</Link>
                </div>
                <Switch>
                    <Route path='/admin' exact component={Admin}/>
                    <Route path='/admin/phones' exact component={SelectPhone}/>
                    <Route path='/admin/accessories' exact component={SelectAccessory}/>
                    <Route path='/admin/phones/add' exact component={AdminPhones}/>
                    <Route path='/admin/phones/edit' exact component={EditPhones}/>
                    <Route path='/admin/phones/edit/:id' exact component={EditPhoneForm}/>
                    <Route path='/admin/accessories/add' exact component={AdminAccessories}/>
                    <Route path='/admin/accessories/editAccessory' exact component={EditAccessoryByPhone}/>
                    <Route path='/admin/accessories/editAccessory/:id' exact component={EditAccessories}/>
                    <Route path='/admin/accessories/editAccessory/:id/:id' exact component={EditAccessoryForm}/>
                </Switch> 
            </BrowserRouter>
        )
    }
}

export default Login;