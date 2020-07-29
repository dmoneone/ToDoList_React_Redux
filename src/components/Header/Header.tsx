import React, { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalState } from '../../redux/redux_store'
import { withAuthRedirect } from '../../hocs/withAuth';
import { actions, getLogout } from '../../redux/authReducer';

type MapState = {
    isAuth: boolean
}

type MapDispatch = {
    getLogout: () => void
}

type Props = MapState & MapDispatch

const Header: FC<Props> = (props) => {
    
    return (
        <div className='header'>
            <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">To Do List</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><NavLink to='/list'>List</NavLink></li>
                {props.isAuth && <li><NavLink to='/auth/logout' onClick={props.getLogout}>logout</NavLink></li>}
                {!props.isAuth && <li><NavLink to='/auth/login'>login/register</NavLink></li>}
            </ul>
            </div>
        </nav>
        </div>
    )
}

const mapStateToProps = (state: GlobalState): MapState => ({
    isAuth: state.authReducer.isAuth
})

export default connect<MapState, MapDispatch, {}, GlobalState>(mapStateToProps, {getLogout})(Header)