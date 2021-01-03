import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreService from '../../services/store.service';
import { FirebaseContext } from '../Firebase';

const List = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const {path} = match;
    const [stores, setStores] = useState(null);
    const currentUser = firebase.getCurrentUser();


    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreService.getAll(currentUser.uid, idToken).then(res => {
                setStores(res);
            })
        })
    }, [currentUser]);

    const deleteStore = (storeId) => {
        setStores(stores.map(store => {
            if(store.id === storeId) {
                store.isDeleting = true;
            }
            return store;
        }));
        currentUser.getIdToken().then(idToken => {
            StoreService.deleteById(currentUser.uid, storeId, idToken).then(() => {
                setStores(stores => stores.filter(store => store.id !== storeId));
            });
        })
    }

    return(
        <div>
            <h1>Stores</h1>
            <Link to={`${path}/add`}>Add Store</Link>
            <table>
                <thead>
                    <tr>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stores && stores.map(store =>
                        <tr key={store.id}>
                            <td>{store.location}</td>
                            <td>
                                <Link to={`${path}/edit/${store.id}`}>Edit</Link>
                                <button onClick={() => deleteStore(store.id)} disabled={store.isDeleting}>
                                    {store.isDeleting 
                                        ? <span>Loading...</span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!stores &&
                        <tr>
                            <td>
                                <div>Loading...</div>
                            </td>
                        </tr>
                    }
                    {stores && !stores.length &&
                        <tr>
                            <td>
                                <div>No Stores To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export {List};