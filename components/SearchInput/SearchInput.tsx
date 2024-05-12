

import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
// import { FormEvent } from '@/nativewind-env'
import { icons } from "../../constants"
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initailQuery }): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false)
    const pathName = usePathname()
    const [query, setQuery] = useState(initailQuery || "")
    return (
        <View className='border-2 border-black-200 w-full h-16 px-4 rounded-2xl focus:border-secondary items-center flex-row '>
            <TextInput className='text-base mt-0.5 text-white flex-1 font-pregular'
                placeholder="Search for a video topic"
                placeholderTextColor="#CDCDE0"
                value={query}
                onChangeText={setQuery}
            />
            <TouchableOpacity
                onPress={() => {
                    if (!query) return Alert.alert("Missing query", "Please input something to search results across database")
                    if (pathName.startsWith("/search")) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}

            >
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>

        </View>
    )
}

export default SearchInput