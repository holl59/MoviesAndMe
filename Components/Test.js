// Components/Test.js
import React from 'react'
import HelloWorld from './HelloWorld'
import { StyleSheet, View } from 'react-native'

class Test extends React.Component {

    render() {
        return (
          <View style={styles.main_container}>
            <HelloWorld/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    
  }
})

export default Test


