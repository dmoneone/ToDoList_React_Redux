import React, { FC } from 'react'
import c from './ProfileCard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile } from '../../../redux/selectors/ProfileCardSelectors'
import { setAvatar } from '../../../redux/profileReducer'
import Preloader from '../../Preloader/Preloader'

type Props = {

}

const ProfileCard: FC<Props> = (props) => {

    const user = useSelector(getProfile)
    const dispatch = useDispatch()

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files != null && e.target.files.length) {
            dispatch(setAvatar(e.target.files[0]))
        } 
    }

    return (
        <div>
            <div className={c.card}>
                <div className={c.card_header}>
                    {
                        user.avatarUrl ? <img src={user.avatarUrl as string}/> : <Preloader/>
                    }
                </div>
                <div className={c.card_content}>
                    <input className={c.file} type='file' onChange={e => onChangeFile(e)} accept='.jpg,.jpeg,.png'/>
                    <h3>{user.name}</h3>
                    <h4>{user.userId}</h4>
                    <p>{user.email}</p>
                </div>
                <div className={c.card_footer}>
                    <ul>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/in/dmitry-kirilenko-007a40165/">App created by dmoneone</a>
                        <a target="_blank" href="https://github.com/dmoneone">Author's Github</a>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard