import React from 'react'
import feature from './Features.pdf'
const FeaturePage = () => {
  return (
    <div >
      <iframe
        src={`${feature}#toolbar=0`}
        style={{ width: "100%", maxWidth: "100%", height: "750px" }}
        type="application/pdf"
        allow="fullscreen"
        title="Features"
      ></iframe>

    </div>
  )
}

export default FeaturePage
