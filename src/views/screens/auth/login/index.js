import React, { useState, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import Colors from '../../../../utils/colors'
import { getDeviceWidth, widthToDp, isValidEmail } from '../../../../utils';
import { connect } from 'react-redux';
import ActivityIndicatorComponent from '../../../../components/activityIndicator';
import { LoginctionCreator } from '../../../../redux/actionCreators/login';
import AsyncStorage from '@react-native-community/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage';
import fonts from '../../../../assets/fonts';
import { AuthActionCreator } from '../../../../redux/actionCreators/auth';
import colors from '../../../../utils/colors';
import Icons from '../../../../assets/icons';
import Modal from 'react-native-modal';


import Config from "react-native-config";
import YellowButton from '../../../../components/button';
import { DYNAMIC_LINK } from '../../../../constants';
import { CheckAccessTokenExpiryTime } from '../../../../redux/actionCreators/checkAccessTokenExpiry';



const mapStateToProps = (state) => ({

  loading: state.LoginReducer.loading,
  request: state.LoginReducer.request,
  response: state.LoginReducer.response,

  forgtPinLoading: state.ForgotMPINReducer.loading,
  forgtPinRequest: state.ForgotMPINReducer.request,
  forgtPinResponse: state.ForgotMPINReducer.response,

  changePinLoading: state.ChangePinReducer.loading,
  changePinRequest: state.ChangePinReducer.request,
  changePinResponse: state.ChangePinReducer.response,

})

let enterPin = 'Enter your 6 digit PIN'
let forgotPin = 'Forgotten Pin?'

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      atext: false,
      btext: false,
      ctext: false,
      dtext: false,
      etext: false,
      ftext: false,
      code: '',
      password: '',
      errorMessage: '',
      email: '',
      forgotPinTapped: false,
      emailIfForgottenPassword: '',
      errorMessageChangePin: ''
    }
  }

  concatCode = (value) => {

    var res = this.state.code
    res = res.concat(value)
    this.setState({ code: res }, () => {
      if (this.state.code.length == 6) {
        EncryptedStorage.getItem('email', (res, err) => {
          if (res != null && res) {
            this.props.dispatch(LoginctionCreator.login(this.state.code, res))
          } else {
            // this.props.navigation.navigate('NameEmail')
            this.props.dispatch(AuthActionCreator.isFirstTime(true))
          }
        })
      }
    })
  }

  validateCode = () => {

  }

  clearCode = () => {
    this.setState({ atext: false, btext: false, ctext: false, dtext: false, etext: false, ftext: false, code: '' })
  }




  numberpressed = (value) => {
    const atext = this.state.atext
    const btext = this.state.btext
    const ctext = this.state.ctext
    const dtext = this.state.dtext
    const etext = this.state.etext
    const ftext = this.state.ftext

    if (!atext) {
      this.setState({ atext: true }, () => {
        this.concatCode(value);
      })

    } else if (atext && !btext) {
      this.setState({ btext: true }, () => {
        this.concatCode(value);
      })
    } else if (btext && !ctext) {
      this.setState({ ctext: true }, () => {
        this.concatCode(value);
      })
    } else if (ctext && !dtext) {
      this.setState({ dtext: true }, () => {
        this.concatCode(value);
      })
    }
    else if (dtext && !etext) {
      this.setState({ etext: true }, () => {
        this.concatCode(value);
      })
    }
    else if (etext && !ftext) {
      this.setState({ ftext: true }, () => {
        this.concatCode(value);
        // this.validateCode();
      })

    }
  }

  async componentDidMount() {
    const email = await EncryptedStorage.getItem('email')

  //  console.warn('HEHEHEHEHEE TOKEN: '+ await EncryptedStorage.getItem('sessionToken'))

    // console.warn(email)
    if (typeof (email) != 'undefined') {
      if (email != null) {
        if (email) {
          this.setState({ email: email, emailIfForgottenPassword: email })
        }
      }
    }
  }

  async componentDidUpdate() {
    const res = this.props.forgtPinResponse

    // console.warn('FORGOT PIN: ' + JSON.stringify(res))
    const response = this.props.response
    if (typeof (res) != 'undefined') {
      // console.warn(JSON.stringify(res))
      if (Object.keys(res).length > 0) {
        this.props.dispatch(LoginctionCreator.resetResponse('3'))
        if (typeof (res.Status) != 'undefined' && typeof (res.pinMailSent) != 'undefined') {
          if (res.Status == 'Success' && res.pinMailSent == 'true') {
            if (typeof (res.Token) != 'undefined') {
              if (res.Token != null) {
                if (typeof (res.Token.access_token) != 'undefined') {
                  if (res.Token.access_token != null) {
                    await EncryptedStorage.setItem('sessionToken', JSON.stringify(res.Token))
                    let today = new Date();
                    let date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
                    let time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
                    let dateTime = date + 'T' + time;
                    await EncryptedStorage.setItem('timeWhenGotAccessToken', dateTime)
                    this.setState({ forgotPinTapped: false }, () => {
                      this.props.navigation.navigate('Change Pin Verification', { isFromLogin: true })
                    })

                  }
                }
              }
            }


          } else {
            if (typeof (res.Description) != 'undefined') {
              if (res.Description != null) {
                this.setState({ errorMessageChangePin: res.Description })
              }
            }
          }
        }
      }
    }

    if (typeof (response) != 'undefined') {
      if (response != null) {
        if (Object.keys(response).length > 0) {
          this.props.dispatch(LoginctionCreator.resetResponse('1'))
          if (typeof (response.Status) != 'undefined') {
            if (response.Status == 'Fail') {
              this.setState({ errorMessage: 'Incorrect Password' })
            }
          }
        }

      }
    }
  }

  forgotMPIN = async () => {

    this.props.dispatch(LoginctionCreator.forgotMpin(this.state.emailIfForgottenPassword))

  }

  render() {
    const atext = this.state.atext
    const btext = this.state.btext
    const ctext = this.state.ctext
    const dtext = this.state.dtext
    const etext = this.state.etext
    const ftext = this.state.ftext

    enterPin = (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Enter Email and Password' : 'Enter your 6 digit PIN'
    forgotPin = (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Forgotten Password?' : 'Forgotten Pin?'

    if (this.props.loading || this.props.forgtPinLoading || this.props.changePinLoading) {
      return (
        <ActivityIndicatorComponent />
      )
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageBgContainer}>
          <View resizeMode='stretch' style={styles.imageBg}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: "center"
            }}>

              <Modal backdropOpacity={0.6}
                backdropColor={'#000000'} isVisible={this.state.forgotPinTapped} style={styles.modal}>
                <View style={styles.modalTopView}>
                  {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) &&
                    <Image
                      resizeMode='contain'
                      style={{
                        width: 60,
                        height: 60,
                        marginBottom: 20
                      }}
                      source={Icons['CCS_REG1']}
                    />}
                  <Text style={[styles.numStyle, { fontFamily: fonts.bold }]}>Confirm Email*</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, width: '80%', borderWidth: 1, borderColor: colors.APP_GREEN, borderRadius: 5 }}>
                    <TextInput
                      placeholder='Email*'
                      value={this.state.emailIfForgottenPassword}
                      onChangeText={(text) => {
                        this.setState({ emailIfForgottenPassword: text })
                      }}
                      placeholderTextColor={colors.GREY}
                      keyboardType='email-address'
                      autoCapitalize="none"
                      style={[styles.numStyle, { marginTop: Platform.OS =="android" ? 3 : 10, marginBottom:Platform.OS =="android" ? 3 : 10, width: '100%', textAlign: 'center' }]}
                    />
                    {!isValidEmail(this.state.emailIfForgottenPassword) && this.state.email != '' &&
                      <Text style={{ fontFamily: fonts.regular, color: Colors.APP_GREEN, fontSize: 12, textAlign: 'center' }}>Invalid email address</Text>
                    }
                  </View>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', margin: 10, color: Colors.APP_GREEN }}>{this.state.errorMessageChangePin}</Text>
                  <YellowButton
                    title='Proceed'
                    style={{ width: '80%', alignSelf: 'center', marginTop: 20, }}
                    disabled={this.state.emailIfForgottenPassword.length < 3 || !isValidEmail(this.state.emailIfForgottenPassword)}
                    navigate={() => {
                      this.setState({ errorMessageChangePin: '' })
                      this.forgotMPIN()
                    }}
                  />
                  <YellowButton
                    title='Close'
                    style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}
                    navigate={() => {
                      this.setState({ forgotPinTapped: false, errorMessageChangePin: '' })
                    }}
                  />
                </View>
              </Modal>

              {(!Config.ENV.includes('ccsDev') && !Config.ENV.includes('ccsProd')) &&
                <Text style={{ marginTop: 15, fontFamily: fonts.bold, fontSize: 22 }}>{enterPin}</Text>}

              {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) &&
                <View style={{ alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: getDeviceWidth() - 30, marginLeft: 15, marginRight: 15 }}>
                    <Text style={{ marginTop: 15, fontFamily: fonts.bold, fontSize: 22 }}>Login</Text>
                    <Image style={{ width: 200, height: 120, marginBottom: -20 }}
                      resizeMode="contain" source={Icons['CCS_REG3']} />
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', width: getDeviceWidth() - 40, margin: 20, borderWidth: 1, borderColor: colors.APP_GREEN, borderRadius: 5 }}>
                    <TextInput
                      placeholder='Email*'
                      value={this.state.email}
                      onChangeText={(text) => {
                        this.setState({ email: text, emailIfForgottenPassword: text })
                      }}
                      placeholderTextColor={colors.GREY}
                      keyboardType='email-address'
                      autoCapitalize="none"
                      style={[styles.numStyle, { marginTop: Platform.OS =="android" ? 3 : 10, marginBottom:Platform.OS =="android" ? 3 : 10, width: '100%', textAlign: 'center' }]}
                    />
                    {!isValidEmail(this.state.email) && this.state.email != '' &&
                      <Text style={{ fontFamily: fonts.regular, color: Colors.APP_GREEN, fontSize: 12, textAlign: 'center' }}>Invalid email address</Text>
                    }

                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', width: getDeviceWidth() - 40, margin: 20, borderWidth: 1, borderColor: colors.APP_GREEN, borderRadius: 5 }}>
                    <TextInput
                      placeholder='Password*'
                      value={this.state.password}
                      onChangeText={(text) => {
                        this.setState({ password: text })
                      }}
                      secureTextEntry={true}
                      placeholderTextColor={colors.GREY}
                      style={[styles.numStyle, { marginTop: Platform.OS =="android" ? 5 : 10, marginBottom:Platform.OS =="android" ? 5 : 10, width: '100%', textAlign: 'center' }]}
                    />
                  </View>

                  <Text style={{ fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', margin: 10, color: Colors.APP_GREEN }}>{this.state.errorMessage}</Text>

                  <YellowButton
                    disabled={this.state.password.length < 7 || this.state.password == null || this.state.email.length < 3 ||
                      !isValidEmail(this.state.email)}
                    navigate={() => {
                      this.props.dispatch(LoginctionCreator.login(this.state.password, this.state.email))
                      return
                      EncryptedStorage.getItem('email', (res, err) => {
                        if (res != null && res) {
                          this.props.dispatch(LoginctionCreator.login(this.state.password, res))
                        } else {
                          // this.props.navigation.navigate('NameEmail')
                          this.props.dispatch(AuthActionCreator.isFirstTime(true))
                        }
                      })
                    }}
                    title='Sign In'
                  />
                </View>
              }

              {(!Config.ENV.includes('ccsDev') && !Config.ENV.includes('ccsProd')) &&
                <View style={{ flexDirection: 'row' }} >
                  {atext ? <View style={styles.pinFilled} /> : <View style={styles.pin} />}
                  {btext ? <View style={styles.pinFilled} /> : <View style={styles.pin} />}
                  {ctext ? <View style={styles.pinFilled} /> : <View style={styles.pin} />}
                  {dtext ? <View style={styles.pinFilled} /> : <View style={styles.pin} />}
                  {etext ? <View style={styles.pinFilled} /> : <View style={styles.pin} />}
                  {ftext ? <View style={styles.pinFilled} /> : <View style={styles.pin} />}
                </View>
              }

              <TouchableOpacity >

                <View style={{ width: "100%", alignItems: "center" }} >

                  <Text style={{ fontSize: 15, }}></Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ forgotPinTapped: true, errorMessageChangePin: '' })
                    }}
                    style={{ padding: 10, height: 40 }}>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold }}>{forgotPin}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.dispatch(AuthActionCreator.isFirstTime(true))
                      this.props.dispatch(AuthActionCreator.isLoggedIn(false))
                    }}
                    style={{ padding: 10, height: 40 }}>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.APP_GREEN }}>New User? Register</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {(!Config.ENV.includes('ccsDev') && !Config.ENV.includes('ccsProd')) ?
          <View style={styles.keypadContainer}>

            {/* 1st row */}
            <View style={styles.keypadRow} >
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(1)}>
                <Text style={styles.numStyle}>1</Text>
                <Text style={{ fontSize: 8, color: Colors.BG_LIGHT_BLUE }}>LLL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(2)}>
                <Text style={styles.numStyle}>2</Text>
                <Text style={styles.textStyle}>ABC</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(3)}>
                <Text style={styles.numStyle}>3</Text>
                <Text style={styles.textStyle}>DEF</Text>
              </TouchableOpacity>
            </View>




            {/* 2nd row */}
            <View style={styles.keypadRow} >
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(4)}>
                <Text style={styles.numStyle}>4</Text>
                <Text style={styles.textStyle}>GHI</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(5)}>
                <Text style={styles.numStyle}>5</Text>
                <Text style={styles.textStyle}>JKL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(6)}>
                <Text style={styles.numStyle}>6</Text>
                <Text style={styles.textStyle}>MNO</Text>
              </TouchableOpacity>
            </View>
            {/* 3rd row */}
            <View style={styles.keypadRow} >
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(7)}>
                <Text style={styles.numStyle}>7</Text>
                <Text style={styles.textStyle}>PQRS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(8)}>
                <Text style={styles.numStyle}>8</Text>
                <Text style={styles.textStyle}>TUV</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(9)}>
                <Text style={styles.numStyle}>9</Text>
                <Text style={styles.textStyle}>WXYZ</Text>
              </TouchableOpacity>
            </View>
            {/* 4th row */}
            <View style={styles.keypadRow} >
              <TouchableOpacity disabled={true} style={[styles.keyBg, { backgroundColor: 'transparent' }]}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: Colors.BG_LIGHT_BLUE
                }}></Text>
                <Text style={{ fontSize: 8, color: Colors.BG_LIGHT_BLUE }}></Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.keyBg} onPress={() => this.numberpressed(0)}>
                <Text style={styles.numStyle}>0</Text>
                <Text style={{ fontSize: 8, color: Colors.BG_LIGHT_BLUE }}>LLL</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.keyBg, { backgroundColor: 'transparent' }]} onPress={() => this.clearCode()}>
                <Image style={{ width: 32, height: 32, tintColor: colors.BLACK }} resizeMode="cover" source={require('../../../../assets/images/clear.png')} />
              </TouchableOpacity>
            </View>

          </View>

          :

          null


        }
      </SafeAreaView>
    );
  }

}

export default connect(mapStateToProps)(LoginPage);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageBgContainer: {
    flex: 5.5,
    width: '100%',
    height: 280,
    borderWidth: .1,
    borderColor: Colors.White,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    overflow: 'hidden',

    // height: heightToDp('42%') 
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  keypadContainer:
  {
    flex: 4.5,
    backgroundColor: Colors.LightGray,
    justifyContent: 'space-around',
    padding: 10
  },
  keypadRow: {
    flexDirection: 'row',
    backgroundColor: Colors.LightGray,
    justifyContent: 'space-around'
  },
  keyBg: {
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    margin: 5,
    paddingVertical: 10,
    flex: 1
  },
  numStyle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: Colors.BLACK,
  },
  textStyle: {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: Colors.BLACK
  },
  pin: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.APP_GREEN,
    borderRadius: 10,
  },
  pinFilled: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.APP_GREEN,
    borderRadius: 10,
    backgroundColor: colors.APP_GREEN
  },
  modal: {
    width: getDeviceWidth() - 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTopView: {
    backgroundColor: colors.White,
    // height: getDeviceWidth(),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    // height: 340,
    paddingTop: 20,
    paddingBottom: 20
  }
});
