import React, { FC } from 'react'
import { Item } from '../../../redux/listReducer'
import id from 'shortid'
import c from './Paginator.module.css'

type Props = {
    list: Array<Item>,
    getList: (page: number) => void,
    pageCount: number
}

const Paginator: FC<Props> = (props) => {
    const { list, getList, pageCount  } = props
    const pages = []
    for(let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <>
            <ul className={c.btn_list}>
                { pages.length > 1 && pages.map(i => <li key={id.generate()} onClick={ () => getList(i) }><button className="btn primary">{i}</button></li>) }
            </ul>
        </>
    )
}

export default Paginator