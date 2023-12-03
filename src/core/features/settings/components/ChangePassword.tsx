import DaButton from '@/components/global/DaButton'
import TextFieldComponent from '@/components/global/TextFieldComponent'
import React from 'react'

function ChangePassword() {
  return (
    <div className="space-y-6 w-[25rem]">
      <h2 className="text-xl text-titleText font-medium">Change Password</h2>
      <div className="mb-4">
        <p className="text-titleText mb-2">Old Password</p>
        <TextFieldComponent placeholder='Old Password ...'/>
      </div>
      <div className="mb-4">
        <p className="text-titleText mb-2">New Password</p>
        <TextFieldComponent placeholder='New Password ...'/>
      </div>
      <div className="mb-4">
        <p className="text-titleText mb-2">Confirm New Password</p>
        <TextFieldComponent placeholder='Confirm New Password ...'/>
      </div>
      <DaButton label="Submit" className="bg-primary text-white font-semibold w-full" fullRounded/>

    </div>
  )
}

export default ChangePassword