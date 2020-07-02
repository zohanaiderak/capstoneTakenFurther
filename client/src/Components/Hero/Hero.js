import React from 'react';
import './Hero.scss';
import Iframe from 'react-iframe';
import Instagram from '../../assets/Icons/SVG/Icon-instagram.svg';
import Logo from '../../assets/logo/msnap-logo.png';

const Hero = () =>{
    return(
        <>
        <main className="hero">
            <p className="hero__about-us">
                
            </p>
        </main>
        <section className="map">
        <Iframe className="map__iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.646528684916!2d-79.64467978464792!3d43.59307837912341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b478540a3f8ff%3A0xe443a4f319d2e51d!2sMobile%20Snap!5e0!3m2!1sen!2sca!4v1591755515758!5m2!1sen!2sca" width="900" height="500" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></Iframe>
        </section>
        <footer class="ftr">
        <div class="footer">  
            <h1 class="footer__head">Get In Touch</h1>
            <div class="footer__icon">
              <a href="https://www.instagram.com/mobile_snapsq1/"><img class="footer__icon--img" src={Instagram} alt="Instagram Icon"></img></a>
            </div>
            <div class="footer__site-name">
                <img src={Logo} alt="MobileSnap"></img>
            </div>
        </div> 
        <div class="copyright">
            <p>Copyright MobileSnap</p>
            <p>All Rights Reserved</p>
        </div>
    </footer>
        </>
    )
}

export default Hero;