"use client"
import React from 'react'

type Props = {}

async function TestFetch({}: Props) {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    console.log("test fetch")
    console.log(await data.json())
  return (
    <div>TestFetch</div>
  )
}

export default TestFetch