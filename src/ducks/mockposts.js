
export const PHOTO_UPLOADING = "reactnativemastersv2/camera/PHOTO_UPLOADING";
export const PHOTO_UPLOADING_SUCCESS = "reactnativemastersv2/camera/PHOTO_UPLOADING_SUCCESS";

const initialState = {
    uploadStatus: "idle"
};

export default function reducer(state = initialState, action = {}){
    switch(action.type){
        case PHOTO_UPLOADING:
            return { ...state, uploadStatus: "uploading"};
        case PHOTO_UPLOADING_SUCCESS:
        return { ...state, uploadStatus: "idle"};
        default: 
            return state;
    }
}



