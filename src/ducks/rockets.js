import { AsyncStorage } from 'react-native';

export const ROCKETS_KEY = '@RocketsKey';

export const GET_ROCKETS = "reactnativemastersv2/rockets/GET_ROCKETS";
export const GET_ROCKETS_SUCCESS = "reactnativemastersv2/rockets/GET_ROCKETS_SUCCESS";
export const GET_ROCKETS_FAIL = "reactnativemastersv2/rockets/GET_ROCKETS_FAIL";
export const GET_ROCKETS_LOCAL_SUCCESS = "reactnativemastersv2/rockets/GET_ROCKETS_LOCAL_SUCCESS";

const initialState = {
    rockets: [],
    isLoading: false
};

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case GET_ROCKETS:
            return { ...state, isLoading: true };
        case GET_ROCKETS_SUCCESS:
            storeRocketsToLocal(action.payload.data);
            return { ...state, isLoading: false, rockets: action.payload.data.rockets};
        case GET_ROCKETS_FAIL:
            return { ...state, isLoading: false, rockets: []};
        case GET_ROCKETS_LOCAL_SUCCESS:
            return { ...state, isLoading: false, rockets: action.rockets};
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



export async function listRocketsFromLocal(){
    try {
        const rockets = await AsyncStorage.getItem(ROCKETS_KEY);
        if(value !== null) {
            return {
                type: GET_ROCKETS_LOCAL_SUCCESS,
                rockets: JSON.parse(rockets)
            }
        } 
    }catch (error) {
        return {
            type: GET_ROCKETS_FAIL
        }
    }
}

async function storeRocketsToLocal({rockets}) {
    try {
        await AsyncStorage.setItem(ROCKETS_KEY, JSON.stringify(rockets));
    } catch (error) {
        alert(JSON.stringify(rockets));
    }
}