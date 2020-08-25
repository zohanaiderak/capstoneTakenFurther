import React from 'react';
import axios from 'axios';
import { Link, withRouter} from 'react-router-dom';
import { getFromStorage, setInStorage} from '../../utils/storage'


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
            })
        setTimeout(()=>{window.location.reload(true)}, 100);
    }

    handleLogout = e =>{
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
                        signInError : res.data.message,
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
        this.props.history.push('/adminLogin');
        setTimeout(()=>{window.location.reload(true)}, 100);
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
                            <h3>{signInError}</h3>
                        ) : (null)
                    }
                <form className="form__container">
                    <div className="input-container">
                        <label className ="uploadInput">Username :</label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            className="uploadName" 
                            value={username}
                            onChange={this.changeHandler}>
                        </input>
                    </div>
                    <div className="input-container">
                        <label className ="uploadInput">Password :</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            className="uploadName" 
                            value={password}
                            onChange={this.changeHandler}>
                        </input>
                    </div>
                    <div className="button__container">
                        <button className="publishButton" type="button" onClick={this.handleLogin}>Login</button>
                        <button className="publishButton cancel" onClick={this.cancel} type="button">CANCEL</button>
                    </div>
                </form>
                </div>
            )
        }
        return(
                <div className="form">
                    <Link to="/admin" className="publishButton admin__phones--button">Home</Link>
                    <Link to="/adminLogin" className="publishButton admin__accessories--button" onClick={this.handleLogout}>Logout</Link>
                </div>
        )
    }
}

export default withRouter(Login);