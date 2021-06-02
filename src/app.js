import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

enableScreens();
import {Login} from "./pages/login";
import {DashboardVeli} from "./pages/dashboardVeli";
import {DashboardOgrt} from "./pages/dashboardOgrt";

const Stack= createNativeStackNavigator();


export function App(){
    //initialRoute: açılışta gelen sayfa
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"
        screenOptions={{
            headerShown:false,
            headerTintColor:"white"
        }}>
            <Stack.Screen name="Login" component={Login} options={{title:"Giriş Ekranı"}}/>
            <Stack.Screen name="DashboardVeli" component={DashboardVeli} options={{title:"Veli Ekranı"}}/>
            <Stack.Screen name="DashboardOgrt" component={DashboardOgrt} options={{title:"Öğretmen Ekranı"}}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
}