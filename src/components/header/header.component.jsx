import React from 'react';
import "./header.styles.scss";
import { Link } from "react-router-dom";
import {createStructuredSelector} from 'reselect';

import { ReactComponent as Logo } from "../../assets/crown.svg";
import SignInAndSignUppage from "../../pages/signin-and-signup/signip-and-signup.component";
import { auth } from "../../firebase/firebase-utils";
import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selector";

const Header = ({ currentUser , hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/shop">
                CONTACT
            </Link>
            {
                currentUser ? 
                (
                    <div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                 </div>
                ) :
                (<Link className="option" to="/signin">
                        SIGN IN
             </Link>
                 )
            }
            <CartIcon/>
        </div>
        {
            hidden ? null :   <CartDropDown/>
        }
      
    </div>
);
const mapStateToProps = createStructuredSelector({  
    
    
    
    /*it was mapStateToProps = state => {
    currentUser: state.user.currentUser
}
     but he used advanced way to destruction the state 
     {user: {currentUser} , cart: {hidden}}
     then used selector and reason discussed in my notebook then used createStructured Selector  
     */

    currentUser : selectCurrentUser,
    hidden : selectCartHidden 
});
export default connect(mapStateToProps)(Header);