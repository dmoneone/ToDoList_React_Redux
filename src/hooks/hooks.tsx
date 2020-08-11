import { useSelector } from "react-redux";
import React from 'react'
import { getAuthStatus } from "../redux/selectors/commonSelectors";
import { Redirect } from "react-router-dom";


export function useAuthRedirect() {
    const isAuth = useSelector(getAuthStatus)

    if(!isAuth) return Redirect
    return null
}