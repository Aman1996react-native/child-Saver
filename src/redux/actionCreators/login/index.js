
import { ActionTypes } from '../../actionTypes';
import * as Endpoints from '../../../services/endPoints'
import * as NetworkParams from '../../../services/networkParams'
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-community/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthActionCreator } from '../auth';
import { GenericPostCall } from '../genericPostCall';

export const LoginctionCreator = {

  //login
  login: (mPin, email) => async (dispatch, getState) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST })
    try {
      const apiResponse = await GenericPostCall(dispatch, Endpoints.Login, JSON.stringify({
        mpin: mPin,
        email_id: email,
      }))

      console.warn(JSON.stringify(apiResponse))

      if (apiResponse != null) {
        if (Object.keys(apiResponse).length > 0) {
          if (typeof (apiResponse.Status) != 'undefined') {
            if (apiResponse.Status == 'Success') {
              // if (apiResponse.userExist == 'true') {
              if (typeof (apiResponse.Token) != 'undefined') {
                if (apiResponse.Token != null) {
                  if (typeof (apiResponse.Token.access_token) != 'undefined') {
                    if (apiResponse.Token.access_token.length > 10) {
                      try {
                        // if (typeof (apiResponse.IsPrimaryUser) != 'undefined') {

                        //   await EncryptedStorage.setItem('isPrimaryUser', JSON.stringify(apiResponse.IsPrimaryUser))
                        // } else {
                        //   await EncryptedStorage.setItem('isPrimaryUser', JSON.stringify(true))
                        // }
                        await EncryptedStorage.setItem('userId', 'No User Id')

                        await EncryptedStorage.setItem('sessionToken', JSON.stringify(apiResponse.Token))
                        let today = new Date();
                        let date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
                        let time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
                        let dateTime = date + 'T' + time;
                        await EncryptedStorage.setItem('timeWhenGotAccessToken', dateTime)

                        await EncryptedStorage.setItem('email', email)
                        dispatch(AuthActionCreator.isLoggedIn(true))
                        dispatch(AuthActionCreator.isFirstTime(false))
                      } catch (e) {

                      }
                    }
                  }
                }


              } else {
                dispatch(AuthActionCreator.isLoggedIn(false))
                dispatch(AuthActionCreator.isFirstTime(true))
              }
              // } else {
              //   dispatch(AuthActionCreator.isLoggedIn(false))
              //   dispatch(AuthActionCreator.isFirstTime(true))
              // }
            }
          }

        }
      }
      dispatch({ type: ActionTypes.LOGIN_RESPONSE, payload: apiResponse })
    }
    catch (e) {
      console.log('/////...../////ERROR: ' + e.toString())
      dispatch({ type: ActionTypes.LOGIN_RESPONSE, payload: e, error: true })
    }
  },

  //Forgot MPIN
  forgotMpin: (email) => async (dispatch, getState) => {

    dispatch({ type: ActionTypes.FORGOT_PIN_REQUEST })
    try {
      const apiResponse = await GenericPostCall(dispatch, Endpoints.ForgottenPin, JSON.stringify({
        email_id: email,
      }))

      dispatch({ type: ActionTypes.FORGOT_PIN_RESPONSE, payload: apiResponse })
    }
    catch (e) {
      console.log('/////...../////ERROR: ' + e.toString())
      dispatch({ type: ActionTypes.FORGOT_PIN_RESPONSE, payload: e, error: true })
    }
  },

  //change MPIN
  changePin: (email, dynamicLink, userId) => async (dispatch, getState) => {

    dispatch({ type: ActionTypes.CHANGE_PIN_REQUEST })
    try {
      const apiResponse = await GenericPostCall(dispatch, Endpoints.ChangePin, JSON.stringify({
        email_id: email,
      }))


      dispatch({ type: ActionTypes.CHANGE_PIN_RESPONSE, payload: apiResponse })
    }
    catch (e) {
      console.log('/////...../////ERROR: ' + e.toString())
      dispatch({ type: ActionTypes.CHANGE_PIN_RESPONSE, payload: e, error: true })
    }
  },

  //getemail address
  getEmailAddress: () => async (dispatch, getState) => {

    dispatch({ type: ActionTypes.GET_EMAIL_REQUEST })
    try {
      EncryptedStorage.getItem('email', (res, err) => {
        if (res) {
          let email = res
          let emailToBeSent = ''
          let finalArr = [];
          let finalArr1 = []
          if (typeof (res) != 'undefined') {
            if (res != null) {
              if (res.length > 4) {

                let str = res
                str = str.split('');

                let len = str.indexOf('@');
                str.forEach((item, pos) => {
                  (pos >= 3 && pos <= len) ? finalArr.push('*') : finalArr.push(str[pos]);
                })
                console.warn(finalArr.join(''))

                let masked1 = finalArr.join('').split('')

                let length = masked1.indexOf('.');
                masked1.forEach((item, pos) => {
                  (pos >= 3 && pos <= length) ? finalArr1.push('*') : finalArr1.push(masked1[pos]);
                })

                console.warn(finalArr1.join(''))



                let splittedEmail = res.split('.')
                if (typeof (splittedEmail) != 'undefined') {
                  if (splittedEmail != null) {
                    if (splittedEmail.length > 1) {
                      const splittedLength = splittedEmail.length

                      emailToBeSent = res.substring(0, 3) + '***.' + splittedEmail[splittedLength - 1]

                    }
                  }
                }
              }
            }
          }
          dispatch({ type: ActionTypes.GET_EMAIL_RESPONSE, payload: { email: finalArr1.join('') } })
        }
      })

    }
    catch (e) {
      console.log('/////...../////ERROR: ' + e.toString())
      dispatch({ type: ActionTypes.GET_EMAIL_RESPONSE, payload: e, error: true })
    }
  },

  resetResponse: (name) => async (dispatch, getState) => {
    switch (name) {
      case '1':
        dispatch({ type: ActionTypes.LOGIN_RESET, payload: {} })
        break;

      case '2':
        dispatch({ type: ActionTypes.CHANGE_PIN_RESET, payload: {} })
        break;
      case '3':
        dispatch({ type: ActionTypes.FORGOT_PIN_RESET, payload: {} })
        break;
      default:
        break;
    }
  }
}