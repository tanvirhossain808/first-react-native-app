import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../constants"
import { ImageSourcePropType } from 'react-native';
const TabIcon = ({ icon, color, name, focused }: {
    icon: ImageSourcePropType, color: string, name: string, focused: boolean
}): JSX.Element => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image source={icon}
                resizeMode='contain'
                tintColor={color}
                className={`w-6 h-6 ${focused ? "font-psemibold" : "font-pregular"}`}
            />

            <Text className={`${focused ? "font-psemibold" : "font-pregular"}`} style={{ color }}>{name}</Text>

        </View>
    )
}
const TabsLayout = (): JSX.Element => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#ffA001",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 84
                }
            }}

        >
            <Tabs.Screen name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({
                        color, focused
                    }) => (
                        <TabIcon icon={icons.home} color={color} name="Home"
                            focused={focused}
                        />
                    )
                }}

            />
            <Tabs.Screen name="bookMark"
                options={{
                    title: "Bookmark",
                    headerShown: false,
                    tabBarIcon: ({
                        color, focused
                    }) => (
                        <TabIcon icon={icons.home} color={color} name="Bookmark"
                            focused={focused}
                        />
                    )
                }}

            />
            <Tabs.Screen name="create"
                options={{
                    title: "Create",
                    headerShown: false,
                    tabBarIcon: ({
                        color, focused
                    }) => (
                        <TabIcon icon={icons.home} color={color} name="Create"
                            focused={focused}
                        />
                    )
                }}

            />
            <Tabs.Screen name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({
                        color, focused
                    }) => (
                        <TabIcon icon={icons.home} color={color} name="Profile"
                            focused={focused}
                        />
                    )
                }}

            />


        </Tabs>
        // <View>My first text</View>
    )
}

export default TabsLayout