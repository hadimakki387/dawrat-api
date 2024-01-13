import { useGetUserQuery } from "@/core/rtk-query/user";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useGetPublicDocumentsByIdQuery } from "@/core/rtk-query/public";

function PublicAuthGuard({ children }: { children: React.ReactNode }) {
  const id = Cookies.get("dawratUserId");
  const { data, isSuccess } = useGetUserQuery(id as string);
  const router = useRouter();
  const params = useParams()
  const docId = params?.id
  const {data:getDocument} = useGetPublicDocumentsByIdQuery(docId as string,{
    skip:!docId
  })
  useLayoutEffect(() => {
    if (data && isSuccess && (!docId || !getDocument)) {
      router.push("/");
    }
    if(data && isSuccess && (docId && getDocument)){
      router.push(`/pdf/${docId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);
  return <div>{children}</div>;
}

export default PublicAuthGuard;
