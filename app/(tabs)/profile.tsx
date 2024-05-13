import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput/SearchInput';
import EmptyState from '@/components/EmptyState/EmptyState';
import { getUserPosts, signOut } from '@/lib/appwrite';
import useAppWrite from '@/lib/hooks/useAppWrite';
import VideoCard from '@/components/VideoCard/VideoCard';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox/InfoBox';
import { useState } from 'react';




const Profile = (): JSX.Element => {
    const [posts, setUserPost] = useState([])
    // console.log(data);
    const { user, setUser, isLoggedIn, setIsLoading } = useGlobalContext()
    console.log(user.$id);
    const { refetch } = useAppWrite(() => getUserPosts(user?.$id), setUserPost)


    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLoading(false)
        router.replace("/signin")
    }
    return (
        <SafeAreaView className='bg-primary flex-1'>
            <FlatList data={posts}
                keyExtractor={(item: {
                    $id: string; id: string
                }) => item.$id}
                renderItem={({ item }) => (<VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <TouchableOpacity
                            className='w-full items-end mb-10'
                            onPress={logout}

                        >
                            <Image source={icons.logout} className='w-6 h-6' resizeMode='contain' />

                        </TouchableOpacity>

                        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                            <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
                        </View>
                        <InfoBox title={user?.username}
                            containerStyle='mt-5'
                            titleStyle="text-lg"

                        />
                        <View className='mt-5 flex-row'>
                            <InfoBox title={posts?.length || 0}
                                subtitle="Posts"
                                containerStyle='mr-10'
                                titleStyle="text-lg"

                            />
                            <InfoBox
                                title="1.2k"
                                subtitle="Followers"
                                titleStyle="text-xl"

                            />

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

export default Profile