import React, { Component } from 'react';
import { StyleSheet, View, Keyboard, Image, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, NativeModules } from 'react-native';
import { SIGNUP_6, CONTINUE, BACK } from '../../../../../constants'
import Colors from '../../../../../utils/colors'
import YellowButton from '../../../../../components/button';
import Icons from '../../../../../assets/icons'
import { heightToDp, widthToDp, getDeviceWidth, isValidPassword } from '../../../../../utils';

import ActivityIndicatorComponent from '../../../../../components/activityIndicator';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage';
import { RegistrationActionCreator } from '../../../../../redux/actionCreators/registration';
import { AuthActionCreator } from '../../../../../redux/actionCreators/auth';
import fonts from '../../../../../assets/fonts';
import Config from "react-native-config";
var Aes = NativeModules.Aes
import CryptoJS from "react-native-crypto-js";




// const keyToEncrytThePassword = 'IRM54JE9Q86DFE!@'
const keyToEncrytThePassword = 'IRM54JE9Q86DFE!@'


const mapStateToProps = (state) => ({

    loading: state.CreateMPinRegReducer.loading,
    request: state.CreateMPinRegReducer.request,
    response: state.CreateMPinRegReducer.response,

    mobileVerifiedLoading: state.MobileNumberVerifiedRegReducer.loading,
    mobileVerifiedRequest: state.MobileNumberVerifiedRegReducer.request,
    mobileVerifiedResponse: state.MobileNumberVerifiedRegReducer.response,

})

