import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { addBookMark, getAllPosts } from '@/lib/appwrite'
import useAppWrite from '@/lib/hooks/useAppWrite'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const VideoCard = ({ video: { title, thumbnail, video, $id: id, isMarked, creator: { username, avatar } }, setPosts }: { video: any }) => {
    // console.log(setTesting);
    const { refetch, data } = useAppWrite(getAllPosts, setPosts)
    // console.log(id); 
    // console.log(rest, "rest");
    const { user } = useGlobalContext()
    const [play, setPlay] = useState(false)
    const [touchMenu, setTouchMenu] = useState(false)
    // console.log(user);
    const handleBookMark = async () => {
        // console.log(user.id);
        const updateResult = addBookMark(id)
        refetch()



    }
    console.log(data);
    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center'>
                        <Image source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3
                     gap-y-1 '>
                        <Text
                            className='text-white font-psemibold text-sm'
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text className='text-xs text-gray-100 font-pregular'
                            numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
                </View>
                <View>

                </View>
                <TouchableOpacity className='relative items-end w-[100px] h-5'
                    onPress={() => setTouchMenu(true)}
                    disabled={touchMenu}

                >

                    <View className='pt-2'>
                        <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
                    </View>


                    {touchMenu && <TouchableOpacity
                        className='left-4 absolute top-1/2'
                        disabled={!touchMenu}
                        onPress={handleBookMark}
                    >
                        <Text className='text-white absolute '>
                            {isMarked ? "Bookmarked" : "Bookmark"}
                        </Text>
                    </TouchableOpacity>
                    }
                </TouchableOpacity>
            </View>
            {play ? <Video source={{ uri: video }}
                className='w-full h-60 rounded-xl mt-3 '
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinished) {
                        setPlay(false)
                    }
                }}

            /> : <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className='w-full h-60 rounded-xl relative justify-center items-center'
            >

                <Image
                    source={{ uri: thumbnail }}
                    className='w-full h-full rounded-xl mt-3'
                    resizeMode='cover'
                />
                <Image source={icons.play}
                    className='w-12 h-12 absolute'
                    resizeMode='contain'
                />
            </TouchableOpacity>}
        </View>
    )
}

export default VideoCard