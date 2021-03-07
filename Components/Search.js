// Components/Search.js

import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js
import { connect } from 'react-redux'
  
class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchText = ""
        this.page = 0
        this.totalPages = 0
        this.state = { 
            films: [],
            isLoading: false
         }
      }
    _displayFilmDetail = (idFilm) => {
        console.log("Détail du film id="+idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm})
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
            getFilmsFromApiWithSearchedText(this.searchText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                  films: [ ...this.state.films, ...data.results ],
                  isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: []
        }, () => {
        // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)

        this._loadFilms() })
    }
    render() {
        console.log(this.props)
        return (
            <View style={styles.main_container}>
                <TextInput  style={styles.textinput} placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button style={{ height: 50}} title='Recherche' onPress={() => this._searchFilms()} />
                <FlatList
                    data={this.state.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                    <FilmItem
                      film={item}
                      // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                      isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                      displayDetailForFilm={this._displayDetailForFilm}
                    />
                    }
                    renderItem={({item}) => <FilmItem film={item} displayFilmDetail={this._displayFilmDetail} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={ () => {
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                     }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: { 
        //marginTop: 20, 
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

const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
  export default connect(mapStateToProps)(Search)
