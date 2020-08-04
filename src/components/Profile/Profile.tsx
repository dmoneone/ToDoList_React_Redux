import React, { FC, useEffect } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'
import { GlobalState } from '../../redux/redux_store'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/profileReducer'
import ProfileCard from './ProfileCard/ProfileCard'

type MapDispatch = {
    getProfile: () => void
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
            <ProfileCard user={props.user}/>
        </>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    user: state.profileReducer.user
})
//@ts-ignore
export default connect(mapStateToProps, {getProfile})(withAuthRedirect(Profile))

