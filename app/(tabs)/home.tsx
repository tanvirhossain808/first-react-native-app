import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants';
import SearchInput from '@/components/SearchInput/SearchInput';
import Trending from '@/components/Trending/Trending';
import EmptyState from '@/components/EmptyState/EmptyState';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/hooks/useAppWrite';
import VideoCard from '@/components/VideoCard/VideoCard';
import { useGlobalContext } from '@/context/GlobalProvider';




const Home = (): JSX.Element => {
    const { user, setUser, isLoggedIn } = useGlobalContext()



    const { data: posts, refetch } = useAppWrite(getAllPosts)
    const { data: latestPost } = useAppWrite(getLatestPosts)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()

        setRefreshing(false)
    }
    // console.log(posts);
    return (
        <SafeAreaView className='bg-primary flex-1'>
            <FlatList data={posts}
                keyExtractor={(item: {
                    $id: string; id: string
                }) => item.$id}
                renderItem={({ item }) => (<VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className='mt-6 px-4 space-y-6'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome back
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
                            </View>
                            <View className='mt-1.5'>
                                <Image source={images.logoSmall} className='w-9 h-10'
                                    resizeMode='contain'
                                />
                            </View>
                        </View>
                        <SearchInput />
                        <View className='w-full flex-1 pt-5 pb-8'>

                            <Text className='text-gray-100 text-lg font-pregular mb-3'>
                                Latest Videos
                            </Text>
                            <Trending posts={latestPost} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => <EmptyState title={"No video found"}
                    subtitle="Be the first one to upload a video"
                />}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

            {/* </FlatList> */}
        </SafeAreaView>
    )
}

export default Home