import React, { ComponentType, FC } from 'react'
import { GlobalState } from '../redux/redux_store';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';

const mapStateToProps = (state: GlobalState) => ({
    isAuth: state.authReducer.isAuth
})

type Props = {
    isAuth: boolean
}

export const withAuthRedirect = (Component: FC<any>) => {
    class RedirectComponent extends React.Component<Props, {}> {
        render() {
            if(!this.props.isAuth) return <Redirect to='/auth/login'/>
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps)(RedirectComponent)
}