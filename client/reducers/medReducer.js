//the med reducer function

import { application } from 'express';
import * as types from '../constants/actionTypes'

function medsReducer () {
    switch (application.type) {
        case types.ADD_MED: {

        }
        case types.DELETE_MED: {

        }
        case types.MODIFY_MED: {
            
        }
    }
}

export { medsReducer };