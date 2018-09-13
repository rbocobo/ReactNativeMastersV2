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

// export async function saveToAsyncStorage({key, value}){
//     try {
//         await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//         alert("ERROR SAVING TO ASYNCSTORAGE");
//     }
// }

// export async function listRocketsFromLocal(){
//     try {
//         const rockets = await AsyncStorage.getItem(ROCKETS_KEY);
//         if(value !== null) {
//             return JSON.parse(rockets)
//         }
        
//     }catch (error) {
//         alert("ERROR FETCHING FROM ASYNCSTORAGE");
//     }
//     //}
// }