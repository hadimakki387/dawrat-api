import { useGetSingleSolutionQuery } from '@/core/rtk-query/solutions'
import { useParams } from 'next/navigation'
import React from 'react'
import ViewSolutionPage from './ViewSolutionPage'

type Props = {}

function Solution({}: Props) {

  return (
    <div>
        <ViewSolutionPage/>
    </div>
  )
}

export default Solution