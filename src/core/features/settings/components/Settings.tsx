import DaCard from '@/components/SVGs/DaCard'
import { Divider } from '@mui/material'
import React from 'react'
import Account from './Account'
import Study from './Study'
import ChangePassword from './ChangePassword'
import AddDomainDialog from '../../Upload/components/AddDomainDialog'

function Settings() {
  return (
    <DaCard className='m-12 max-md:my-4 max-md:mx-0 space-y-4'>
        <div className='text-black font-bold text-2xl'>Settings</div>
        <AddDomainDialog/>
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