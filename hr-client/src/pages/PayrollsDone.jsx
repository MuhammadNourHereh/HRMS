import React from 'react'
import { useNavigate } from 'react-router-dom'

const PayrollsDone = () => {
    const navigate = useNavigate()
    return (
        <div className='margin-left center container'>
            <div className="center column">
                <div className='circle center'>
                    <img className='fill-image' src="/check.svg" alt="check" />
                </div>
                <p className='big-text'>Payrolls Done!</p>
                <p className='small-text'>Your employees will receive their payments soon</p>
                <button className='btn-btn'
                    onClick={() => navigate("/")}>Go to home screen</button>
            </div>
        </div>
    )
}

export default PayrollsDone
