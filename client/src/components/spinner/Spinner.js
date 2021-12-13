import React from 'react'
import Loader from "react-loader-spinner";

const Spinner = () => {
    return (
      <div className="container p-5 text-center">
        <Loader
        type="MutatingDots"
        color="#00BFFF"
        height={100}
        width={100}
        secondaryColor='#0B1340'
        timeout={3000} //3 secs
      />
      </div>
    )
}

export default Spinner
