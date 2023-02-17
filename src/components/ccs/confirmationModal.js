import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import Modal from 'react-native-modal';
import fonts from "../../assets/fonts";
import { getDeviceWidth } from "../../utils";
import colors from "../../utils/colors";
import YellowButton from "../button";
import Icons from "../../assets/icons";
import Config from "react-native-config";



class ConfirmationModal extends Component {
    render() {
        return (
            <Modal 
            backdropOpacity={0.6}
            backdropColor={'#000000'}
            style={styles.container} isVisible={this.props.isVisible}
            onBackdropPress={() => {
                
            }}
            >
                <View style={styles.containerView}>
                    {typeof(this.props.showCloseButton) == 'undefined' &&
                        <TouchableOpacity style={{alignSelf:'flex-end',}}
                        onPress={() => {
                            this.props.onClose()
                        }}>

                            <Image
                            resizeMode='contain'
                            style={styles.imageClose}
                            source={require('../../assets/images/clear.png')}
                        /> 
                    </TouchableOpacity>
                    
                    }
                    
                    <View style={{width:'100%',justifyContent:'space-evenly',height:255,alignSelf:'center',alignItems:'center'}}>
                       {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) &&
                        <Image
                        resizeMode='contain'
                        style={styles.image}
                        source={Icons['CCS_REG1']}
                        />}
                        {typeof(this.props.mainTitle) != 'undefined' &&
                            <Text style={[styles.titleText,{fontSize:20}]}>{this.props.mainTitle}</Text>}
                        <Text style={styles.titleText}>{this.props.title}</Text>
                        {typeof(this.props.body) != 'undefined' &&
                            <Text style={[styles.titleText,{fontFamily:fonts.regular}]}>{this.props.body}</Text>
                        }
                        <YellowButton
                        navigate={() => {
                            this.props.onButtonTapped()
                        }}
                        title={this.props.buttonText}
                        style={{alignSelf:'center',width:'90%',marginTop:10}}
                        textStyle={{fontSize:18}}
                        />
                    </View>
                    
                </View>
                
            </Modal>
        );
    }
}
export default ConfirmationModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    containerView:{
        padding:5,
        backgroundColor:'white',
        height:300,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
    },
    titleText:{
        fontFamily:fonts.bold,
        fontSize:13,
        marginBottom:5,
        textAlign:'center'
    },
    image:{
        width:60,
        height:60,
        marginBottom:20
    },
    imageClose:{
        width:32,
        height:32,
        tintColor:colors.APP_GREEN
    }
});