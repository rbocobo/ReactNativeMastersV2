import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

const ListItem = ({data, onMoviePress}) => {
    return(
        <TouchableNativeFeedback onPress={()=> onMoviePress(data)}>
            <View style={styles.container}>
                <View style={styles.posterThumbnail}>
                    <Image style={{width: 25, height: 50}} source={{uri: data.posterUrl}} ></Image>
                </View>
                <View style={styles.title}>
                    <Text style={styles.itemText}>{data.title}</Text>
                    <Text>{ data.genre.join() }</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 3,
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomColor: '#b0bec5',
        borderBottomWidth: 1
    },
    title: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000'
    },
    posterThumbnail: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 3
    }
})

export default ListItem;