import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, NetInfo, Image} from 'react-native';
import { connect } from 'react-redux';
import { listRockets, listRocketsFromLocal, ROCKETS_KEY } from '../../ducks/rockets';
import RocketItem from '../RocketItem';
import { connectionState } from '../../ducks/connectivity';


class RocketScreen extends Component {

    
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        NetInfo.isConnected.fetch().then((isConnected) => {
            if(isConnected == true){
                this.props.listRockets();
                //this.storeData();
            }
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        //alert(`Connection Changed:${isConnected}`);
        this.props.connectionState(isConnected);
    }

    
    onRefresh() {
        if(this.props.isConnected){
            this.props.listRockets();
        }else{

        }
    }

    // storeData = async () => {
    //     try {
    //         await AsyncStorage.setItem(ROCKETS_KEY, 'this.props.rockets');
    //     } catch (error) {
    //         alert(JSON.stringify(error));
    //     }
    // }


    render() {
        const rockets = this.props.rockets.map(r=>{return { ...r, key: r.id.toString() }});
        const loading = this.props.isLoading == true;
        return (
            <View style={styles.container}>
                { !this.props.isConnected && 
                <View style={styles.disconnectionNotice}>
                    <Image style={{width:30, height: 30}} source={require('../../../assets/images/nowifi.png')}></Image>
                    <Text style={styles.disconnectionText}>Disconnected</Text>
                </View>}
                <FlatList 
                data={rockets} 
                renderItem={({item})=> <View style={styles.itemContainer}><RocketItem rocket={item}></RocketItem></View>} 
                
                onRefresh={()=>this.onRefresh()}
                refreshing={loading}
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    disconnectionNotice:{
        height: 40,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    disconnectionText: {
        color: 'white'
    }
})

const renderSeparator = () => {
    return (
        <View
          style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
          }}
        />
      );
}

const mapStateToProps = ({rockets, connectivity}) => ({
    rockets,
    connectivity
});

const mapDispatchToProps = {
    listRockets,
    listRocketsFromLocal,
    connectionState
}

const mergeProps = (
    { rockets, connectivity, ...state },
    {
        listRockets,
        connectionState,
        listRocketsFromLocal,
        ...dispatch
    },
    ownProps
    ) => ({
        ...state,
        ...dispatch,
        ...ownProps,
        rockets: rockets.rockets,
        isLoading: rockets.isLoading,
        isConnected: connectivity.isConnected,
        listRockets: () => listRockets(),
        listRocketsFromLocal: () => listRocketsFromLocal(),
        connectionState: status => connectionState(status)
    })

// const mapStateToProps = state => {
//     const { rockets, isLoading } = state;
//     return {
//         isLoading,
//         rockets
//     };
// };


// const mapDispatchToProps = {
//     listRockets
// };

// export default connect(mapStateToProps, mapDispatchToProps)(RocketScreen)
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RocketScreen)