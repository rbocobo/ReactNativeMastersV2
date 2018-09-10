export const GET_ROCKETS = "reactnativemastersv2/rockets/GET_ROCKETS";
export const GET_ROCKETS_SUCCESS = "reactnativemastersv2/rockets/GET_ROCKETS_SUCCESS";
export const GET_ROCKETS_FAIL = "reactnativemastersv2/rockets/GET_ROCKETS_FAIL";

const initialState = {
    rockets: [],
    isLoading: false
};

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case GET_ROCKETS:
            return { ...state, isLoading: true };
        case GET_ROCKETS_SUCCESS:
            return { ...state, isLoading: false, rockets: action.payload.data.rockets};
        case GET_ROCKETS_FAIL:
            return { ...state, isLoading: false, rockets: []};
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