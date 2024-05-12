import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading }: {
    title: string, handlePress: () => void,
    containerStyle: string,
    textStyle?: string,
    isLoading?: boolean
}): JSX.Element => {
    return (
        <TouchableOpacity className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? "opacity-50" : ""}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyle}`}

            >{title}</Text>

        </TouchableOpacity>
    )
}

export default CustomButton