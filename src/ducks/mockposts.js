export const PHOTO_CAPTURE = "reactnativemastersv2/camera/PHOTO_CAPTURE";
export const PHOTO_CAPTURE_SUCCESS = "reactnativemastersv2/camera/PHOTO_CAPTURE_SUCCESS";
const initialState = {
    posts: []
};

export default function reducer(state = initialState, action = {}){
    switch(action.type){
        case PHOTO_CAPTURE:
            alert(PHOTO_CAPTURE);
            return state;
        case PHOTO_CAPTURE_SUCCESS:
            alert(action.uri);
            alert(JSON.stringify(state));
        default: 
            return state;
    }
}


export function capturePhoto(uri){
    
    return {
            type: PHOTO_CAPTURE_SUCCESS,
            uri
        };
}