import React from 'react';
import './App.css';
import MainPage from './Components/Main/Main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Repair from './pages/Repair/Repair';
import Accessories from './pages/Accessories/Accessories';
import Phones from './pages/Phones/Phones';
import Order from './Components/Order/Order';
import AdminPhones from './pages/AdminPhones/AdminPhones';
import ContactUs from './pages/ContactUs/ContactUs';
import Admin from './pages/Admin/Admin';
import AdminAccessories from './pages/AdminAccessories/AdminAccessories';
import SelectPhone from './pages/SelectPhone/SelectPhone';
import SelectAccessory from './pages/SelectAccessory/SelectAccessory';
import EditPhones from './pages/EditPhones/EditPhones';
import EditPhoneForm from './pages/EditPhoneForm/EditPhoneForm';

function App() {
  return (
      <BrowserRouter>
      <Header />
        <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/repair-form' component={Repair} />
            <Route path='/contact-form' component={ContactUs} />
            <Route path='/phones' exact component={Phones} />
            <Route path='/phones/:id' exact component={Accessories} />
            <Route path='/phones/:id/:id' component={Order}/>
            <Route path='/admin' exact component={Admin}/>
            <Route path='/admin/phones' exact component={SelectPhone}/>
            <Route path='/admin/accessories' exact component={SelectAccessory}/>
            <Route path='/admin/phones/add' exact component={AdminPhones}/>
            <Route path='/admin/phones/edit' exact component={EditPhones}/>
            <Route path='/admin/phones/edit/:id' exact component={EditPhoneForm}/>
            <Route path='/admin/accessories/add' exact component={AdminAccessories}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
