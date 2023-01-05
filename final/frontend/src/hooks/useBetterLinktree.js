import { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { GET_USER_QUERY } from "../graphql/queries";
import { USER_UPDATED_SUBSCRIPTION } from "../graphql/subscriptions";

const BetterLinktreeProvider = (props) => {
    const [isLogIn, setIsLogIn] = useState(JSON.parse(localStorage.getItem('SAVE_LOG_IN_STATE')));
    const [userEmail, setUserEmail] = useState(JSON.parse(localStorage.getItem('SAVE_USER_EMAIL_STATE')));
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('SAVE_USER_NAME_STATE')));
    const [userData, setUserData] = useState();
    const [menuListSelected, setMenuListSelected] = useState(JSON.parse(localStorage.getItem('SAVE_MENU_LIST_SELECTED_STATE')))

    const { data: queryUserData } = useQuery(
        GET_USER_QUERY,
        {
            variables: {
                email: userEmail
            }
        }
    )

    const { data: subscriptionUserData } = useSubscription(
        USER_UPDATED_SUBSCRIPTION,
        {
            variables: {
                email: userEmail
            }
        }
    )

    useEffect(() => {
        console.log(queryUserData)
        if (queryUserData) setUserData(queryUserData)
    }, [queryUserData])

    useEffect(() => {
        if (subscriptionUserData) {
            if (subscriptionUserData.user.email === userEmail)
                setUserData(subscriptionUserData)
        }
    }, [subscriptionUserData])

    useEffect(() => {
        localStorage.setItem('SAVE_LOG_IN_STATE', JSON.stringify(isLogIn))
    }, [isLogIn])

    useEffect(() => {
        localStorage.setItem('SAVE_USER_EMAIL_STATE', JSON.stringify(userEmail))
    }, [userEmail])

    useEffect(() => {
        localStorage.setItem('SAVE_USER_NAME_STATE', JSON.stringify(userName))
    }, [userName])

    useEffect(() => {
        localStorage.setItem('SAVE_MENU_LIST_SELECTED_STATE', JSON.stringify(menuListSelected))
    }, [menuListSelected])

    return (
        <BetterLinktreeContext.Provider
            value={{
                isLogIn, setIsLogIn,
                userEmail, setUserEmail,
                userName, setUserName,
                userData, setUserData,
                menuListSelected, setMenuListSelected,
            }}
            {...props}
        />
    )
}

const BetterLinktreeContext = createContext();

const useBetterLinktree = () => {
    return useContext(BetterLinktreeContext);
}

export { BetterLinktreeProvider, useBetterLinktree }