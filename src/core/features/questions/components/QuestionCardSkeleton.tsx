import CheckWithFlower from '@/components/SVGs/CheckWithFlower'
import DaCard from '@/components/SVGs/DaCard'
import Folder from '@/components/SVGs/Folder'
import Institution from '@/components/SVGs/Institution'
import DaButton from '@/components/global/DaButton'
import { Divider, Skeleton } from '@mui/material'
import React from 'react'

function QuestionCardSkeleton() {
  return (
    <DaCard className="space-y-4">
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div>
          <Skeleton variant="circular" width={40} height={40} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-darkText font-semibold">
          <Skeleton  width={100}/>
          </div>
          <div className="text-sm text-subTitleText">
            <Skeleton  width={100}/>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 max-sm:hidden">
        <div className="text-darkText font-semibold">
         
          <Skeleton  width={100}/>
        </div>
        <Skeleton  width={100}/>
      </div>
    </header>
    <Divider />

    <div className="text-titleText">
    <Skeleton  width={100}/>
      <span className="text-darkText font-semibold"><Skeleton  width={100}/></span>
    </div>
    <div className="text-titleText"><Skeleton  width={"100%"}/></div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-darkText font-semibold text-sm">
        <div><Skeleton  width={100}/></div>
      </div>
      <div className="flex items-center gap-2 text-darkText font-semibold text-sm">
        
        <div><Skeleton  width={100}/></div>
      </div>
    </div>
    <div className="flex items-center gap-4 text-darkText font-semibold text-lg">
      {" "}
      <Skeleton  width={100}/>
    </div>
    <div>
      {" "}
      <div
        className="text-titleText font-medium"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {Array(10).fill(10).map((line, index) => (
          <React.Fragment key={index}>
            <Skeleton  width={"100%"}/>
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  </DaCard>
  )
}

export default QuestionCardSkeleton