import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import { FormEvent } from '@/nativewind-env'
import { icons } from "../../constants"

const FormFlied = ({
  title, value, otherStyle, keyboardType, handleChangeText, placeholder
}: {
  title: string, value: string, otherStyle: string, keyboardType?: string, handleChangeText: (text: string) => void,
  placeholder: string
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className='text-base text-green-100 font-pmedium'>{title}</Text>
      <View className='border-2 border-black-200 w-full h-16 px-4 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput className='flex-1 text-white font-psemibold text-base'
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => {
            setShowPassword(!showPassword)
          }}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
          </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormFlied