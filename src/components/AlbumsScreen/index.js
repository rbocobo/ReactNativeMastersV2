import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import Swiper from 'react-native-swiper-animated';
import { PHOTO_CAPTURE_SUCCESS } from '../../ducks/mockposts';

class AlbumsScreen extends Component {


    render() {
        
        return (
            <View style={styles.container}>
                <View style={{flex:9}}>
                {this.props.posts && <Swiper smoothTransition loop stack backPressToBack>
                    { this.props.posts.map(item => this.renderRow(item)) }
                </Swiper>}
                </View>
                
                <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
                <TouchableOpacity onPress={()=>  this.props.navigation.navigate('Images')}>
                <Image style={{height: 32, width: 32}} source={require('../../../assets/images/shutter.png')}></Image>
                </TouchableOpacity>
                    
                </View>
                
                {/* <FlatList
                    style={styles.listView}
                    data={this.props.posts}
                    renderItem={({item}) => this.renderRow(item) }
                    keyExtractor={(item, index)=> item.id }
                    /> */}
            </View>
        );
    }

    renderRow = (rowData) => {
        image = rowData.uri;
        return (
            <View style={{flex:1, backgroundColor: '#95a5a6', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <Image
                style={{width: "100%", height: "100%", backgroundColor: 'white'}}
                source={{uri: image}}
            />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      marginTop: 20
    },
    listView: {
      margin: 8,
      backgroundColor: '#D6DAC2'
    }
  });

export default compose(
    firestoreConnect(['posts']),
    connect(
        (state, props) => ({
            posts: state.firestore.ordered.posts
        })
    )
)(AlbumsScreen)