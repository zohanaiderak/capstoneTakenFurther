import React from 'react';
import './App.css';
import MainPage from './Components/Main/Main';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Repair from './pages/Repair/Repair';
import Accessories from './pages/Accessories/Accessories';
import Phones from './pages/Phones/Phones';
import Order from './Components/Order/Order';

import ContactUs from './pages/ContactUs/ContactUs';
import AdminLogin from './pages/AdminLogin/AdminLogin';


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
            <Route path='/adminLogin' exact component={AdminLogin}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
