import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../redux/profileReducer'
import ProfileCard from './ProfileCard/ProfileCard'



type Props = {

}

const Profile: FC<Props> = (props) => {
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


