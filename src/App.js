import React from 'react';
import './App.css';

import HomePage from "./pages/homepage/homepage";
import shopPage from "./pages/shop/shop.component";
import checkoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import SignInAndSignUppage from "./pages/signin-and-signup/signip-and-signup.component";
import { Switch, Route , Redirect} from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";


class App extends React.Component {
  unSubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged (async userAuth=>{
     if(userAuth){
       const userRef = await createUserProfileDocument(userAuth);
       userRef.onSnapshot(snapShot => {
        setCurrentUser({
           
             id: snapShot.id,
             ...snapShot.data()

           
         });
         console.log(this.state);
       })
     }
    else{
      setCurrentUser(userAuth);
    }}
    )}
  componentWillUnmount () {
    this.unSubscribeFromAuth();
  }
  render() {
    return (
      <div>
         {/*<Header currentUser={this.state.currentUser}/> no need for passing props in redux*/}
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={shopPage} />
          <Route path='/checkout' component={checkoutPage} />
          <Route 
          exact
          path='/signin' 
          render={() => 
            this.props.currentUser? 
            (<Redirect to="/"/>)
            :
            (<SignInAndSignUppage/>)
          } 
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
