import { useGetUserQuery } from '@/core/rtk-query/auth'
import React, { useLayoutEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function PublicAuthGuard({children}:{children:React.ReactNode}) {
    const id = Cookies.get("dawratUserId")
    const {data,isSuccess} = useGetUserQuery(id)
    const router = useRouter()
    useLayoutEffect(()=>{
      if(data && isSuccess){
        router.push("/")
      } 
    },[data,isSuccess])
  return (
    <div>
        {children}
    </div>
  )
}

export default PublicAuthGuard