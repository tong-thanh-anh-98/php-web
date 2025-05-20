import React from 'react'

const Notate = ({ text = 'Data not found.' }) => {
    return (
        <div className='text-center py-5'>{text}</div>
    )
}

export default Notate