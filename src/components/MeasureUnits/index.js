import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {AddEdit} from './AddEdit';
import { List } from './List.js';

const MeasureUnits = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={AddEdit}/>
            
            <Route path={`${path}/:measureUnitId/edit`} component={AddEdit} />

            <Route path={`${path}`} component={List}/>
        </Switch>
    )
}

export default MeasureUnits;