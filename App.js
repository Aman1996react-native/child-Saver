import React ,{ useEffect } from 'react';
import { StatusBar,View} from "react-native";
import {Provider} from 'react-redux'
import CongigureStore from './src/redux/store'
import Start from './src/appStart/start';
import UsbDubbingFunction,{usbDubbingCheck} from './src/views/screens/maintainanceAndForceUpdate/usbDubbingCheck';
import SplashScreen from  "react-native-splash-screen";


const store = CongigureStore()

const App =() =>{
  // console.disableYellowBox = true
  useEffect(() => {
    SplashScreen.hide();
    // CheckDebbuger()
  }, [])

  const CheckDebbuger = async () => {
    UsbDubbingFunction()

  }

    return (
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <Provider store={store}>
            <Start />
          </Provider>
        </View>
    )
}

export default App
