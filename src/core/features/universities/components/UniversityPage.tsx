"use client"
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

function UniversityPage({}: Props) {
    const id = useParams()?.id
  return (
    <div>{id}</div>
  )
}

export default UniversityPage