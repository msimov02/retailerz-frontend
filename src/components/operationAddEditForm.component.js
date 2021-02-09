import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../context/firebase.context";
import OperationService from '../services/operation.service';
import ProductService from '../services/product.service';
import OperationTypeService from '../services/operationType.service';
import StoreService from '../services/store.service';

const OperationAddEditForm = ({match}) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const {userId, operationId} = match.params;
    const isAddMode = !operationId;
    const currentUser = firebase.getCurrentUser();

    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([])
    const [operationTypes, setOperationTypes] = useState([]);

    const { handleSubmit, reset, setValue, errors, formState, control} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createOperation(data)
            : updateOperation(data);
    }

    const createOperation = (data) => {
        currentUser.getIdToken().then(idToken => {
             OperationService.create(userId, data, idToken).then(res => {
                history.go(0)
             });
        })
    }

    const updateOperation = (data) => {
        currentUser.getIdToken().then(idToken => {
            OperationService.updateByOperationId(operationId, data, idToken).then(res => {
                history.go(0)
            })
        })
    }

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllByUserId(userId, idToken).then(res => {
                setProducts(res.map(({productId, productName}) => ({key: productId, label: productName})));
            })
            StoreService.getAllByUserId(userId, idToken).then(res => {
                setStores(res.map(({storeId, storeLocation}) => ({key: storeId, label: storeLocation})));
            })
        })
        OperationTypeService.getAll().then(res => {
            setOperationTypes(res.map(({operationTypeId, operationTypeName}) => ({key: operationTypeId, label: operationTypeName})));
        })

        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                OperationService.findByOperationId(operationId, idToken).then(res => {
                    const fields = ['operationOperationTypeId', 'operationStoreId', 'operationProductId', 'operationCount'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, userId, operationId, isAddMode, setValue]);

    return(
        <div></div>
    /*
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
             <h1>{isAddMode ? 'Add Operation' : 'Edit Operation'}</h1>
            <div>
                <div>
                    <FormSelect 
                        name="operationOperationTypeId"
                        label="Operation Type"
                        options={operationTypes}
                        control={control}
                    />
                    <div>{errors.operationType?.message}</div>
                </div>
                <div>
                    <FormSelect 
                        name="operationStoreId"
                        label="Store"
                        options={stores}
                        control={control}
                    />
                    <div>{errors.store?.message}</div>
                </div>
                <div>
                    <FormSelect
                        name="operationProductId" 
                        label="Product"
                        options={products}
                        control={control}
                    />
                    <div>{errors.product?.message}</div>
                </div>
                <div>
                    <FormTextField 
                        name="operationCount"
                        label="Count"
                        control={control}
                    />
                    <div>{errors.count?.message}</div>
                </div>
            </div>
            <div>
                <FormButton    
                    label="Save"
                    type="submit"
                    disabled={formState.isSubmitting}
                />
            </div>
        </form>
        */
    )
}

export {OperationAddEditForm}