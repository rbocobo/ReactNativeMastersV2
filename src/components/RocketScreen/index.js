import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button, NetInfo,Image, ImageBackground} from 'react-native';
import { connect } from 'react-redux';
import { listRockets, listRocketsFromLocal, closeDB, changeBackup, getRocketsDB, ROCKETS_KEY } from '../../ducks/rockets';
import RocketItem from '../RocketItem';
import { connectionState } from '../../ducks/connectivity';


class RocketScreen extends Component {

    state = {
        rockets: [],
        isLoading: false
    }

    static getDerivedStateFromProps(props, state){
        if(props.rockets !== state.rockets){
            return {

            }
        }
    }
    
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
        this.props.closeDB();
    }

    handleConnectionChange = (isConnected) => {
        //alert(`Connection Changed:${isConnected}`);
        this.props.connectionState(isConnected);
    }

    
    onRefresh() {
        if(this.props.isConnected === true){
            console.log("CONNECTED LISTROCKETS()")
            this.props.listRockets();
        }else{
            //console.log("DISCONNECTED getRocketsDB()")
            
            if(this.props.backup === "async")
            this.props.listRocketsFromLocal();
            else
            this.props.getRocketsDB();
        }
    }

    storeData = async () => {
         try {
             await AsyncStorage.setItem(ROCKETS_KEY, JSON.stringify(this.props.rockets));
         } catch (error) {
             alert(JSON.stringify(error));
         }
    }

    backupmethod = () => {
        const { backup } = this.props;
        let text = '';
        if(backup == "async") {
            text = "AsyncStorage"
        }else text = "SQLite";

        return <Text>Using {text} when offline</Text>
    }

    onpressBackup = (backup) => {
        this.props.changeBackup(backup);
    }

    render() {
        const rockets = this.props.rockets.map(r=>{return { ...r, key: r.id.toString() }});
        const loading = this.props.isLoading == true;
        return (

            <View style={styles.container}>
                <Image resizeMode="stretch" style={{position: 'absolute'}} source={require('../../../assets/images/background.jpg')} ></Image>
                { !this.props.isConnected && 
                <View style={styles.disconnectionNotice}>
                    <Image style={{width:30, height: 30}} source={require('../../../assets/images/nowifi.png')}></Image>
                    <Text style={styles.disconnectionText}>Disconnected</Text>
                </View>}
                <View style={styles.backupOptions}>
                    <Button style={styles.backupButtons} title="AsyncStorage" onPress={()=>this.onpressBackup("async")}></Button>
                    <Button style={styles.backupButtons} title="SQLite" onPress={()=>this.onpressBackup("sqlite")}></Button>
                    {this.backupmethod()}
                </View>
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
    backupOptions:{
        height: 40,
        backgroundColor: '#81c784',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    backupButtons: {
        marginLeft: 20
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
    getRocketsDB,
    closeDB,
    changeBackup,
    connectionState
}

const mergeProps = (
    { rockets, connectivity, ...state },
    {
        listRockets,
        connectionState,
        listRocketsFromLocal,
        getRocketsDB,
        closeDB,
        changeBackup,
        ...dispatch
    },
    ownProps
    ) => ({
        ...state,
        ...dispatch,
        ...ownProps,
        rockets: rockets.rockets,
        isLoading: rockets.isLoading,
        backup: rockets.backup,
        isConnected: connectivity.isConnected,
        listRockets: () => listRockets(),
        listRocketsFromLocal: () => listRocketsFromLocal(),
        connectionState: status => connectionState(status),
        getRocketsDB: () => getRocketsDB(),
        closeDB: () => closeDB(),
        changeBackup: (backup) => changeBackup(backup)
    })


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RocketScreen)