"use client";
import { useGetPublicDocumentsByIdQuery } from "@/core/rtk-query/public";
import { useGetUserQuery } from "@/core/rtk-query/user";
import Cookies from "js-cookie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useLayoutEffect } from "react";

function PublicAuthGuard({ children }: { children: React.ReactNode }) {
  const id = Cookies.get("dawratUserId");
  const { data, isSuccess } = useGetUserQuery(id as string);
  const router = useRouter();
  const params = useParams()
  const docId = params?.id
  const {data:getDocument} = useGetPublicDocumentsByIdQuery(docId as string,{
    skip:!docId
  })
  const searchParams = useSearchParams()
  const param = searchParams?.get("solution")
  console.log(param)
  useLayoutEffect(() => {
    if(data && isSuccess && (docId && getDocument)){
      console.log("entered")
      if(param==="true"){
        console.log("has params")
        router.push(`/solutions/${docId}`)
        return
      }
      router.push(`/pdf/${docId}`)
      return
    }
    if (data && isSuccess && (!docId || !getDocument)) {
      router.push("/");
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);
  return <div>{children}</div>;
}

export default PublicAuthGuard;
