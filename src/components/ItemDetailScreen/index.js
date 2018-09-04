import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';


export default class ItemDetailScreen extends Component {
    render() {

        const { navigation } = this.props;
        const data = navigation.getParam('data', {});

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    <View style={styles.posterContainer}>
                        <Image style={styles.poster} source={{uri: data.posterUrl}} ></Image>
                    </View>
                    <View>
                        <Text style={styles.movieTitle}>{ data.title }</Text>
                    </View>
                    <View style={styles.storyLine}>
                        <Text style={styles.synopsis}>{ data.synopsis }</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer:{
        paddingVertical: 20  
    },
    container: {
        marginTop: 8,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    posterContainer: {
        justifyContent: 'center'
    },
    poster: {
        height: 300,
        width: 150
    },
    movieTitle: {
        fontSize: 20,
        color: '#000'
    },
    storyLine: {
        padding: 3
    },
    synopsis: {
        fontSize: 16,
        marginLeft: 8
    }
})