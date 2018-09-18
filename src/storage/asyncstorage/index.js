import { AsyncStorage } from 'react-native';

export function saveToAsyncStorage({key, value}){
    AsyncStorage.setItem(key, JSON.stringify(value)).then((rockets) => {
        return {
            
        }
    })
}

export async function listRocketsFromLocal(){
    try {
        AsyncStorage.getItem(ROCKETS_KEY);
        
    }catch (error) {
        alert("ERROR FETCHING FROM ASYNCSTORAGE");
    }
    //}
}
