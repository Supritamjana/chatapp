import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

interface Props{
  size : number,
}

const Loading = ({size}: Props) => {
  return (
    <View style={{height: size, aspectRatio: 1}}>
      <LottieView style={{flex: 1}} source={require("../assets/images/animation/loading.json")} autoPlay loop/>
    </View>
  )
}

export default Loading