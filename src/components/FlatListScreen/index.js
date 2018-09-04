import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import movies from '../../mockdata/movies.json';
import ListItem from '../ListItem'

const FlatListScreen = (props) => {

    showMovieDetail = (data) => {
        props.navigation.navigate('Details', { data })
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                renderItem={({item}) => <ListItem data={item} onMoviePress={this.showMovieDetail}></ListItem>}
            />
        </View>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})
export default FlatListScreen;