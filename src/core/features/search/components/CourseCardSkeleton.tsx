import { Skeleton } from '@mui/material'
import React from 'react'

function CourseCardSkeleton() {
  return (
    <div className="min-w-1/3 max-sm:h-36 h-44 rounded-2xl border border-neutral-300 p-4 flex flex-col justify-between hover:bg-primaryBg hover:cursor-pointer">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 text-sm text-subTitleText">
          <Skeleton width={100}/>
        </div>
        <div className="text-primary text-2xl"> <Skeleton width={100}/> </div>
      </div>
      <div className="text-subTitleText"><Skeleton width={300}/></div>
    </div>
  )
}

export default CourseCardSkeleton