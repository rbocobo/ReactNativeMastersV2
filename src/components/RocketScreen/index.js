import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import { listRockets } from '../../ducks/rockets';
import RocketItem from '../RocketItem';
import { connectionState } from '../../ducks/connectivity';

class RocketScreen extends Component {


    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        if(this.props.isConnected){
            this.props.listRockets();
        }
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
        }
    }

    render() {
        const rockets = this.props.rockets.map(r=>{return { ...r, key: r.id.toString() }});
        const loading = this.props.isLoading == true;
        return (
            <View style={styles.container}>
                { !this.props.isConnected && <View style={styles.disconnectionNotice}><Text style={styles.disconnectionText}>Disconnected</Text></View>}
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
        justifyContent: 'center'
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
    connectionState
}

const mergeProps = (
    { rockets, connectivity, ...state },
    {
        listRockets,
        connectionState,
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