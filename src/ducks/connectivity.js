export const CHANGE_CONNECTION_STATUS = 'reactnativemastersv2/connectivity/CHANGE_CONNECTION_STATUS';

const initialState = {
    isConnected: false
};

export default function reducer(state = initialState, action = {}){
    switch(action.type){
        case CHANGE_CONNECTION_STATUS:
        return {
            ...state,
            isConnected: action.isConnected
        };
        default:
        return state
    }
}

export const connectionState = (status) => {
    return {
        type: CHANGE_CONNECTION_STATUS,
        isConnected: status
    };
}