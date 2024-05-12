import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants"
import CustomButton from '@/components/CustomButton/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

NativeWindStyleSheet.setOutput({
    default: "native",
});
export default function App(): JSX.Element {
    const { isLoading, isLoggedIn, user }: { isLoading: boolean, isLoggedIn: boolean, user: any } = useGlobalContext()
    if (!isLoading && isLoggedIn) return <Redirect href="/home" />
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%', }}>
                <View className='w-full justify-center h-full items-center px-4'>
                    <Image source={images.logo} className='w-[130px] h-[84px]'
                        resizeMode='contain'
                    />
                    <Image source={images.cards} className='w-[380px] h-[300px]'
                        resizeMode='contain'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            Discover Endless Possibility with{' '}
                            <Text className='text-secondary-200'>
                                Aora
                            </Text>
                        </Text>
                        <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where creativity meets innovation: embark on a journey of limitless exploration with Aora

                    </Text>
                    <CustomButton title='Continue With Email' handlePress={() => { router.push("/signin") }}
                        containerStyle='w-full mt-7'
                    />
                </View>



            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    )
}

// const styles = StyleSheet.create(
//     {
//         container: {
//             flex: 1,
//             backgroundColor: "#fff",
//             alignItems: "center",
//             justifyContent: "center"
//         },
//     }
// )