import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    StyleSheet
} from "react-native";
import fonts from "../../assets/fonts";
import { getDeviceWidth } from "../../utils";
import colors from "../../utils/colors";
import Colors from "../../utils/colors";
import Config from "react-native-config";

const greenColourCode = '#55AF92'


class BalanceView extends Component {

    constructor(props){
        super(props)
    }

    render() {
        
        return (
            <View style={styles.balanceView}>
                {/* <View style={styles.balanceHolderView}> */}
                    <Image style={
                        (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ?
                        {height:63,width:60,overflow:'visible' }
                        :

                        {height:35,width:35,tintColor:colors.APP_GREEN}
                    } 
                    resizeMode='contain' 
                    
                    source={(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 
                    require('../../assets/images/bird_cents.png')
                    : require('../../assets/images/coin_pile.png')}/>
                    {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ?
                    <Text style={styles.balanceText}>Cashback:</Text>
                    :
                    <Text style={styles.balanceText}>Balance:</Text>
                    }
                    
                {/* </View> */}

                {/* <View style={styles.balanceHolderView}> */}
                    {this.props.balance.Balance == null
                    ?
                    <Text style={[styles.balanceText,{color:Colors.APP_GREEN,fontFamily:fonts.heavy,fontSize:22}]}>$0</Text>
                    :
                    <View>
                        {(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ?
                        <Text style={[styles.balanceText,{color:Colors.WHITE,fontFamily:fonts.buttonTextFont,fontSize:18}]}>${this.props.balance.Balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        :
                        <Text style={[styles.balanceText,{color:Colors.APP_GREEN,fontFamily:fonts.heavy,fontSize:22}]}>{this.props.balance.Balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    }
                    </View>                    
                    }
                {/* </View> */}
            </View>
        );
    }
}
export default BalanceView;

const styles = StyleSheet.create({
    balanceView:{
        backgroundColor: (Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? colors.greenColourCode : Colors.LightGray,
        height:70,
        margin:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 0 : 10,
        marginTop:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 0 : 10,
        marginBottom:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 10 : 0,
        width:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? getDeviceWidth() : getDeviceWidth() - 20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? 'space-around' : 'space-around'
    },
    balanceHolderView:{
        flexDirection:'row',
        width:(getDeviceWidth() - 20) / 2,
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    balanceText:{
        fontFamily:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? fonts.buttonTextFont :fonts.bold,
        fontSize:18,
        marginLeft:20,
        color:(Config.ENV.includes('ccsDev') || Config.ENV.includes('ccsProd')) ? colors.White : colors.BLACK
    },
});