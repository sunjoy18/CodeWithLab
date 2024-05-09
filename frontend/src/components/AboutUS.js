import React from 'react'
import about from './Our-Mission.pdf'
const AboutUS = () => {
  return (
    <div>
      <iframe
        src={`${about}#toolbar=0`}
        style={{ width: "100%", maxWidth: "100%", height: "750px" }}
        type="application/pdf"
        allow="fullscreen"
        title="about"
      ></iframe>
    </div>
  )
}

export default AboutUS
