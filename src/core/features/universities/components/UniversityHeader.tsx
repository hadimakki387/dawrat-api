import { UniversityInterface } from '@/backend/modules/universities/universities.interface'
import SearchInput from '@/components/global/SearchInput'
import React from 'react'

type Props = {
    University?:UniversityInterface
}

function UniversityHeader({University}: Props) {
  return (
    <div
      className="min-w-full h-56 md:h-80 bg-cover bg-center bg-no-repeat  md:px-60 pt-8 text-white UniversityHeader"
      >
        <div className="space-y-6">
          <div className="text-3xl font-bold">Lebanese University</div>
          <div className="text-3xl font-bold">LU</div>
          <div>
            <SearchInput placeholder="Search For Course Or Document in this University..." padding="md:p-5 p-2"/>
          </div>
        </div>
      </div>
  )
}

export default UniversityHeader