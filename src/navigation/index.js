import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from "react";

import Colors from '../utils/colors'
import { StyleSheet,TouchableOpacity,Image,Text } from 'react-native';
import {TabNavigator,TabNavigatorForCCSInactivePrimaryUser,TabNavigatorForCCSSecondaryUser, TabNavigatorOfferDynamicLink} from '../navigation/tab';


/**
 * Stack Navigation
 */

const RootStack = createStackNavigator();
export const RootStackConfig = () => {
    return(
        <RootStack.Navigator
            screenOptions={{
                headerStyle: styles.header,
                headerTintColor: Colors.White,
                headerBackTitle: ' ',
                headerTitleStyle: {
                    alignSelf:'center',
                    fontSize: 12,
                    // fontFamily:ARIAL_FONT.medium
                }

            }} >
            <RootStack.Screen options={{ headerShown:false}} name="Drawer" component={TabNavigator}></RootStack.Screen>
        </RootStack.Navigator>
    )
}

export const RootStackConfigCCSSecondary = () => {
    return(
        <RootStack.Navigator
            screenOptions={{
                headerStyle: styles.header,
                headerTintColor: Colors.White,
                headerBackTitle: ' ',
                headerTitleStyle: {
                    alignSelf:'center',
                    fontSize: 12,
                    // fontFamily:ARIAL_FONT.medium
                }

            }} >
            <RootStack.Screen options={{ headerShown:false}} name="Drawer" component={TabNavigatorForCCSSecondaryUser}></RootStack.Screen>
        </RootStack.Navigator>
    )
}

export const RootStackConfigCCSInactivePrimaryUser = () => {
    return(
        <RootStack.Navigator
            screenOptions={{
                headerStyle: styles.header,
                headerTintColor: Colors.White,
                headerBackTitle: ' ',
                headerTitleStyle: {
                    alignSelf:'center',
                    fontSize: 12,
                    // fontFamily:ARIAL_FONT.medium
                }

            }} >
            <RootStack.Screen options={{ headerShown:false}} name="Drawer" component={TabNavigatorForCCSInactivePrimaryUser}></RootStack.Screen>
        </RootStack.Navigator>
    )
}

export const RootStackConfigCCSOfferDynamicLinkPrimaryUser = () => {
    return(
        <RootStack.Navigator
            screenOptions={{
                headerStyle: styles.header,
                headerTintColor: Colors.White,
                headerBackTitle: ' ',
                headerTitleStyle: {
                    alignSelf:'center',
                    fontSize: 12,
                    // fontFamily:ARIAL_FONT.medium
                }

            }} >
            <RootStack.Screen options={{ headerShown:false}} name="Drawer" component={TabNavigatorOfferDynamicLink}></RootStack.Screen>
        </RootStack.Navigator>
    )
}


const styles = StyleSheet.create({   
    header: {
      backgroundColor: Colors.APP_GREEN,
    },
    menu_img:{
        width: 30,
        height: 30, 
        marginLeft: 8
    }
  });