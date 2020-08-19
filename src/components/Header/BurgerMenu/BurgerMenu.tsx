import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus } from '../../../redux/selectors/commonSelectors';
import { getLogout } from '../../../redux/authReducer';

const BurgerMenu = () => {
    
    const dispatch = useDispatch()
    const isAuth = useSelector(getAuthStatus)

    const showSettings = (event: any) => {
      event.preventDefault()
    }
   

    return (
        <Menu>
          <NavLink className={"menu-item"} to='/profile'>Profile</NavLink>
          <NavLink className={"menu-item"} to='/list'>List</NavLink>
          {isAuth && <NavLink to='/auth/logout' onClick={ () => dispatch(getLogout()) }>logout</NavLink>}
          {!isAuth && <NavLink to='/auth/login'>login/register</NavLink>}
        </Menu>
    )

}

export default BurgerMenu