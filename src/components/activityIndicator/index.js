import React, { Component } from "react";
import { 
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import { getDeviceHeight, getDeviceWidth } from "../../utils";
import colors from "../../utils/colors";

import Colors from '../../utils/colors'

class ActivityIndicatorComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                animating={true}
                color={Colors.APP_GREEN}
                size='large'
                />
            </View>
        );
    }
}
export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
        height:getDeviceHeight(),
        // opacity:0.5
    }
});