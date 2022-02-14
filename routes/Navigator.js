import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import League from '../screens/leagues'
import Sport from '../screens/sports'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tabs = createBottomTabNavigator()

const Navigator = () => {
    return (
        <NavigationContainer independent={true}>
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName

                  if (route.name === 'Sport') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  } else if (route.name === 'League') {
                    iconName = focused ? 'flag' : 'flag'
                  }
                  return <Ionicons name={iconName} size={30} color={color} />
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle:{fontSize:14}
              })}     
        >
            <Tabs.Screen name='Sport' component={Sport} 
            options={{ 
                title:'Sports',
                headerTitleAlign:'center',
                headerTitleStyle:{color:'darkgreen'},
                headerStyle:{backgroundColor:'#D5D5D5'}
            }} />
            <Tabs.Screen name='League' component={League} 
            options={{ 
                title:'Leagues',
                headerTitleAlign:'center',
                headerTitleStyle:{color:'#8946A6'},
                headerStyle:{backgroundColor:'#D5D5D5'}
            }}/>
        </Tabs.Navigator>
        </NavigationContainer>
    )
}

export default Navigator
