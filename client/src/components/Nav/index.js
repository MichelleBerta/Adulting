import React from "react";
// home tag from 


  

            
function Nav() {
  return (
    
    <nav 
    className="#69f0ae green accent-2 nav-wrapper">
      <a  href="#home" className="brand-logo">Aduling App</a>

      <a href="#home" className="sidenav-tigger" data-target="mobile-nav">
        <i className="material-icons">menu</i>
      </a>

     
     <ul className= "right hide-on-med-and-down">  
        <li><a href="#home"></a></li>
        {/* <li><a href="#logout">Logout</a></li> */}
       
     </ul>
    </nav>
    
  );
}

 // <ul className="sidenav"  id=" modile-demo">
  //      <li><a href="#home">home</a></li>
        // {/* <li><a href="#logout">Logout</a></li> */}

  


export default Nav;
