import React, { FC } from 'react'
import c from './ProfileCard.module.css'

type Props = {
    user: {
        email: string | null,
        userId: string | null,
        name: string | null
    }
}

const ProfileCard: FC<Props> = (props) => {
    const { user } = props
    return (
        <div>
            <div className={c.card}>
                <div className={c.card_header}>
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/3b/f0/77/3bf0775b0d234545d14a5941be966ab2.jpg"/>
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