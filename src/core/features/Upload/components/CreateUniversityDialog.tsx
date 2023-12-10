import DaDialog from '@/components/global/DaDialog'
import { useAppSelector } from '@/core/StoreWrapper'
import React from 'react'

function CreateUniversityDialog() {
  const {addUniversityDialog} = useAppSelector(state => state.upload) 
  return (
    <DaDialog open={addUniversityDialog}>
        <div className='space-y-4'>
          <div className='text-xl text-titleText'>Add University</div>
        </div>
    </DaDialog>
  )
}

export default CreateUniversityDialog