import React, { FC } from 'react'
import preloader from '../../assets/preloader/2.gif'
import c from './Preloader.module.css'

const Preloader: FC<any> = props => {
    return (
        <div className={c.preloader}>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader