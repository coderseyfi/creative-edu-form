import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Spinner = () => {
  return (
    <div className="spinner">
      <ScaleLoader
        color="#2985E2"
        cssOverride={{}}
        height={200}
        margin={4}
        radius={2}
        speedMultiplier={1.5}
        width={6}
      />
    </div>
  )
}

export default Spinner
