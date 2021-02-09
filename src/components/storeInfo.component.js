import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";

const StoreInfo = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const url = formatURL(match.url);
    const {userId} = match.params;
    const {storeId} = match.params;
    const [store, setStore] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreService.findByStoreId(storeId, idToken).then(res => {
                setStore(res);
            })
        })
    }, [currentUser, userId, storeId]);


    return store ? ( 
        <div>
            {store.storeId}
            {store.storeLocation}
            <Link to={`${url}/edit`}>Edit Store</Link>
            <Link to={`${url}/store-products`}>Products</Link>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {StoreInfo};