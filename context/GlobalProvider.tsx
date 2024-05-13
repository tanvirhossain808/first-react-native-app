import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";



type userContext = {
    isLoggedIn: boolean,
    isMarked: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    user: any,
    setUser: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    setIsMarked: React.Dispatch<React.SetStateAction<boolean>>

}

const GlobalContext = createContext<userContext>({} as userContext)

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isMarked, setIsMarked] = useState(false)
    const [user, setUser] = useState<null | any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true)
                    setUser(res)
                }
                else {
                    setIsLoading(false)
                    setUser(null)
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }, [])
    console.log(user);
    return (
        <GlobalContext.Provider value={
            {
                isLoggedIn,
                setIsLoading,
                user,
                setUser,
                isLoading,
                setIsLoggedIn,
                isMarked,
                setIsMarked
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}


