import React, { FC } from 'react'
import c from './ProfileCard.module.css'

type Props = {
    user: {
        email: string | null,
        userId: string | null,
        name: string | null,
        avatarUrl: string | null,
    }
}

const ProfileCard: FC<Props> = (props) => {
    const { user } = props
    return (
        <div>
            <div className={c.card}>
                <div className={c.card_header}>
                    <img src={props.user.avatarUrl as string}/>
                </div>
                <div className={c.card_content}>
                    <h3>{user.name}</h3>
                    <h4>{user.userId}</h4>
                    <p>{user.email}</p>
                </div>
                <div className={c.card_footer}>
                    <ul>
                    <li>
                        <a href="#">Footer</a>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard