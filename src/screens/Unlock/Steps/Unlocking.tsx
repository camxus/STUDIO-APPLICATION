import { View, Text } from 'react-native'
import React from 'react'
import { Colors, ProgressBar } from 'react-native-ui-lib'

interface IUnlocking {
  progress: number
}

const Unlocking = ({progress}: IUnlocking) => {
  return (
    <View className="flex items-center justify-center">
      <Text>Unlocking</Text>
      <ProgressBar progress={progress} progressColor={"black"}/>
    </View>
  )
}

export default Unlocking