import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Animatable from "react-native-animatable"
import { icons } from '@/constants'
import { Video, ResizeMode } from 'expo-av'




const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}
const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? <Video source={{ uri: item.video }}
                className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinished) {
                        setPlay(false)
                    }
                }}

            /> : <TouchableOpacity
                className='relative justify-center items-center'
                activeOpacity={0.5}
                onPress={() => setPlay(true)}
            >
                <ImageBackground source={{
                    uri: item.thumbnail
                }}
                    className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                    resizeMode='cover'
                />
                <Image source={icons.play} className='h-12 w-12 absolute' />


            </TouchableOpacity>}
        </Animatable.View>
    )
}


const Trending = ({ posts }) => {
    const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    });
    const [activeItem, setActiveItem] = useState(posts[1])

    return (
        <FlatList data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />)}
            horizontal
            onViewableItemsChanged={handleViewableItemsChanged.current}
            viewabilityConfig={
                {
                    itemVisiblePercentThreshold: 70
                }
            }
            contentOffset={{
                x: 170

            }}

        />
    )
}

export default Trending