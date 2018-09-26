import React, { Component } from 'react';
import { View, Stylesheet, Icon } from 'react-native';
import { firestoreConnect } from 'react-redux-firebase';
import { CameraKitGalleryView, CameraKitGallery } from 'react-native-camera-kit';
import uuid from 'uuid';
import { NotificationsAndroid, PendingNotifications } from 'react-native-notifications';
import { RNNotificationBanner } from 'react-native-notification-banner';
import icon from 'react-native-vector-icons/FontAwesome';

let copy = <Icon name="cloud-upload" size={24} color="#FFFFFF" family={"FontAwesome"} />;
class GalleryScreen extends Component{
    albums = null;
    state = {
        album: null,
        images: {},
        shouldRenderCameraScreen: false
    }

    componentDidMount(){

        CameraKitGallery.getAlbumsWithThumbnails().then(albums => {
            //const [ { album } ] = albums.albums;
            if(albums.albums.length > 0){
            this.setState({album : albums.albums[0].albumName});
            }
        })
    }

    render(){
        
        if(this.state.album){
        return(
            <CameraKitGalleryView
                ref={(gallery) => {
                    this.gallery = gallery;
                }}
                style={{flex:1, margin: 0, backgroundColor: '#ffffff', marginTop: 50}}
                albumName={this.state.album}
                minimumInteritemSpacing={10}
                minimumLineSpacing={10}
                columnCount={3}
                selectedImages={Object.keys(this.state.images)}
                onSelected={(result) => {
                }}
                onTapImage={this.onTapImage.bind(this)}
                selection={{
                selectedImage: require('../../../assets/images/selected.png'),
                imagePosition: 'bottom-right',
                imageSizeAndroid: 'large',
                enable: (Object.keys(this.state.images).length < 3)
                }}
                fileTypeSupport={{
                    supportedFileTypes: ['image/jpeg'],
                    unsupportedOverlayColor: "#00000055",
                    unsupportedImage: require('../../../assets/images/unsupportedImage.png'),
                    //unsupportedText: 'JPEG!!',
                    unsupportedTextColor: '#ff0000'
                }}
                customButtonStyle={{
                    image: require('../../../assets/images/openCamera.png'),
                    backgroundColor: '#06c4e9'
                }}
                onCustomButtonPress={() => this.setState({shouldRenderCameraScreen: true})}
            />
        )}else{
            return (<View></View>)
        }
    }

    onTapImage = (event) => {
        const uri = event.nativeEvent.selected;
        this.uploadImageAsync(`file://${uri}`);
        this.props.navigation.navigate("Album");

      }

     uploadImageAsync = async (uri) => {
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
}

export default firestoreConnect()(GalleryScreen)
