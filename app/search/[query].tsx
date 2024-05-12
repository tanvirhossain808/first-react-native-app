import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput/SearchInput';
import EmptyState from '@/components/EmptyState/EmptyState';
import { searchPosts } from '@/lib/appwrite';
import useAppWrite from '@/lib/hooks/useAppWrite';
import VideoCard from '@/components/VideoCard/VideoCard';
import { useLocalSearchParams } from 'expo-router';




const Search = (): JSX.Element => {
    const { query } = useLocalSearchParams()

    const { data: posts, refetch } = useAppWrite(() => searchPosts(query))

    useEffect(() => {
        refetch()
    }, [query])

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

export default Search