import * as React from "react";
import 'react-native-gesture-handler';
import Navigator from "./routes/Navigator";
import { LogBox } from 'react-native';


export default class App extends React.Component{
  render(){
    return(
     <Navigator/>
    )
  }
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
