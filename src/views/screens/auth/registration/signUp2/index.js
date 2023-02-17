import React, { Component } from 'react';
import {
    StyleSheet, View, Image, Text, TextInput, ScrollView,
    KeyboardAvoidingView, Platform, Keyboard, SafeAreaView
} from 'react-native';
import { SIGNUP_2, NEXT, DYNAMIC_LINK } from '../../../../../constants'
import Colors from '../../../../../utils/colors'
import YellowButton from '../../../../../components/button';
import Icons from '../../../../../assets/icons'
import { heightToDp, widthToDp, getDeviceWidth, isValidEmail } from '../../../../../utils';

import { RegistrationActionCreator } from '../../../../../redux/actionCreators/registration';
import { connect } from 'react-redux';
import ActivityIndicatorComponent from '../../../../../components/activityIndicator';
import { AuthActionCreator } from '../../../../../redux/actionCreators/auth';
import fonts from '../../../../../assets/fonts';
import Config from "react-native-config";
import colors from '../../../../../utils/colors';
import { color } from 'react-native-reanimated';




const mapStateToProps = (state) => ({

    loading: state.SendNameAndEmailRegReducer.loading,
    request: state.SendNameAndEmailRegReducer.request,
    response: state.SendNameAndEmailRegReducer.response,

})

class SignUpStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            surname: '',
            referralCode: '',
            moveUp: false,
            errorMessage: '',
            mobileNumber: ''
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({ moveUp: true })
    }

    _keyboardDidHide = () => {
        this.setState({ moveUp: false });
    }

    moveToSignUp3() {

        const { email, name, surname } = this.state;
        const { dispatch } = this.props
        dispatch(RegistrationActionCreator.sendNameAndEmailAddress(name, surname, email, DYNAMIC_LINK, this.state.referralCode, this.state.mobileNumber))
        // this.props.navigation.navigate('SignUp3')
    }

    componentDidUpdate(prevProps) {

        if (typeof (this.props.response) != 'undefined') {
            if (Object.keys(this.props.response).length > 0) {
                if (typeof (this.props.response.Status) != 'undefined') {
                    if (this.props.response.Status == 'Success') {
                        const { dispatch } = this.props
                        console.log(JSON.stringify(this.props.response))
                        if (typeof (this.props.response.userExist) != 'undefined') {
                            const response = this.props.response
                            if (typeof (response.VerificationPending) != 'undefined') {
                                const pending = response.VerificationPending != null ? response.VerificationPending.toLowerCase() : null
                                if (pending == null) {
                                    if (this.props.response.userExist == 'true') {
                                        dispatch(AuthActionCreator.isFirstTime(false))
                                        dispatch(AuthActionCreator.isLoggedIn(false))
                                    }
                                }
                                // else if(pending == 'email'){
                                //     // if(typeof(this.props.response.emailVerificationCode) != 'undefined'){
                                //     //     if(this.props.response.emailVerificationCode != null){
                                //     //         if(this.props.response.emailVerificationCode != ''){
                                //                 this.props.navigation.navigate('SignUp3')
                                //     //         }
                                //     //     }

                                //     // }else{
                                //     //     // this.props.navigation.navigate('SignUp3',{emailVerificationCode:''})
                                //     // }
                                // }
                                else if (pending == 'mobile') {
                                    this.props.dispatch(RegistrationActionCreator.isEmailVerified(response.user_id, 'true'))
                                    this.props.navigation.navigate('SignUp5')
                                } else if (pending == 'mpin') {
                                    this.props.navigation.navigate('SignUp6')
                                } else {
                                    this.props.navigation.navigate('SignUp7')
                                }
                            }


                        }

                        dispatch(RegistrationActionCreator.resetResponse('1'))
                    } else {
                        const { dispatch } = this.props
                        dispatch(RegistrationActionCreator.resetResponse('1'))
                        if (typeof (this.props.response.Description) != 'undefined') {
                            if (this.props.response.Description) {
                                this.setState({ errorMessage: this.props.response.Description })
                            }
                        }
                    }
                }
            }
        }
    }

    handleEmail = (text) => {

        this.setState({ email: text })
    }
    handleName = (text, isSurname) => {
        if (isSurname) {
            this.setState({ surname: text })
        } else {
            this.setState({ name: text })
        }

    }

    render() {
        const props = this.props
        let isSignup = typeof (this.props.isFromLogin) != 'undefined' ? false : true
        if (typeof (this.props.route) != 'undefined') {
            isSignup = this.props.route.params.isSignUp
        }
        if (props.loading) {
            return (
                <ActivityIndicatorComponent />
            )
        }

        return (
            <SafeAreaView style={styles.container1}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' && 'padding'}
                    style={this.state.moveUp ? isSignup ? [styles.container, { marginTop: -200 }] : [styles.container, { marginTop: -140 }] : styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false} style={{ width: getDeviceWidth() }} >
                        <View style={styles.textContainer} >
                            {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd'))
                                ?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', width: getDeviceWidth() - 40, margin: 20 }}>
                                    <Image source={Icons['CCS_REG1']} resizeMode='contain' style={[styles.image, { marginTop: 50 }]} />
                                    <Image source={Icons['CCS_YELLOWBUBBLE']} resizeMode='contain' style={[styles.image, { marginTop: -20, width: getDeviceWidth() / 3,height:120 }]} />
                                </View>

                                :
                                <Image source={Icons['PUZZLE']} resizeMode='contain' style={styles.image} />
                            }

                            {(!Config.ENV.includes('ccsDev') && !Config.ENV.includes('ccsProd')) &&
                                <View>
                                    <Text style={styles.textGreen} >{isSignup && SIGNUP_2.lbl_1}</Text>
                                    <Text style={styles.textGreen} >{isSignup && SIGNUP_2.lbl_2}</Text>
                                    <Text style={styles.textGreen} >{isSignup && SIGNUP_2.lbl_3}</Text>
                                    <Text style={[styles.textGreen, { marginBottom: 10 }]} >{isSignup && SIGNUP_2.lbl_4}</Text>
                                    <Text style={styles.textBlack} >{isSignup && SIGNUP_2.lbl_5}</Text>
                                    <Text style={styles.textBlack} >{isSignup && SIGNUP_2.lbl_6}</Text>
                                    <Text style={[styles.textBlack, { margin: 10, textAlign: 'center' }]} >{(!isSignup || this.props.isFromLogin) && SIGNUP_2.lbl_7}</Text>
                                </View>

                            }
                            {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) &&
                                <View>
                                    <Text style={[styles.textGreen, { fontFamily:fonts.medium,color: Colors.BLACK, fontSize: 15,marginBottom:10, marginLeft: 30,marginRight: 30 }]} >{SIGNUP_2.ccs_lbl}</Text>
                                </View>
                            }

                            <View style={styles.InputMainContainer}>
                                <View style={styles.InputContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="First Name*"
                                        placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                        underlineColorAndroid="transparent"
                                        value={this.state.name}
                                        onChangeText={(text) => { this.handleName(text, false) }}
                                        autoCapitalize='words'
                                        maxLength={15}
                                        onTouchStart={() => {

                                        }}

                                    />
                                </View>
                                <View style={styles.InputContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Last Name*"
                                        placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                        underlineColorAndroid="transparent"
                                        value={this.state.surname}
                                        onChangeText={(text) => { this.handleName(text, true) }}
                                        autoCapitalize='words'
                                        maxLength={15}
                                        onTouchStart={() => {

                                        }}

                                    />
                                </View>
                                <View style={styles.InputContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Email*"
                                        placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                        underlineColorAndroid="transparent"
                                        value={this.state.email}
                                        onChangeText={this.handleEmail}
                                        autoCapitalize="none"
                                        maxLength={80}
                                        keyboardType='email-address'
                                        onTouchStart={() => {

                                        }}

                                    />
                                    {!isValidEmail(this.state.email) && this.state.email != '' &&
                                        <Text style={{ fontFamily: fonts.regular, color: colors.APP_GREEN, fontSize: 12, textAlign: 'center' }}>Invalid email address</Text>}
                                </View>
                                <View style={styles.InputContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Mobile*"
                                        value={this.state.mobileNumber.replace('.', '')}
                                        onChangeText={(text) => {
                                            this.setState({ mobileNumber: text.replace('.', '') })
                                        }}
                                        maxLength={11}
                                        keyboardType='numeric'
                                        placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                        underlineColorAndroid="transparent"
                                        returnKeyLabel='Done'
                                        returnKeyType='done'
                                    />
                                </View>
                                {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd'))
                                    ?
                                    isSignup
                                        ?
                                        <View style={[styles.InputContainer, {padding: 10, alignItems: 'center' }]}>
                                            <Text style={[styles.textBlack, { textAlign: 'center', fontSize: 14, marginBottom: 5 }]}>If you have been referred by an existing member of Childcare Saver, enter your referral code below.</Text>
                                            <TextInput
                                                style={[styles.textInput, { width: '100%', borderWidth: 1, borderColor: colors.APP_GREEN }]}
                                                placeholder="Referral code"
                                                placeholderTextColor={Colors.TEXT_INPUT_PLACEHOLDER}
                                                underlineColorAndroid="transparent"
                                                value={this.state.referralCode}
                                                onChangeText={(text) => {
                                                    this.setState({ referralCode: text })
                                                }}
                                                autoCapitalize="none"
                                                maxLength={10}
                                                onTouchStart={() => {

                                                }}

                                            />
                                        </View>
                                        :
                                        null
                                    :
                                    null
                                }

                            </View>


                        </View>
                    </ScrollView>
                    <View style={styles.btnContainer} >
                        <Text style={{ fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', margin: 10, color: Colors.APP_GREEN }}>{this.state.errorMessage}</Text>
                        <YellowButton
                            disabled={this.state.email.length < 1 || this.state.name.length < 1 || this.state.surname.length < 1 ||
                                !isValidEmail(this.state.email) || this.state.mobileNumber.length < 10}
                            title={NEXT}
                            navigate={() => { this.moveToSignUp3() }} />

                        {!this.props.route.params.isSignUp &&
                            <View style={{ marginTop: 10 }}>
                                <YellowButton title='Back'
                                    navigate={() => {
                                        this.props.navigation.goBack()
                                    }} />
                            </View>

                        }

                        {/* {typeof(this.props.isFromLogin) != 'undefined' &&
                    <View style={{marginTop:10}}>
                      <YellowButton title='Back' 
                        navigate={() => {
                            this.props.dispatch(AuthActionCreator.isFirstTime(false))
                            this.props.dispatch(AuthActionCreator.isLoggedIn(false))
                            }} />  
                    </View>
                    
                    } */}
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>

        )
    }
}


export default connect(mapStateToProps)(SignUpStep2);

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: Colors.BG_LIGHT_BLUE,
        paddingTop: 30
    },
    container: {
        // flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: Colors.BG_LIGHT_BLUE,
        paddingTop: 30
    },

    textContainer: {
        width: getDeviceWidth(),
        alignItems: "center",
        justifyContent: 'center',
        alignContent: "center"
    },
    InputContainer: {
        width: widthToDp('70%'),
        marginTop: 12,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Colors.APP_GREEN,
        borderRadius: 3,
        overflow: 'hidden',
        alignSelf: 'center'
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
        marginVertical: 10,
        alignItems: "center"
    },
    image:
    {
        width: getDeviceWidth() / 4,
        height: 80,
    },
    textGreen:
    {
        color: Colors.APP_GREEN,
        fontSize: widthToDp('7%'),
        fontFamily: fonts.medium
    },
    textBlack:
    {
        color: Colors.BLACK,
        fontSize: widthToDp('4.5%'),
        marginTop: 10,
        textAlign: 'center',
        fontFamily: fonts.regular
    },
    InputMainContainer: {
        justifyContent: 'center'
    }
});