// Navigation/Navigation.js

import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const Stack = createStackNavigator()

class Navigation extends React.Component {
    render() {
        return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ gestureEnabled: false }}
            >
                <Stack.Screen 
                    name="Recherche"
                    component={Search}
                    options={{ title: 'Recherche' }}
                />

                <Stack.Screen 
                    name="FilmDetail"
                    component={FilmDetail}
                    options={{ title: 'Détail du Film' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
        )
    }
}

export default Navigation