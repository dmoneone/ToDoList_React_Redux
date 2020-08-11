import React, { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLogout } from '../../redux/authReducer';
import { getAuthStatus } from '../../redux/selectors/commonSelectors';


type Props = {

}

const Header: FC<Props> = (props) => {
    
    const dispatch = useDispatch()
    const isAuth = useSelector(getAuthStatus)

    return (
        <div className='header'>
            <nav>
            <div className="nav-wrapper">
            <a href="#" className="brand-logo">To Do List</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><NavLink to='/list'>List</NavLink></li>
                {isAuth && <li><NavLink to='/auth/logout' onClick={ () => dispatch(getLogout()) }>logout</NavLink></li>}
                {!isAuth && <li><NavLink to='/auth/login'>login/register</NavLink></li>}
            </ul>
            </div>
        </nav>
        </div>
    )
}

export default Header