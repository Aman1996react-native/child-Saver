import  {ActionTypes} from '../../../actionTypes';
import * as Endpoints from '../../../../services/endPoints'
import * as NetworkParams from '../../../../services/networkParams'
import AsyncStorage from '@react-native-community/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage';
import { RewardsActionCreator } from '../rewards';
import { GenericGetCall, GenericPostCall } from '../../genericPostCall';



export const OtherAPIActionCreator = {

  //update fcm token
  updateFcmToken: (userId,fcmToken,platform) => async (dispatch,getState) => {

        dispatch({type:ActionTypes.UPDATE_FCM_TOKEN_REQUEST})
        try{
       
        const apiResponse = await GenericPostCall(dispatch,Endpoints.UpdateFCMToken,JSON.stringify({
          user_id:userId,
          FCMToken:fcmToken,
          Platform:platform
      }))
            
            dispatch({type:ActionTypes.UPDATE_FCM_TOKEN_REPONSE,payload:apiResponse})
        }
        catch(e){
          console.log('/////...../////ERROR: '+e.toString())
            dispatch({type:ActionTypes.UPDATE_FCM_TOKEN_REPONSE,payload:e,error:true})
        }
  },

  //get maintainance status
  getMaintainanceStatus: () => async (dispatch,getState) => {

    dispatch({type:ActionTypes.GET_MAINTAINANCE_REQUEST}) 
    try{
        const apiResponse = await GenericGetCall(Endpoints.MaintenanceStatus,dispatch)
    
        dispatch({type:ActionTypes.GET_MAINTAINANCE_REPONSE,payload:apiResponse})
    }
    catch(e){
      console.log('/////...../////ERROR get maintainance: '+e.toString())
        dispatch({type:ActionTypes.GET_MAINTAINANCE_REPONSE,payload:e,error:true})
    }
},

//force update
forceUpdate: (platform) => async (dispatch,getState) => {

    dispatch({type:ActionTypes.FORCE_UPDATE_REQUEST})
    try{
   
    const apiResponse = await GenericPostCall(dispatch,Endpoints.ForceUpdate,JSON.stringify({
      Platform:platform
    }))
        
        dispatch({type:ActionTypes.FORCE_UPDATE_REPONSE,payload:apiResponse})
    }
    catch(e){
      console.log('/////...../////ERROR: '+e.toString())
        dispatch({type:ActionTypes.FORCE_UPDATE_REPONSE,payload:e,error:true})
    }
},
//get woolworth's details
getWoolworthDetails: (userId) => async (dispatch,getState) => {

  dispatch({type:ActionTypes.GET_WOOLWORTH_REQUEST})
  try{
 
  const apiResponse = await GenericPostCall(dispatch,Endpoints.RequestWoolworth,JSON.stringify({
    user_id:userId
  }))

  console.warn('Woolworth: '+JSON.stringify(apiResponse))
      
      dispatch({type:ActionTypes.GET_WOOLWORTH_REPONSE,payload:apiResponse})
  }
  catch(e){
    console.log('/////...../////ERROR: '+e.toString())
      dispatch({type:ActionTypes.GET_WOOLWORTH_REPONSE,payload:e,error:true})
  }
},

resetWoolworthDetails: () => async (dispatch,getState) => {
  dispatch({type:ActionTypes.GET_WOOLWORTH_RESET,payload:{}})
},
}