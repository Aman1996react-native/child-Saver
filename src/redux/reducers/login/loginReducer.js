import {ActionTypes} from '../../actionTypes';

const initialState = {
    loading:false,
    response:{},
    error:false
}

export default LoginReducer = (state = initialState,action) => {

    const {type,payload,error} = action;

    switch(type){
        case ActionTypes.LOGIN_REQUEST: {
            return {...state,loading:true,error:false}
        }
        case ActionTypes.LOGIN_RESPONSE: {
            if(error){
                return {...state,loading:false,error:true}
            }
            return {...state,loading:false, error:false,response:payload}
        }
        case ActionTypes.LOGIN_RESET: {
            return {...state,loading:false, error:false,response:{}}
            
        }
    }
    return state;
}
