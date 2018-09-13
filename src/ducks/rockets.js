import { AsyncStorage, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export const ROCKETS_KEY = '@RocketsKey';

export const GET_ROCKETS = "reactnativemastersv2/rockets/GET_ROCKETS";
export const GET_ROCKETS_SUCCESS = "reactnativemastersv2/rockets/GET_ROCKETS_SUCCESS";
export const GET_ROCKETS_FAIL = "reactnativemastersv2/rockets/GET_ROCKETS_FAIL";
export const GET_ROCKETS_LOCAL_SUCCESS = "reactnativemastersv2/rockets/GET_ROCKETS_LOCAL_SUCCESS";

export const GET_ROCKETS_DB = "reactnativemastersv2/rockets/GET_ROCKETS_DB";
export const GET_ROCKETS_DB_SUCCESS = "reactnativemastersv2/rockets/GET_ROCKETS_DB_SUCCESS";
export const GET_ROCKETS_DB_FAIL = "reactnativemastersv2/rockets/GET_ROCKETS_DB_FAIL";

export const CHANGE_BACKUP_METHOD = "reactnativemastersv2/rockets/CHANGE_BACKUP_METHOD";

let db;

const styles = StyleSheet.create({
    active: {
        backgroundColor: "#0d47a1"
    },
    inactive: {
        backgroundColor: "#9e9e9e"
    }

    }
);

const initialState = {
    rockets: [],
    isLoading: false,
    backup:"async"
};

export default function reducer(state = initialState, action = {}) {
    console.log("REDUCER ", action.type);
    switch(action.type) {
        case GET_ROCKETS:
            return { ...state, isLoading: true };
        case GET_ROCKETS_SUCCESS:
            storeRocketsToLocal(action.payload.data);
            storeRocketsToDB(action.payload.data);
            return { ...state, isLoading: false, rockets: action.payload.data.rockets};
        case GET_ROCKETS_FAIL:
            return { ...state, isLoading: false, rockets: []};
        case GET_ROCKETS_LOCAL_SUCCESS:
            return { ...state, isLoading: false, rockets: action.rockets};
        case GET_ROCKETS_DB:
            getRocketsDB();
            return { ...state, isLoading: true};
        case GET_ROCKETS_DB_SUCCESS:
            return { ...state, isLoading: false, rockets: action.rockets};
        case CHANGE_BACKUP_METHOD:
            return { ...state, backup: action.backup }
        default:
            return state;
    }
}

export function listRockets(){
    return {
        type: GET_ROCKETS,
        payload: {
            request: {
                url: '/rocket'
            }
        }
    };
}



export  function listRocketsFromLocal(){
    return(dispatch) => {
        AsyncStorage.getItem(ROCKETS_KEY).then(rockets => {
            if(rockets !== null) {
                dispatch({
                    type: GET_ROCKETS_LOCAL_SUCCESS,
                    rockets: JSON.parse(rockets)
                })
            } 
        })

    }
   
}

async function storeRocketsToLocal({rockets}) {
    try {
        await AsyncStorage.setItem(ROCKETS_KEY, JSON.stringify(rockets));
    } catch (error) {
        alert("ERROR");
    }
}

const dbSettings = {
    name: 'rockets.db',
    ver: '1.0',
    displayName: 'Rockets',
    size: 200000
}

const dbSuccess = () => { console.log("DB SUCCESS") };
const dbFail = () => { console.log("DB FAIL") };

function storeRocketsToDB({rockets}) {
    db = SQLite.openDatabase(dbSettings.name, dbSettings.ver, dbSettings.displayName, dbSettings.size, dbSuccess, dbFail);
    db.transaction((tx) => { initDB(tx, rockets) }, ()=>{console.log("ERROR DB STORING")} ,()=>{console.log("DB FINISHED STORING")});
}

function initDB(tx, rockets){
    tx.executeSql('DROP TABLE IF EXISTS rockets;');
    tx.executeSql('CREATE TABLE IF NOT EXISTS rockets('
    + 'id INTERGER PRIMARY KEY NOT NULL, '
    + 'name VARCHAR(100), '
    + 'imageURL VARCHAR(500) '
    + ');',[], dbSuccess, dbFail);

    console.log("RECORDS-->", JSON.stringify(rockets));
    rockets.forEach(i => {
        console.log('TRY INSERTING RECORD')
        if(i.imageURL){
            tx.executeSql(`INSERT INTO rockets VALUES (${i.id}, "${i.name}", "${i.imageURL}")`, [], ()=>{ console.log("RECORD INSERTED...")}, ()=>{ console.log("ERROR RECORD INSERTED...")})
        }
    });
}


export function getRocketsDB(){
    return (dispatch) => {
        db = SQLite.openDatabase(dbSettings.name, dbSettings.ver, dbSettings.displayName, dbSettings.size, ()=>{ console.log("DB IS NOW OPEN...")}, ()=>{ console.log("ERROR OPENING THE DB...") });
        console.log( "FETCHING ROCKETS FROM DB" );
        db.executeSql("SELECT id, name, imageURL FROM rockets",[], (results) => {
            let rockets = [];
            for(var i=0; i<results.rows.length; i++){
                rockets.push(results.rows.item(i));
            }
            dispatch({
                type: GET_ROCKETS_DB_SUCCESS,
                rockets
            });
        }, () => {
            console.log("FAIL FETCHING");
        });
    }

}



export function closeDB(){
    if(db){
        db.close(dbSuccess,dbFail);
    }
}

export function changeBackup(backup){
    return {
        type: CHANGE_BACKUP_METHOD,
        backup
    }
}