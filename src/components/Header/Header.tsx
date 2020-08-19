import React, { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLogout } from '../../redux/authReducer';
import { getAuthStatus } from '../../redux/selectors/commonSelectors';
import BurgerMenu from './BurgerMenu/BurgerMenu';


type Props = {

}

const Header: FC<Props> = (props) => {
    
    return (
        <header>
            <BurgerMenu/>
            <h3>To-do list</h3>
        </header>
    )
}

export default Header