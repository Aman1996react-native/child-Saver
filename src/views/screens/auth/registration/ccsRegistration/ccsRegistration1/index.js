import React, { Component } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import Carousel , { Pagination }from 'react-native-snap-carousel';
import fonts from "../../../../../../assets/fonts";
import { getDeviceWidth, widthToDp } from "../../../../../../utils";
import colors from "../../../../../../utils/colors";
import Icons from "../../../../../../assets/icons";
import YellowButton from "../../../../../../components/button";
import { connect } from 'react-redux'
import { AuthActionCreator } from "../../../../../../redux/actionCreators/auth";
import JailMonkey from 'jail-monkey'

const mapStateToProps = (state) => ({
})

const paginationData = [
    {id:1,title:'Welcome to',
    titleImage:Icons['CCS_TEXT_LOGO'],
    desc:'Where your village can help like\nnever before...',
    image:Icons['CCS_REG1']},
    // {id:1,title:'Together raising\nfunds for childcare',
    // desc:'From families to friends, your village\ncan collectively raise funds for\nchildcare, just by shopping.',
    // image:Icons['CCS_REG2']},
    // {id:1,title:'Everyday shopping helping\nto raise your child',
    // desc:`With a little help from your favourite\nbrands, everytime you or someone\nin your village shops, money is\nraised for your childcare. Best part\nis, it doesn't cost you a thing.`,
    // image:Icons['CCS_REG3']},
]

class CCSRegistration1 extends Component {

    constructor(props){
        super(props)
        this.state = {
            activeSlide:0,
            rootedDeviceText: '',
        }
    }

    componentDidMount(){
        if (JailMonkey.isJailBroken()) {
            this.ExitAppFunction()
            // Alternative behaviour for jail-broken/rooted devices.
            this.setState({ rootedDeviceText: 'Application is running on Rooted/Jail-broken device.' })
          } else {
            // console.log("JailMonkey.isJailBroken()",await JailMonkey.isJailBroken())
            this.setState({ rootedDeviceText: 'Application is running on Rooted/Jail-broken device.' })
            // this.setState({ rootedDeviceText: 'Application is running on Rooted/Jail-broken device. component' })
      
          }
    }


    get pagination () {
        return (
            <View style={{height:10,marginTop:2,
                marginBottom:5,}}>            
                <Pagination
                dotsLength={3}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{width:10,marginTop:-35 }}
                dotContainerStyle={{height:10,width:10}}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor:colors.APP_GREEN
                }}
                inactiveDotStyle={{
                  
                }}
                inactiveDotOpacity={0.2}
                inactiveDotScale={1}
                />
            </View>
        );
    }

    _renderCarouselItem = ({item, index}) => {
        return(
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 10, fontFamily: fonts.medium, textAlign: 'center', color: colors.APP_GREEN }}>{this.state.rootedDeviceText}</Text>
                <Image style={styles.image} source={item.image} resizeMode='contain'/>
                <Text style={styles.titleText}>{item.title}</Text>
                <Image style={[styles.image,{height:60,marginTop:10,marginBottom:5}]} source={item.titleImage} resizeMode='contain'/>
                <Text style={[styles.titleText,{fontFamily:'Graphik-Medium',fontSize:16,margin:5,marginTop:15,fontWeight:'400'}]}>{item.desc}</Text>
            </View>
            
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 10, fontFamily: fonts.medium, textAlign: 'center', color: colors.APP_GREEN }}>{this.state.rootedDeviceText}</Text> */}
                <Carousel

                   // autoplay={true}
                   //loop={true}
                    activeSlideAlignment='center'
                    inactiveSlideOpacity={1.0}
                    containerCustomStyle={{backgroundColor:'colors.BACKGROUND_COLOR_CCS',}}
                    contentContainerCustomStyle={{justifyContent:'center',alignItems:'center'}}
                    ref={(c) => { this._carousel = c; }}
                    data={paginationData}
                    renderItem={this._renderCarouselItem}
                    sliderWidth={getDeviceWidth()}
                    itemWidth={getDeviceWidth()}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                    {/* { this.pagination } */}

                    <Image
                    source={require('../../../../../../assets/images/birds_horizontal.png')}
                    resizeMode='contain'
                    style={{width:getDeviceWidth()-20,height:200,alignSelf:'flex-end',marginBottom:10}}
                    />

                    <TouchableOpacity style={styles.regButton}
                    onPress={() => {
                        this.props.navigation.navigate('SignUp2',{isSignUp:true})
                    }}>
                        <Text style={styles.buttonColour}>NOT A MEMBER? JOIN NOW</Text>
                    </TouchableOpacity>
                    <View style={{marginBottom:20}}>
                        <YellowButton 
                        title='LOGIN TO CHILDCARE SAVER' 
                        navigate={() => {
                            this.props.dispatch(AuthActionCreator.isLoggedIn(false))
                            this.props.dispatch(AuthActionCreator.isFirstTime(false))
                            // this.props.navigation.navigate('SignUp2',{isSignUp:false})
                        }}/>
                    </View>
            </View>
        );
    }
}
export default connect(mapStateToProps)(CCSRegistration1);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.BACKGROUND_COLOR_CCS,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom:10,
        paddingTop:10
    },
    regButton:{
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:25,
        backgroundColor:'transparent',
        borderWidth:2,
        borderColor:colors.APP_GREEN,
        marginBottom:10,
        width: widthToDp('90%'),
    },
    loginButton:{
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:25,
        backgroundColor:colors.APP_GREEN,
        marginBottom:20,
        
    },
    buttonColour:{
        color:colors.APP_GREEN,
        fontFamily:'Graphik-Medium',
        fontSize:18,
        fontWeight:'900'

    },
    titleText:{
        fontFamily:'Graphik-Medium',
        fontSize:20,
        textAlign:'center',
        marginLeft:10,
        marginRight:10,
        marginTop:15,
        marginBottom:10,
        fontWeight:'500',
        
    },
    image:{
        width:getDeviceWidth()/1.3, 
        height:70,
    }


});