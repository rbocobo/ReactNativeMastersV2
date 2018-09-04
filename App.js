import React from 'react';
import { StyleSheet, Animated, Easing, YellowBox } from 'react-native';
import FlatListScreen from './src/components/FlatListScreen';
import { createStackNavigator } from 'react-navigation';
import ItemDetailScreen from './src/components/ItemDetailScreen';

export default class App extends React.Component {
  render() {
    return (
      <RootStack/>
    );
  }
}

YellowBox.ignoreWarnings(["Warning:"]);

const RootStack = createStackNavigator({
  Home: {
    screen: FlatListScreen,
    navigationOptions: {
      title: "Movie List"
    }
  },
  Details: {
    screen: ItemDetailScreen
  }
}, {
  initialRouteName: 'Home',
  transitionConfig
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.in(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0],
      })

      return { transform: [ { translateX }]}
    }
  }
}