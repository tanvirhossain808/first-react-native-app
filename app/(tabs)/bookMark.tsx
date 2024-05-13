import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput/SearchInput';
import EmptyState from '@/components/EmptyState/EmptyState';
import { bookmarkedPosts, searchParticularBookmarkedPost, searchPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/hooks/useAppWrite';
import VideoCard from '@/components/VideoCard/VideoCard';
import { useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useRoute } from '@react-navigation/native';




const Saved = (): JSX.Element => {
    const { user } = useGlobalContext()
    const [posts, setPost] = useState([])
    const [data, setData] = useState([])
    const { query } = useLocalSearchParams()
    const { name } = useRoute()

    console.log(query, "setPost");
    // const { refetch } = useAppWrite(() => searchPosts(query), setPost)
    useEffect(() => {
        // refetch()
        const bookMarkData = async (data) => {
            const posts = await bookmarkedPosts(data)
            setData(posts)
        }
        if (user && !query) user && bookMarkData(user.saved)

        const particularBooked = async () => {
            const queryData = await searchParticularBookmarkedPost(data.saved, query)
            setData(queryData)
        }

        if (query) particularBooked()

    }, [query, user])
    // console.log(user, "user");
    console.log(query, "query");
    // console.log(data, "setData");
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
                                <SearchInput initailQuery={query} name={name} />

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