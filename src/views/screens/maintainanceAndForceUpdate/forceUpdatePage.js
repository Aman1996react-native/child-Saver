import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ForceUpdatePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ForceUpdatePage</Text>
            </View>
        );
    }
}
export default ForceUpdatePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});