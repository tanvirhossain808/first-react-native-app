import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormFlied from '@/components/FormFeild/FormFlied'
import CustomButton from '@/components/CustomButton/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
// import { FormEvent } from '@/nativewind-env'

export default function SignIn(): JSX.Element {
    const { setUser, setIsLoggedIn } = useGlobalContext()


    const [form, setForm] = useState<{

        email: string, password: string

    }>({
        email: '',
        password: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submit = async (): Promise<void> => {
        if (!form.email || !form.password) {
            Alert.alert("Error", 'Please fill in all the fields')
            // return
        }
        setIsSubmitting(true)
        try {
            const result = await signIn(form.email, form.password)
            const currentUser = await getCurrentUser()
            setUser(currentUser)
            setIsLoggedIn(true)


            result && router.replace("/home")
        }
        catch (error: any) {
            Alert.alert("error", error.message)
            console.log(error);
        }
        finally {
            setIsSubmitting(false)
        }



    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>

                <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
                    <Image source={images.logo}
                        resizeMode='contain' className='w-[150px] h-[35px]'
                    />
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>
                    <FormFlied
                        title="Email"
                        value={form.email}
                        handleChangeText={
                            (e: string) => setForm({
                                ...form, email: e
                            })

                        }
                        placeholder='Type your email'
                        otherStyle="mt-7"
                        keyboardType="email-address"

                    />
                    <FormFlied
                        title="Password"
                        value={form.password}
                        handleChangeText={
                            (e: string) => setForm({
                                ...form, password: e
                            })

                        }
                        placeholder='Type your password'
                        otherStyle="mt-7"
                        keyboardType="email-address"

                    />
                    <CustomButton title='Sign in' handlePress={submit}
                        containerStyle='mt-7'
                        isLoading={isSubmitting}

                    />
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Don't have an account?
                        </Text>
                        <Link href="signUp" className='text-lg font-psemibold text-secondary'>Sign Up</Link>

                    </View>

                </View>



            </ScrollView>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})