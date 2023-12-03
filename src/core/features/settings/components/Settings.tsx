import DaCard from '@/components/SVGs/DaCard'
import { Divider } from '@mui/material'
import React from 'react'
import Account from './Account'
import Study from './Study'
import ChangePassword from './ChangePassword'

function Settings() {
  return (
    <DaCard className='m-12 space-y-4'>
        <div className='text-black font-bold text-2xl'>Settings</div>
        <Divider/>
        <Account/>
        <Divider/>
        <Study/>
        <Divider/>
        <ChangePassword/>
    </DaCard>
  )
}

export default Settings