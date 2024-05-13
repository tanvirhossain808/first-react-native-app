import { useEffect, useState } from "react";
import { Alert } from "react-native";


const useAppWrite = (fn, setTesting) => {
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn()
            setTesting(response)
            // console.log(response);

        } catch (error) {
            Alert.alert("Error", error);
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {

        fetchData()

    }, [])
    const refetch = () => fetchData()
    return { isLoading, refetch }
};

export default useAppWrite;