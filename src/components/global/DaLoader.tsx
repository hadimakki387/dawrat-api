import { CircularProgress, CircularProgressProps } from '@mui/material'
import React from 'react'

function DaLoader({...rest}:CircularProgressProps) {
  return (
    <div>
        <CircularProgress {...rest}/>
    </div>
  )
}

export default DaLoader