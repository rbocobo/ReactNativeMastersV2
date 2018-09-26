import React, { Component } from 'react';
import { Alert, PermissionsAndroid, Icon  } from 'react-native';
import { connect } from 'react-redux';
import { CameraKitCameraScreen, CameraKitCamera, onCapture } from 'react-native-camera-kit';
import { capturePhoto, PHOTO_CAPTURE_SUCCESS } from '../../ducks/mockposts';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import uuid from 'uuid';
import { NotificationsAndroid, PendingNotifications } from 'react-native-notifications';
import { RNNotificationBanner } from 'react-native-notification-banner';
import icon from 'react-native-vector-icons/FontAwesome';

let copy = <Icon name="cloud-upload" size={24} color="#FFFFFF" family={"FontAwesome"} />;

class CameraScreen extends Component {
    
    state = {isPermitted:false};
    constructor(props) {
        super(props);
        var that=this;

        async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,{
                  'title': 'CameraExample App Camera Permission',
                  'message': 'CameraExample App needs access to your camera '
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //If CAMERA Permission is granted
                //Calling the WRITE_EXTERNAL_STORAGE permission function
                requestExternalWritePermission();
              } else {
                alert("CAMERA permission denied");
              }
            } catch (err) {
              alert("Camera permission err",err);
              console.warn(err)
            }
        }

        async function requestExternalWritePermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
                  'title': 'CameraExample App External Storage Write Permission',
                  'message': 'CameraExample App needs access to Storage data in your SD Card '
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //If WRITE_EXTERNAL_STORAGE Permission is granted
                //Calling the READ_EXTERNAL_STORAGE permission function
                requestExternalReadPermission();
              } else {
                alert("WRITE_EXTERNAL_STORAGE permission denied");
              }
            } catch (err) {
              alert("Write permission err",err);
              console.warn(err)
            }
          }

          async function requestExternalReadPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,{
                  'title': 'CameraExample App Read Storage Write Permission',
                  'message': 'CameraExample App needs access to your SD Card '
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //If READ_EXTERNAL_STORAGE Permission is granted
                //changing the state to re-render and open the camera in place of activity indicator
                that.setState({isPermitted:true})
              } else {
                alert("READ_EXTERNAL_STORAGE permission denied");
              }
            } catch (err) {
              alert("Read permission err",err);
              console.warn(err)
            }
          }

          //Calling the camera permission function
            requestCameraPermission();
    }

    componentDidMount(){
        PendingNotifications.getInitialNotification()
        .then((notification) => {
                console.log("Initial notification was:", (notification ? notification.getData() : 'N/A'));
            })  	
        .catch((err) => console.error("getInitialNotifiation() failed", err));
    }

    onBottomButtonPressed(event) {
        const captureImages = JSON.stringify(event.captureImages);
        switch(event.type){
            case 'left':
                this.props.navigation.navigate("Album");
                return;
            case 'capture':
                const [{ uri }] = event.captureImages;
                this.uploadImageAsync(`file://${uri}`);
                this.props.navigation.navigate("Album");
            default:
                return;
            
        }
        
    }

    
    async uploadImageAsync(uri) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = this.props.firebase
          .storage()
          .ref()
          .child(uuid.v4());
      
        const snapshot = await ref.put(blob);
        snapshot.ref.getDownloadURL().then((uri) => {
            const fireref = this.props.firestore.collection('posts');
            fireref.add({
                title: 'New York',
                uri
            }).then(e=>{
                NotificationsAndroid.localNotification({title: "Album Update", body: "A new image has been added to your album"});
                RNNotificationBanner.Show({
                    title: "Magenic Masters - React Native",
                    subTitle: "A new image has been uploaded",
                    withIcon: true,
                    icon: copy
                })
            });
        })

    }

    render(){
        
        return(
            <CameraKitCameraScreen
                shouldSaveToCameraRoll={true}
                actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
                flashImages={{
                on: require('../../../assets/images/flashOn.png'),
                off: require('../../../assets/images/flashOff.png'),
                auto: require('../../../assets/images/flashAuto.png')
                }}
                cameraFlipImage={require('../../../assets/images/cameraFlipIcon.png')}
                captureButtonImage={require('../../../assets/images/cameraButton.png')}
            />
        )
    }
}

export default firestoreConnect()(CameraScreen)