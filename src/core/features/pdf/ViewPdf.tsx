
import React from 'react'


function ViewPdf() {
 
    const url = "https://utfs.io/f/16bba07c-a46e-46a1-af3a-19da34925b7c-9l9cjg.pdf"

  return (
    <div>
        <iframe src={url}  width="100%" height="600px" />
    </div>
  )
}

export default ViewPdf