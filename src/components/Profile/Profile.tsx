import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { GlobalState } from '../../redux/redux_store'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getProfile, setAvatar } from '../../redux/profileReducer'
import ProfileCard from './ProfileCard/ProfileCard'

type MapDispatch = {
    getProfile: () => void
    setAvatar: (file: any) => void
}

type MapState = {
    user: {
        email: string | null,
        userId: string | null,
        name: string | null,
        avatarUrl: string | null,
    }
}

type Props = MapState & MapDispatch

const Profile: FC<Props> = (props) => {
    
    useEffect(() => {
        props.getProfile()
    }, [])

    return (
        <>
            <ProfileCard user={props.user} setAvatar={props.setAvatar}/>
        </>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    user: state.profileReducer.user
})
//@ts-ignore
export default connect(mapStateToProps, {getProfile, setAvatar})(withAuthRedirect(Profile))


