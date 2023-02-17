import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    SectionList,
    Image,
    Text,
    StyleSheet
} from "react-native";
import ComigSoonPage from "../gift/comingSoonPage";
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import EncryptedStorage from 'react-native-encrypted-storage';
import { ProfileActionCreator } from "../../../redux/actionCreators/app/profile";
import ActivityIndicatorModal from "../../../components/activityIndicator/activityIndicatorModel";
import ImageComponent from "../../../components/imageComponent/imageComponent";
import colors from "../../../utils/colors";
import { getDeviceWidth } from "../../../utils";
import fonts from "../../../assets/fonts";
import { LoginctionCreator } from "../../../redux/actionCreators/login";
import { AuthActionCreator } from "../../../redux/actionCreators/auth";
import YellowButton from "../../../components/button";
import Config from "react-native-config";
import ConfirmationModal from "../../../components/ccs/confirmationModal";
import { DYNAMIC_LINK } from '../../../constants'
import { TopUpActionCreator } from "../../../redux/actionCreators/app/topup";
import { CCSActionCreator } from "../../../redux/actionCreators/app/ccs";
import { RegistrationActionCreator } from "../../../redux/actionCreators/registration";
import { CheckAccessTokenExpiryTime } from "../../../redux/actionCreators/checkAccessTokenExpiry";

const mapStateToProps = (state) => ({

    loading: state.GetProfileDetailsReducer.loading,
    request: state.GetProfileDetailsReducer.request,
    response: state.GetProfileDetailsReducer.response,

    emailLoading: state.GetEmailAddressReducer.loading,
    emailRequest: state.GetEmailAddressReducer.request,
    emailResponse: state.GetEmailAddressReducer.response,

    changePinLoading: state.ChangePinReducer.loading,
    changePinRequest: state.ChangePinReducer.request,
    changePinResponse: state.ChangePinReducer.response,

    getbankDetailsLoading: state.GetBankDetailsReducer.loading,
    getbankDetailsRequest: state.GetBankDetailsReducer.request,
    getbankDetailsResponse: state.GetBankDetailsReducer.response,

    isPrimaryUserLoading: state.IsPrimaryUserReducer.loading,
    isPrimaryUserRequest: state.IsPrimaryUserReducer.request,
    isPrimaryUserResponse: state.IsPrimaryUserReducer.response,

    checkMobileLoading: state.SendMobileNumberRegReducer.loading,
    checkMobileRequest: state.SendMobileNumberRegReducer.request,
    checkMobileResponse: state.SendMobileNumberRegReducer.response,

    isUserInactiveLoading: state.GetUserStatusReducer.loading,
    isUserInactiveRequest: state.GetUserStatusReducer.request,
    isUserInactiveResponse: state.GetUserStatusReducer.response,

    shouldMoveToSettingsLoading: state.ShouldnavigateToSettingsReducer.loading,
    shouldMoveToSettingsRequest: state.ShouldnavigateToSettingsReducer.request,
    shouldMoveToSettingsResponse: state.ShouldnavigateToSettingsReducer.response,

    shouldMoveToPrivacyPolicyLoading: state.ShouldnavigateToPrivacyPolicyReducer.loading,
    shouldMoveToPrivacyPolicyRequest: state.ShouldnavigateToPrivacyPolicyReducer.request,
    shouldMoveToPrivacyPolicyResponse: state.ShouldnavigateToPrivacyPolicyReducer.response,

    shouldMoveToTermsLoading: state.ShouldnavigateToTermsReducer.loading,
    shouldMoveToTermsRequest: state.ShouldnavigateToTermsReducer.request,
    shouldMoveToTermsResponse: state.ShouldnavigateToTermsReducer.response,
})

let displayArray = [
    {
        title: 'My Account', data: [
            { id: 1, title: 'Login Email', value: '', canNavigate: false },
            { id: 10, title: 'Member ID', value: '', canNavigate: false },
            {
                id: 2,
                title: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'App Password' : 'App PIN',
                value: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Change your password' : 'Change your 6 digit PIN',
                canNavigate: true
            },
            { id: 3, title: 'Notification Settings', value: 'Turn on In-app notifications', canNavigate: true },
            { id: 4, title: 'Location Settings', value: 'Manage location settings', canNavigate: true },
            { id: 5, title: 'Consent Settings', value: 'Manage ad consent settings', canNavigate: true },
            { id: 8, title: 'Bank Details', value: 'Manage bank details', canNavigate: true },
            { id: 6, title: 'Privacy Policy', value: '', canNavigate: true },
            { id: 7, title: 'Terms and Conditions', value: '', canNavigate: true },
            { id: 9, title: 'Permanently delete Childcare Saver', value: '', canNavigate: true }
        ]
    }
]

class SettingsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showConfirmationModal: false
        }
    }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async() => {
            await CheckAccessTokenExpiryTime('SettingsPage')
            this.fetchProfileDetails()
            this.props.dispatch(CCSActionCreator.shouldNavigateToSettings(null))
            this.props.dispatch(CCSActionCreator.shouldNavigateToPrivacyPolicy(null))
            this.props.dispatch(CCSActionCreator.shouldNavigateToTerms(null))

        });

    }

    componentDidUpdate(prevProps) {
        const res = this.props.changePinResponse
        const chkMobile = this.props.checkMobileResponse
        if (typeof (res) != undefined) {
            if (Object.keys(res).length > 0) {
                this.props.dispatch(LoginctionCreator.resetResponse('2'))
                if (typeof (res.Status) != 'undefined' && typeof (res.pinMailSent) != 'undefined') {
                    if (res.Status == 'Success' && res.pinMailSent == 'true') {
                        if (typeof (this.props.response) != 'undefined') {
                            if (typeof (this.props.response.Mobile) != 'undefined') {
                                if (this.props.response.Mobile) {
                                    console.warn('MOBILE: ' + this.props.response.Mobile)
                                    this.props.navigation.navigate('Change Pin Verification',{mobile: this.props.response.Mobile})
                                }
                            }
                        }

                    }
                }
            }
        }

        if (typeof (this.props.isPrimaryUserResponse) != 'undefined') {
            if (this.props.isPrimaryUserResponse) {
                if (typeof (chkMobile) != undefined) {
                    if (Object.keys(chkMobile).length > 0) {
                        this.props.dispatch(RegistrationActionCreator.resetResponse('3'))
                        if (typeof (chkMobile.Status) != 'undefined') {
                            if (chkMobile.Status == 'Success') {
                                const res = this.props.getbankDetailsResponse
                                let item = {
                                    BankName: '',
                                    AccountNumber: '',
                                    BranchCode: ''
                                }
                                if (typeof (res) != 'undefined') {
                                    if (typeof (res.BankName) != 'undefined' && typeof (res.AccountNumber) != 'undefined' && typeof (res.BranchCode) != 'undefined') {
                                        if (res.BankName != null && res.AccountNumber != null && res.BranchCode != null) {
                                            item = {
                                                BankName: res.BankName,
                                                AccountNumber: res.AccountNumber,
                                                BranchCode: res.BranchCode
                                            }
                                        }
                                    }
                                }
                                if (typeof (this.props.response) != 'undefined') {
                                    if (typeof (this.props.response.Mobile) != 'undefined') {
                                        if (this.props.response.Mobile) {
                                            console.warn('MOBILE: ' + this.props.response.Mobile)
                                            this.props.navigation.navigate('VerifyOtp', { item: item, mobile: this.props.response.Mobile })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        

        const settingsRes = this.props.shouldMoveToSettingsResponse
        const privacyPolicyRes = this.props.shouldMoveToPrivacyPolicyResponse
        const termsRes = this.props.shouldMoveToTermsResponse

        if(typeof(settingsRes) != 'undefined'){
            this.props.dispatch(CCSActionCreator.resetResponse('21'))
            
            if(settingsRes != null){
                if(settingsRes){
                    this.props.dispatch(CCSActionCreator.shouldNavigateToSettings(false))
                }
            }
        }

        if(typeof(privacyPolicyRes) != 'undefined'){
            this.props.dispatch(CCSActionCreator.resetResponse('22'))
            
            if(privacyPolicyRes != null){
                if(privacyPolicyRes){
                    this.props.dispatch(CCSActionCreator.shouldNavigateToPrivacyPolicy(false))
                    this.props.navigation.navigate('Consent Details', { item: { id: 6, title: 'Privacy Policy', value: '', canNavigate: true } })
                }
            }
        }

        if(typeof(termsRes) != 'undefined'){
            this.props.dispatch(CCSActionCreator.resetResponse('23'))
            
            if(termsRes != null){
                if(termsRes){
                    this.props.dispatch(CCSActionCreator.shouldNavigateToTerms(false))
                    this.props.navigation.navigate('Consent Details', { item: { id: 7, title: 'Terms and Conditions', value: '', canNavigate: true } })
                }
            }
        }
    }

    fetchProfileDetails = () => {
        EncryptedStorage.getItem('userId', (res, err) => {
            if (res) {
                this.props.dispatch(ProfileActionCreator.getProfileDetails(res))
                this.props.dispatch(LoginctionCreator.getEmailAddress())
                this.props.dispatch(TopUpActionCreator.getBankDetails(res))
                if (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) {
                    this.props.dispatch(CCSActionCreator.isPrimaryUser())
                    this.props.dispatch(CCSActionCreator.isUserInactive(null))
                }
            }
        })
    }

    renderProfileImage = () => {
        const res = this.props.response
        if (typeof (res) != 'undefined') {
            if (typeof (res.Image) != 'undefined') {
                if (res.Image != null) {
                    return (
                        <ImageComponent
                            resizeMode={'cover'}
                            style={styles.image}
                            imageUrl={res.Image}
                        />
                    )

                }
            }
        }

        if(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')){
            return(
                <Image
                source={require('../../../assets/images/bird_red.png')}
                style={{width:60,height:70,marginBottom:-40}}
                resizeMode='contain'
                />
            )
        }

        return (
            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 40, width: 80, height: 80, borderWidth: 1, borderColor: colors.BLACK, backgroundColor: colors.YELLOW }}>
                <Text style={[styles.name, { fontSize: 16, }]}>{this.props.response.nameToDisplay}</Text>
            </View>
        )
    }

    renderUserStatus = () => {
        const status = this.props.isUserInactiveResponse
        if (typeof (status) != 'undefined') {
            if (status != null) {
                if (status) {
                    return (
                        <Text style={[{ fontSize: 12, color: '#FFCC00', fontStyle: 'italic' }]}>Inactive</Text>
                    )
                } else {
                    return (
                        <Text style={[{ fontSize: 12, color: 'green', fontStyle: 'italic' }]}>Active</Text>
                    )
                }
            }
        }
        return null
    }

    renderProfileDetails = (response) => {
        if (typeof (response) != 'undefined') {
            if (response != null) {
                return (
                    <View style={styles.profileDetailsHolder}>
                        {this.renderProfileImage()}
                        <View style={{ marginLeft: 20, justifyContent: 'center', }}>
                            <Text style={[styles.nameText,{marginRight:10}]}>{response.FirstName} {response.LastName}</Text>
                            <Text style={styles.nameText}>{response.Mobile}</Text>
                            {this.renderUserStatus()}
                        </View>
                    </View>
                )
            }
        }
    }

    renderMemberId = () => {
        const response = this.props.response
        if (typeof (response) != 'undefined') {
            if (response != null) {
                if (typeof (response.MemberID) != 'undefined') {
                    if (response.MemberID != null) {
                        return (
                            <View>
                                {/* <Text style={[styles.titleText,{marginTop:8}]}>Member ID:</Text> */}
                                <Text style={[styles.valueText, { marginTop: 2 }]}>{response.MemberID} </Text>
                            </View>
                        )
                    }
                }

            }
        }
    }

    _renderow = ({ item, index }) => {
        if ((Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) && item.id == 4) {
            return null
        }
        return (
            <TouchableOpacity style={styles.row}
                onPress={() => {
                    if (item.canNavigate) {
                        if (item.id == 2) {
                            EncryptedStorage.getItem('email', (email, err) => {
                                if (email) {
                                    this.props.dispatch(LoginctionCreator.changePin(email))
                                }
                            })

                            return
                        }
                        if (item.id == 9) {
                            this.props.navigation.navigate('PermanentlyDeleteAccount')
                            return
                        }
                        if (item.id == 8) {

                            EncryptedStorage.getItem('userId', (res, err) => {
                                if (res) {
                                    const response = this.props.response
                                    if (typeof (response) != 'undefined') {
                                        if (response != null) {
                                            this.props.dispatch(RegistrationActionCreator.sendMobileNumber(res, response.Mobile))
                                        }
                                    }
                                }
                            })


                            return
                        }
                        this.props.navigation.navigate('Consent Details', { item: item })
                    }
                }}>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    {item.id == 1 ?
                        <View>
                            <Text style={styles.valueText}>{this.props.emailResponse.email}</Text>

                        </View>

                        :

                        <View>
                            {item.id == 10 ?
                                <View>
                                    {this.renderMemberId()}
                                </View>

                                :
                                <View>
                                    {item.value.length > 0 &&
                                        <Text style={styles.valueText}>{item.value}</Text>
                                    }
                                </View>

                            }

                        </View>

                    }
                </View>
                {item.id != 1 && item.id != 2 && item.id != 10 &&
                    <Image style={{ width: 28, height: 28 }} resizeMode='contain' source={require('../../../assets/images/right-arrow.png')} />
                }

            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => item.id.toString()

    onClose = () => {
        this.setState({ showConfirmationModal: false })
    }
    onButtonTapped = () => {
        this.setState({ showConfirmationModal: false })
        this.props.dispatch(AuthActionCreator.isLoggedIn(false))
        this.props.dispatch(AuthActionCreator.isFirstTime(false))
    }

    render() {
        const isPrimaryUser = this.props.isPrimaryUserResponse

        displayArray = [
            {
                title: 'My Account', data: [
                    { id: 1, title: 'Login Email', value: '', canNavigate: false },
                    { id: 10, title: 'Member ID', value: '', canNavigate: false },
                    {
                        id: 2,
                        title: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'App Password' : 'App PIN',
                        value: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Change your password' : 'Change your 6 digit PIN',
                        canNavigate: true
                    },
                    { id: 3, title: 'Notification Settings', value: 'Turn on In-app notifications', canNavigate: true },
                    { id: 4, title: 'Location Settings', value: 'Manage location settings', canNavigate: true },
                    { id: 5, title: 'Consent Settings', value: 'Manage ad consent settings', canNavigate: true },
                    { id: 8, title: 'Bank Details', value: 'Manage bank details', canNavigate: true },
                    { id: 6, title: 'Privacy Policy', value: '', canNavigate: true },
                    { id: 7, title: 'Terms and Conditions', value: '', canNavigate: true },
                    { id: 9, title: 'Permanently delete Childcare Saver', value: '', canNavigate: true }
                ]
            }
        ]

        if (typeof (isPrimaryUser) != 'undefined') {
            if (!isPrimaryUser) {
                displayArray = [
                    {
                        title: 'My Account', data: [
                            { id: 1, title: 'Login Email', value: '', canNavigate: false },
                            { id: 10, title: 'Member ID', value: '', canNavigate: false },
                            {
                                id: 2,
                                title: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'App Password' : 'App PIN',
                                value: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Change your password' : 'Change your 6 digit PIN',
                                canNavigate: true
                            },
                            { id: 3, title: 'Notification Settings', value: 'Turn on In-app notifications', canNavigate: true },
                            { id: 4, title: 'Location Settings', value: 'Manage location settings', canNavigate: true },
                            { id: 5, title: 'Consent Settings', value: 'Manage ad consent settings', canNavigate: true },
                            { id: 6, title: 'Privacy Policy', value: '', canNavigate: true },
                            { id: 7, title: 'Terms and Conditions', value: '', canNavigate: true },
                            { id: 9, title: 'Permanently delete Childcare Saver', value: '', canNavigate: true }

                        ]
                    }
                ]
            } else {
                displayArray = [
                    {
                        title: 'My Account', data: [
                            { id: 1, title: 'Login Email', value: '', canNavigate: false },
                            { id: 10, title: 'Member ID', value: '', canNavigate: false },
                            {
                                id: 2,
                                title: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'App Password' : 'App PIN',
                                value: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Change your password' : 'Change your 6 digit PIN',
                                canNavigate: true
                            },
                            { id: 3, title: 'Notification Settings', value: 'Turn on In-app notifications', canNavigate: true },
                            { id: 4, title: 'Location Settings', value: 'Manage location settings', canNavigate: true },
                            { id: 5, title: 'Consent Settings', value: 'Manage ad consent settings', canNavigate: true },
                            { id: 8, title: 'Bank Details', value: 'Manage bank details', canNavigate: true },
                            { id: 6, title: 'Privacy Policy', value: '', canNavigate: true },
                            { id: 7, title: 'Terms and Conditions', value: '', canNavigate: true },
                            { id: 9, title: 'Permanently delete Childcare Saver', value: '', canNavigate: true }
                        ]
                    }
                ]
            }
        } else {
            displayArray = [
                {
                    title: 'My Account', data: [
                        { id: 1, title: 'Login Email', value: '', canNavigate: false },
                        { id: 10, title: 'Member ID', value: '', canNavigate: false },
                        {
                            id: 2,
                            title: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'App Password' : 'App PIN',
                            value: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'Change your password' : 'Change your 6 digit PIN',
                            canNavigate: true
                        },
                        { id: 3, title: 'Notification Settings', value: 'Turn on In-app notifications', canNavigate: true },
                        { id: 4, title: 'Location Settings', value: 'Manage location settings', canNavigate: true },
                        { id: 5, title: 'Consent Settings', value: 'Manage ad consent settings', canNavigate: true },
                        { id: 8, title: 'Bank Details', value: 'Manage bank details', canNavigate: true },
                        { id: 6, title: 'Privacy Policy', value: '', canNavigate: true },
                        { id: 7, title: 'Terms and Conditions', value: '', canNavigate: true },
                        { id: 9, title: 'Permanently delete Childcare Saver', value: '', canNavigate: true }
                    ]
                }
            ]
        }
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicatorModal isVisible={this.props.loading || this.props.changePinLoading || this.props.checkMobileLoading} />
                {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) &&
                    <ConfirmationModal
                        isVisible={this.state.showConfirmationModal}
                        title={'Are you sure you want to sign out of Childcare Saver?'}
                        buttonText={'YES, SIGN ME OUT'}
                        onClose={this.onClose}
                        onButtonTapped={this.onButtonTapped}
                    />
                }
                <SectionList
                    ListHeaderComponent={() => {
                        return (
                            <View style={styles.profileDetailsHolder}>
                                {this.renderProfileDetails(this.props.response)}
                            </View>
                        )

                    }}
                    sections={displayArray}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderow}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={ styles.myAccountTextHolder}>
                            <Text style={ (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? styles.nameTextCCS : styles.nameText}>{title}</Text>
                        </View>
                    )}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 1, backgroundColor: colors.LightGray, width: getDeviceWidth() - 30, marginRight: 15, marginLeft: 15 }}></View>
                        )
                    }}
                />

                <YellowButton
                    title='Sign Out'
                    navigate={() => {
                        const { dispatch } = this.props
                        if (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) {
                            this.setState({ showConfirmationModal: true })
                        } else {
                            dispatch(AuthActionCreator.isLoggedIn(false))
                            dispatch(AuthActionCreator.isFirstTime(false))
                            dispatch(AuthActionCreator.resetAll())
                        }

                    }}
                    style={{ alignSelf: 'center', marginBottom: 10, marginTop: 10 }}
                />
            </SafeAreaView>
        );
    }
}
export default connect(mapStateToProps)(SettingsPage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
    },
    profileDetailsHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,

    },
    signOutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.APP_GREEN,
        padding: 10,
        width: getDeviceWidth() - 20,
        margin: 10,
        height: 50
    },
    signOutText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        color: colors.White
    },
    nameText: {
        fontFamily: fonts.bold,
        fontSize: 18,
    },
    nameTextCCS: {
        fontFamily: fonts.bold,
        fontSize: 18,
        color:colors.White
    },
    myAccountTextHolder: {
        width: getDeviceWidth() - 20,
        margin: 10,
        backgroundColor: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? colors.greenColourCode :  colors.LightGray,
        padding: 10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        height:50,
        justifyContent:'center'
    },
    row: {
        width: getDeviceWidth() - 30,
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: fonts.bold,
        fontSize: 16,
        marginBottom: 5
    },
    valueText: {
        fontFamily: fonts.regular,
        fontSize: 12,
    }
});