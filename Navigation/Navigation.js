// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false }}
    >
        <HomeStack.Screen 
            name="Recherche"
            component={Search}
            options={{ title: 'Recherche' }}
        />

        <HomeStack.Screen 
            name="FilmDetail"
            component={FilmDetail}
            options={{ title: 'Détail du Film' }}
        />

    </HomeStack.Navigator>
  );
}

const FavorisStack = createStackNavigator();

function FavorisStackScreen() {
  return (
    <FavorisStack.Navigator>
      <FavorisStack.Screen name="Favoris" component={Favorites} />
      <FavorisStack.Screen name="Details" component={FilmDetail} />
    </FavorisStack.Navigator>
  );
}


const Tab = createBottomTabNavigator()
class Navigation extends React.Component {
    render() {
        return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions= {{
                    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
                    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
                    showLabel: false, // On masque les titres
                    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
                }}
            >
                <Tab.Screen 
                    name="Recherche" 
                    component={HomeStackScreen}
                    options= {{
                        tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                          return <Image
                            source={require('../Images/ic_search.png')}
                            style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                        }
                      }}
                />
                <Tab.Screen 
                    name="Favoris"
                    component={FavorisStackScreen}
                    options= {{
                        tabBarIcon: () => {
                          return <Image
                            source={require('../Images/ic_favorite.png')}
                            style={styles.icon}/>
                        }
                    }}                    
                />   
            </Tab.Navigator>
        </NavigationContainer>
        )
    }
}


const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
})

export default Navigation