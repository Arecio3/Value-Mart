import React from 'react'
import UserNav from '../../components/nav/UserNav'

const History = ({theme}) => {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <UserNav theme={theme}/>
                </div>
                <div className="col">user page</div>
            </div>
        </div>
    )
}

export default History
 