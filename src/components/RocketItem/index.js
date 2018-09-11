import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RocketComponent = ({ rocket }) => (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={{width: 45, height: 90}} source={{uri: rocket.imageURL}}></Image>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.rocketName}>{rocket.name}</Text>
        </View>
    </View>
);



const styles = StyleSheet.create({
    container: {
        height: 100,
        padding: 20,
        width: '90%',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#008ba3',
        backgroundColor: '#e0f7fa',
        borderBottomWidth: 1,
        shadowColor: '#e91e63',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        flexDirection: 'row'
    },
    imageContainer: {
        borderRadius: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    textContainer:{
        justifyContent: 'center',
        marginLeft:20
    },
    rocketName:{
        fontSize:24,
        fontFamily: "poppins"
    }
})

export default RocketComponent;