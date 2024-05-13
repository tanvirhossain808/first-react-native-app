import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { addBookMark, getAllPosts } from '@/lib/appwrite'
import useAppWrite from '@/lib/hooks/useAppWrite'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'

const VideoCard = ({ video: { title, thumbnail, video, isMarked, creator: { username, avatar, saved, $id: creatorId }, $id: id }, setPosts, posts, }: { video: any, posts?: any, setPosts?: any }) => {

    const { user, setUser } = useGlobalContext()
    const [play, setPlay] = useState(false)
    const [touchMenu, setTouchMenu] = useState(false)
    // console.log(user);
    const handleBookMark = async () => {
        const isExit = user.saved.find(post => post === id)
        if (isExit) return Alert.alert("Inof", "Already added to the bookmark")

        try {
            const updateResult = await addBookMark(id, posts, creatorId)
            setUser(updateResult)
            console.log(updateResult, "dk");
            // console.log(updateResult, "upre");
            setPosts((pre) => pre.map((post) => {
                // post = { ...post.creator.saved = [...post.creator.saved, id] }
                // console.log(post);
                return {
                    ...post, creator: { ...post.creator, saved: post.creator.saved.length ? [...post.creator.saved, id] : [id] }

                }


            }))
        } catch (error) {
            console.log(error);
        }


    }
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