import React, { FC } from 'react'
import { withAuthRedirect } from '../../hocs/withAuth'

const List: FC<any> = (props) => {
    return (
        <div>List</div>
    )
}

export default withAuthRedirect(List)