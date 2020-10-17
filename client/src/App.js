import React from 'react';
import './App.css';
import MainPage from './Components/Main/Main';
import {BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';
import Header from './Components/Header/Header';
import Repair from './pages/Repair/Repair';
import Accessories from './pages/Accessories/Accessories';
import Phones from './pages/Phones/Phones';
import Order from './Components/Order/Order';
import Admin from './pages/Admin/Admin';
import AdminPhones from './pages/AdminPhones/AdminPhones';
import AdminAccessories from './pages/AdminAccessories/AdminAccessories';
import SelectPhone from './pages/SelectPhone/SelectPhone';
import SelectAccessory from './pages/SelectAccessory/SelectAccessory';
import EditPhones from './pages/EditPhones/EditPhones';
import EditPhoneForm from './pages/EditPhoneForm/EditPhoneForm';
import EditAccessories from './pages/EditAccessories/EditAccessories';
import EditAccessoryByPhone from './pages/EditAccessoryByPhone/EditAccessoryByPhone';
import EditAccessoryForm from './pages/EditAccessoryForm/EditAccessoryForm';
import ContactUs from './pages/ContactUs/ContactUs';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import { getFromStorage, setInStorage} from './utils/storage'


class App extends React.Component {
  state = {
    obj : ""
  }
  componentDidMount(){
    const json = localStorage.the_main_app;
    if(json){
      this.setState({
        obj : JSON.parse(json)
      }) 
    }else{
      this.setState({
        obj : false
      })
    }
  }
    
  render(){
    console.log(this.state);
  return (
      <BrowserRouter>
      <Header/>
        {
          (this.state.obj.token) ? (<AdminLogin/>) : null
        } 
        <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/repair-form' component={Repair} />
            <Route path='/contact-form' component={ContactUs} />
            <Route path='/phones' exact component={Phones} />
            <Route path='/phones/:id' exact component={Accessories} />
            <Route path='/phones/:id/:id' component={Order}/>
            {(!this.state.obj.token) ? (<Route path='/adminLogin' exact component={AdminLogin}/>) : null}
            {
              (this.state.obj.token)? (
                <Switch>
                <Route exact path='/admin' component={Admin}/>
                <Route exact path='/admin/accessories' component={SelectAccessory}/>
                <Route exact path='/admin/phones' component={SelectPhone}/>
                <Route exact path='/admin/phones/add'  component={AdminPhones}/>
                <Route exact path='/admin/phones/edit'  component={EditPhones}/>
                <Route  path='/admin/phones/edit/:id'  component={EditPhoneForm}/>
                <Route exact path='/admin/accessories/add'  component={AdminAccessories}/>
                <Route exact path='/admin/accessories/editAccessory'  component={EditAccessoryByPhone}/>
                <Route exact path='/admin/accessories/editAccessory/:id'  component={EditAccessories}/>
                <Route exact path='/admin/accessories/editAccessory/:id/:id'  component={EditAccessoryForm}/>
                </Switch>
              )
              : (<Redirect to="/adminLogin"/>)
              }
        </Switch>
      </BrowserRouter>
  );
}
}

export default App;
