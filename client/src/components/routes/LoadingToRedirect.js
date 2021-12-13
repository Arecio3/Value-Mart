import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    let navigate = useNavigate()

    useEffect(() => {
        // Decremnt
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000)
        count === 0 && navigate('/')
        return () => clearInterval(interval)
    }, [navigate, count])

    return (
        <div className="redirect-container container p-5 text-center">
            <h2 className="text-danger">Must Login!</h2>
            <p>Redirecting you back in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect
