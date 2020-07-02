import React from 'react';
import './App.css';
import MainPage from './pages/Main/Main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Repair from './pages/Repair/Repair';
import Accessories from './pages/Accessories/Accessories';
import Phones from './pages/Phones/Phones';
import Order from './Components/Order/Order';
import AdminPhones from './pages/AdminPhones/AdminPhones';
import ContactUs from './pages/ContactUs/ContactUs';
import Admin from './Components/Admin/Admin';
import AdminAccessories from './pages/AdminAccessories/AdminAccessories';

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
            <Route path='/admin/phones' exact component={AdminPhones}/>
            <Route path='/admin/accessories' exact component={AdminAccessories}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
