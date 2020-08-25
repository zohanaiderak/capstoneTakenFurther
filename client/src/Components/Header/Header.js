import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.scss'
import Logo from '../../assets/Images/msnap-logo.png';
import { getFromStorage, setInStorage} from '../../utils/storage'
class Header extends React.Component {
  state = {
    active: ""
  }

  componentDidMount() {
    if (window.location.pathname === '/repair-form') {
      this.setState({
        active : "repair-form"
      })
    }
    else if(window.location.pathname === '/contact-form') {
      this.setState({
        active : "contact-form"
      })
    }
    else if(window.location.pathname === '/phones') {
      this.setState({
        active : "phones"
      })
    }
    else{
        this.setState({
            active : ""
        })
    }
  }

  logoutButton = () => {
    const obj = getFromStorage('the_main_app');
        if(obj && obj.token){
          return true;
        } else {
          return false;
        }
  }

  changeToHome = e => {
      this.setState({
          active: ""
      })
  }

  changeToAccessories = e => {
    this.setState({
      active: "phones"
    })
  }

  changeToRepair = e => {
    this.setState({
      active: "repair-form"
    })
  }

  changeToContact = e => {
    this.setState({
      active: "contact-form"
    })
  }

  render() {
    return (
      <header className="header">
        <Link to="/" onClick={this.changeToHome}>
          <img className="header__logo"  src={Logo} alt="LOGO"/>
        </Link>
        <nav className="header__navbar">
          <Link onClick={this.changeToAccessories} className={`header__link ${this.state.active === 'phones' ? 'header__link--active' : ''}`} to="/phones">
            <p className="header-name">Accessories</p>
          </Link>
          <Link onClick={this.changeToRepair} className={`header__link  ${this.state.active === 'repair-form' ? 'header__link--active' : ''}`} to="/repair-form">
            <p className="header-name">Repair</p>
          </Link>
          <Link onClick={this.changeToContact} className={`header__link  ${this.state.active === 'contact-form' ? 'header__link--active' : ''}`} to="/contact-form">
              <p className="header-contact">Contact Us</p>
          </Link>
        </nav>
      </header>
    );
  };
}

export default Header;