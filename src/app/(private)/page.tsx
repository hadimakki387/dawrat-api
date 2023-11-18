import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomePage from '@/core/features/HomePage/HomePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <HomePage/>
  )
}