class SignUpStep6 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pin: '',
            confirmPin: '',

        }
    }

    componentDidMount() {
        // EncryptedStorage.getItem('userId',(res,err) => {
        //     if(res){
        //         this.props.dispatch(RegistrationActionCreator.isMobileNumberVerified(res,'true'))
        //     }
        // })
    }

    componentDidUpdate(prevProps) {
        const res = this.props.response
        if (typeof (res) != 'undefined') {
            if (Object.keys(res).length > 0) {
                if (typeof (res.Status) != 'undefined') {
                    if (res.Status == 'Success') {
                        // if(res.saved_status == 'true'){
                        this.props.dispatch(RegistrationActionCreator.resetResponse('5'))
                        if (typeof (this.props.route.params) != 'undefined') {
                            if (typeof (this.props.route.params.isChangePin) != undefined) {

                                this.props.dispatch(AuthActionCreator.isFirstTime(false))
                                this.props.dispatch(AuthActionCreator.isLoggedIn(false))
                                return
                            }
                        }

                        if (this.props.isFromLogin != null) {
                            if (this.props.isFromLogin) {
                                this.props.dispatch(AuthActionCreator.isFirstTime(false))
                                this.props.dispatch(AuthActionCreator.isLoggedIn(false))
                            } else {
                                this.props.navigation.navigate('SignUp7')
                            }
                        } else {
                            this.props.navigation.navigate('SignUp7')
                        }
                        // }
                    } else {
                        alert('There was a problem occured while creating the MPIN. Please try again.')
                    }
                }
                this.props.dispatch(RegistrationActionCreator.resetResponse('5'))
            }
        }
    }

    encryptData = (text, key) => {
        return Aes.randomKey(16).then(iv => {
            return Aes.encrypt(text, key, keyToEncrytThePassword).then(cipher => ({
                cipher,
                keyToEncrytThePassword,
            }))
        })
    }

    decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv)

    generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)

    onNextButtonTapped = () => {
        const pin = this.state.pin
        const cPin = this.state.confirmPin

        key = keyToEncrytThePassword
        let iv2 = keyToEncrytThePassword
        let utf8Key = CryptoJS.enc.Utf8.parse(key)
        console.warn('KEY: '+utf8Key)
        let utf8Iv = CryptoJS.enc.Utf8.parse(iv2)
        console.warn('IV: '+utf8Iv)
        let content = CryptoJS.enc.Utf8.parse(pin)
        

        var encrypted = CryptoJS.AES.encrypt(content, utf8Key, {
            iv:utf8Iv,
            mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
        });

        console.warn('ENCR: ' + encrypted + ' Type: '+typeof(encrypted.toString()))

        if(pin == cPin){
            Keyboard.dismiss()

        }

        // var decrypted = CryptoJS.AES.decrypt(encrypted, key)
        // console.warn('DEC: ' + decrypted)
        EncryptedStorage.getItem('userId', (res, err) => {
            if (res) {
                this.props.dispatch(RegistrationActionCreator.createMPin(res, encrypted.toString()))
            }
        })

        return

        var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");

        console.warn('KEY: ' + key)

        var iv1 = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");



        var encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv1 });

        console.warn('ENCR: ' + encrypted)

        return

        var salt = CryptoJS.lib.WordArray.random(128 / 8);
        var key128Bits = CryptoJS.PBKDF2(keyToEncrytThePassword, salt, {
            keySize: 128 / 32
        });

        let ciphertext = CryptoJS.AES.encrypt('my message', key128Bits).toString();

        console.warn('ENCR: ' + ciphertext)

        // Decrypt
        let bytes = CryptoJS.AES.decrypt(ciphertext, key128Bits);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        console.warn('DECR: ' + originalText);



        return

        const plaintxt = 'test@1234567890mnbvcasdwert';
        const secretKey = keyToEncrytThePassword;
        const iv = '1112131415161718';

        AesCrypto.encrypt(plaintxt, secretKey, iv).then(cipher => {
            console.warn('ENCRY: ' + cipher);// return a string type cipher
            AesCrypto.decrypt(cipher, secretKey, iv).then(plaintxt => {
                console.warn('DECRY: ' + plaintxt);// return a string type plaintxt
            }).catch(err => {
                console.warn(err);
            });
        }).catch(err => {
            console.warn(err);
        });



        return

        var vec = null;
        Des.encryptCbc("Test123@hgftffdtdtdsresresrese", keyToEncrytThePassword, '', function (base64) {
            console.warn('ENCRYPTED TEXT: ' + base64);
            Des.decryptCbc(base64, keyToEncrytThePassword, '', function (text) {
                console.warn('DECRYPTED TEXT: ' + text); //PizzaLiu is a good developer
            }, function () {
                console.warn("error");
            });
        }, function () {
            console.warn("error");
        });


        return

        // this.encryptData('Harsha', '1234')
        //     .then(({ cipher, iv }) => {
        //         console.warn('Encrypted:', cipher)

        //         this.decryptData({ cipher, iv }, '1234')
        //             .then(text => {
        //                 console.warn('Decrypted:', text)
        //             })
        //             .catch(error => {
        //                 console.warn(error)
        //             })
        //     })

        // return
        if (pin == cPin) {
            Keyboard.dismiss()
            EncryptedStorage.getItem('userId', (res, err) => {
                if (res) {
                    try {
                        this.generateKey(keyToEncrytThePassword, 'salt', 5000, 256).then(key => {
                            console.warn('Key:', key)
                            this.encryptData(pin, key)
                                .then(({ cipher, iv }) => {
                                    console.warn('Encrypted:', cipher, 'IV: ', iv)
                                    this.props.dispatch(RegistrationActionCreator.createMPin(res, cipher))

                                    this.decryptData({ cipher, keyToEncrytThePassword }, key)
                                        .then(text => {
                                            console.warn('Decrypted:', text)
                                        })
                                        .catch(error => {
                                            console.warn(error)
                                        })
                                })
                                .catch(error => {
                                    console.warn(error)
                                })
                        })
                    } catch (e) {
                        console.error(e)
                    }

                }
            })
        } else {
            alert('MPIN and Confirm MPIN do not match.')
        }
    }

    render() {

        const isFromLogin = this.props.isFromLogin
        const isCCS = Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')

        if (this.props.loading || this.props.mobileVerifiedLoading) {
            return (
                <ActivityIndicatorComponent />
            )
        }
        return (
            <KeyboardAvoidingView behaviour={Platform.OS == 'ios' && 'padding'} style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: getDeviceWidth() }} >

                    <View style={styles.textContainer} >
                        <Image source={Icons['LOCK']} resizeMode='contain' style={styles.image} />
                        <Text style={styles.textGreen} >{typeof (isFromLogin) != 'undefined' ? SIGNUP_6.lbl_2 : SIGNUP_6.lbl_1}</Text>
                        <View style={styles.InputContainer}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={true}
                                value={isCCS ? this.state.pin.replace(' ', '') : this.state.pin.replace('.', '')}
                                onChangeText={(text) => {
                                    if (isCCS) {
                                        this.setState({ pin: text.replace(' ', '') })
                                    } else {
                                        this.setState({ pin: text.replace('.', '') })
                                    }

                                }}
                                placeholder={isCCS ? 'Enter Password*' : "Enter 6 digit MPIN*"}
                                maxLength={isCCS ? 10 : 6}
                                keyboardType={isCCS ? 'default' : 'numeric'}
                                placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                underlineColorAndroid="transparent"
                                returnKeyType='next'
                                returnKeyLabel='Next'
                            />
                        </View>
                        {isCCS &&
                            <View>
                                {!isValidPassword(this.state.pin) && this.state.pin.length > 0 &&
                                    <Text style={{ fontFamily: fonts.regular, backgroundColor: 'transparent', fontSize: 12, color: Colors.APP_GREEN, textAlign: 'center', margin: 10 }}>Password is not valid</Text>
                                }
                            </View>
                        }
                        {isCCS &&
                            <Text style={{ fontFamily: fonts.regular, backgroundColor: 'transparent', fontSize: 12, color: Colors.APP_GREEN, textAlign: 'center', margin: 10 }}>Minimum 8 and maximum 10 characters{'\n'}Should contain alphanumeric and special characters</Text>}
                        <View style={styles.InputContainer}>
                            <TextInput
                                style={styles.textInput}
                                secureTextEntry={true}
                                value={isCCS ? this.state.confirmPin.replace(' ', '') : this.state.confirmPin.replace('.', '')}
                                onChangeText={(text) => {
                                    if (isCCS) {
                                        this.setState({ confirmPin: text.replace(' ', '') })
                                    } else {
                                        this.setState({ confirmPin: text.replace('.', '') })
                                    }

                                }}
                                placeholder={isCCS ? 'Confirm Password*' : "Confirm 6 digit MPIN*"}
                                maxLength={isCCS ? 10 : 6}
                                keyboardType={isCCS ? 'default' : 'numeric'}
                                placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                underlineColorAndroid="transparent"
                                returnKeyType='done'
                                returnKeyLabel='Done'
                            />
                        </View>
                        {isCCS &&
                            <View>
                                {!(this.state.pin === this.state.confirmPin) && this.state.confirmPin.length > 0 &&
                                    <Text style={{ fontFamily: fonts.regular, backgroundColor: 'transparent', fontSize: 12, color: Colors.APP_GREEN, textAlign: 'center', margin: 10 }}>Entered passwords do not match</Text>
                                }
                            </View>
                        }
                    </View>
                </ScrollView>
                <View style={styles.btnContainer} >
                    <YellowButton title={CONTINUE}
                        disabled={this.state.pin.length < 6 || this.state.confirmPin.length < 6 || !(this.state.pin === this.state.confirmPin)}
                        navigate={() => { this.onNextButtonTapped() }} />
                    {typeof (isFromLogin) != 'undefined' &&
                        <View style={{ marginTop: 10 }}>
                            <YellowButton title={BACK}
                                navigate={() => {
                                    this.props.dispatch(AuthActionCreator.isFirstTime(false))
                                    this.props.dispatch(AuthActionCreator.isLoggedIn(false))
                                }} />
                        </View>

                    }
                </View>
            </KeyboardAvoidingView>
        )
    }

}

export default connect(mapStateToProps)(SignUpStep6);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.BG_LIGHT_BLUE
    },
    textContainer: {
        width: getDeviceWidth(),
        alignItems: "center",
        justifyContent: 'center',
        alignContent: "center"
    },
    InputContainer: {
        width: widthToDp('70%'),
        marginTop: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Colors.APP_GREEN,
        borderRadius: 3,
        overflow: 'hidden'
    },
    textInput: {
        height: 42,
        color: Colors.TEXT_INPUT,
        backgroundColor: Colors.WHITE,
        paddingLeft: 10,
        fontFamily: fonts.medium
    },
    btnContainer:
    {
        width: getDeviceWidth(),
        marginVertical: 40,
        alignItems: "center"
    },
    image:
    {
        width: widthToDp('16%'),
        height: heightToDp('16%'),
        tintColor: Colors.YELLOW,
        marginTop: 30
    },
    textGreen:
    {
        color: Colors.APP_GREEN,
        fontSize: widthToDp('9%'),
        fontFamily: fonts.medium
    },
    textBlack:
    {
        color: Colors.BLACK,
        fontSize: widthToDp('4.5%'),
        marginTop: 10,
        fontFamily: fonts.medium
    }
});