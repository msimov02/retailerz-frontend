import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FirebaseContext } from '../Firebase';
import MeasureUnitService from '../../services/measure-unit.service';

const AddEdit = ({match}) => {
    
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {userId, measureUnitId} = match.params;
    const isAddMode = !measureUnitId;
    const currentUser = firebase.getCurrentUser();

    const { register, handleSubmit, reset, setValue, errors, formState} = useForm();

    const onSubmit = (data) => {
        return isAddMode
            ? createMeasureUnit(data)
            : updateMeasureUnit(data);
    }

    const createMeasureUnit = (data) => {

        currentUser.getIdToken().then(idToken => {
             MeasureUnitService.create(userId, data, idToken).then(res => {
                 history.push('.');
             });    
        })
    }

    const updateMeasureUnit = (data) => {
        currentUser.getIdToken().then(idToken => {
            MeasureUnitService.updateById(userId, measureUnitId, data, idToken).then(res => {
                history.push('..');
            })
        })
    }

    useEffect(() => {
        if(!isAddMode) {
            currentUser.getIdToken().then(idToken => {
                MeasureUnitService.findById(userId, measureUnitId, idToken).then(res => {
                    const fields = ['unit'];
                    fields.forEach(field => setValue(field, res[field]));
                })
            })
        }
    }, [currentUser, userId, measureUnitId, setValue, isAddMode]);

    return(
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Measure Unit' : 'Edit Measure Unit'}</h1>
            <div>
                <div>
                    <label>Unit</label>
                    <input name="unit" type="text" ref={register}/>
                    <div>{errors.unit?.message}</div>
                </div>
            </div>
            <div>
                <button type="submit" disabled={formState.isSubmitting}>
                    Save
                </button>
            </div>
        </form>
    )
    
}

export {AddEdit};