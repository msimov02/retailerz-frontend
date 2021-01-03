import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";

import * as ROUTES from "../../constants/routes";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import UserInfoPage from "../UserInfo";
import CreateProductPage from '../CreateProduct';
import { withAuthentication } from "../Session";
import { Operations } from "../Operations";
import { Stores } from "../Stores";


const App = () => (

    <Router>
        <div>
            <Navigation />
            <hr/>
            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
            <Route path={ROUTES.HOME} component={HomePage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path={ROUTES.USER_INFO} component={UserInfoPage}/>
            <Route path={ROUTES.CREATE_PRODUCT} component={CreateProductPage}/>
            <Route path={ROUTES.STORES} component={Stores}/>
            <Route path={ROUTES.OPERATIONS} component={Operations}/>
            
        </div>
    </Router>
    
);

export default withAuthentication(App);