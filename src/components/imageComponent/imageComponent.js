import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    
} from "react-native";

import colors from "../../utils/colors";
import { FadeLoading } from 'react-native-fade-loading';

class ImageComponent extends React.Component {

    constructor(props){
        super(props)
        this.state={
            loading:true
        }
    }
    


    render() {
      
        if(typeof(this.props.imageUrl) != 'undefined'){
            if(this.props.imageUrl != null){
                if(this.props.imageUrl.includes('https://') || this.props.imageUrl.includes('http://')){
                    return (
                        <>
                            {this.state.loading ?
                                // <ActivityIndicatorComponent/>
                                // <View style={this.props.style}>
                                // <ActivityIndicator size={"small"} color={"red"} ></ActivityIndicator>
                                // </View>
                                <FadeLoading style={[this.props.style]} primaryColor="lightgray" secondaryColor="white" duration={2000} animated={true} ></FadeLoading>
                        :null} 
                      
                        <Image
                        onLoadStart={()=>{this.setState({loading : true})}}
                        onLoadEnd={()=>{this.setState({loading : false})}}
                        resizeMode={this.props.resizeMode}
                        resizeMethod={this.props.resizeMethod}
                        style={[this.props.style]}
                        source={{uri:this.props.imageUrl,headers: {
                            Pragma: 'no-cache'
                          },}}
                          oadingIndicatorSource={{
                            uri: require('../../assets/images/newicons/coffee.png'),
                          }}
                        
                        /> 
             
                        </>
                    );
                }else{
                    return (
                        <Image
                        resizeMode={this.props.resizeMode}
                        style={this.props.style}
                        source={{uri:`data:image/png;base64,${this.props.imageUrl}`,headers: {
                            Pragma: 'no-cache'
                          },}}
                        />
                    );
                }
            }
        }
       
        return(
            <Image
            source={require('../../assets/images/no_image.png')}
            resizeMode={this.props.resizeMode}
            style={this.props.style}/>
        )
        
        
    }
}
export default ImageComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});