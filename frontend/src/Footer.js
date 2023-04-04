import React from 'react';
import img1 from './Ceth.jpg';
import img2 from './Latino.jpg';
import img3 from './univic.jpg';


const Footer = () => {
  return (
    <div className="footer">
      <img src={img1} alt="imagen1" />
      <img src={img2} alt="imagen2" />
      <img src={img3} alt="imagen3" />
    
    </div>
  );
};

export default Footer;
