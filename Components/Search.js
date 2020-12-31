// Components/Search.js

import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js

  
class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchText = ""
        this.state = { 
            films: [],
            isLoading: false
         }
      }
    _displayLoading() {
    if (this.state.isLoading) {
        return (
        <View style={styles.loading_container}>
            <ActivityIndicator size='large' color='gray'/>
        </View>
        )
    }
    }

    _loadFilms() {
        if (this.searchText.length > 0) {
            this.setState({ isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchText).then(data => {
                this.setState({ 
                    films: data.results,
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    render() {
        console.log(this.state.isLoading)
        return (
            <View style={styles.main_container}>
                <TextInput  style={styles.textinput} placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadFilms()}
                />
                <Button style={{ height: 50}} title='Recherche' onPress={() => this._loadFilms()} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: { 
        marginTop: 20, 
        flex: 1 
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',        
    }
})

export default Search
