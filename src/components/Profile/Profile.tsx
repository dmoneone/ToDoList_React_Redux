import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../redux/profileReducer'
import ProfileCard from './ProfileCard/ProfileCard'
import { useCurrentPageToLocalStorage } from '../../hooks/hooks'
import { useRouteMatch } from 'react-router-dom'



type Props = {

}

const Profile: FC<Props> = (props) => {
    const urlData = useRouteMatch()
    useCurrentPageToLocalStorage(urlData.url)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    return (
        <>
            <ProfileCard />
        </>
    )
}

export default withAuthRedirect(Profile)


