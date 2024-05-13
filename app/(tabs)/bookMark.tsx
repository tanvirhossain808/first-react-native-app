import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput/SearchInput';
import EmptyState from '@/components/EmptyState/EmptyState';
import { bookmarkedPosts, searchPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/hooks/useAppWrite';
import VideoCard from '@/components/VideoCard/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';




const Saved = (): JSX.Element => {
    const { user } = useGlobalContext()
    const [posts, setPost] = useState([])
    const [data, setData] = useState([])
    const { query } = useLocalSearchParams()
    console.log(query, "setPost");
    // const { refetch } = useAppWrite(() => searchPosts(query), setPost)
    useEffect(() => {
        // refetch()
        const bookMarkData = async (data) => {
            const posts = await bookmarkedPosts(data)
            setData(posts)
        }
        user && bookMarkData(user.saved)

    }, [query, user])
    console.log(user, "user");

    console.log(data, "setData");
    return (
        <SafeAreaView className='bg-primary flex-1'>
            <FlatList data={data}
                keyExtractor={(item: {
                    $id: string; id: string
                }) => item.$id}
                renderItem={({ item }) => (<VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className='mt-6 px-4 space-y-6'>
                        <View className='justify-between   mb-6'>

                            <Text className='font-pmedium text-sm text-gray-100'>
                                Search Result
                            </Text>
                            <Text className='text-2xl font-psemibold text-white'>{query}</Text>
                            <View className='mt-6 w-ful mb-8'>
                                <SearchInput initailQuery={query} />

                            </View>
                        </View>

                    </View>
                )}
                ListEmptyComponent={() => <EmptyState title={"No videos found"}
                    subtitle="No videos found for this search query"
                />}

            /*    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} */
            />

            {/* </FlatList> */}
        </SafeAreaView>
    )
}

export default Saved