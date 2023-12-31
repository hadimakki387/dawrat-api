import { useGetUserQuery } from "@/core/rtk-query/user";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function PublicAuthGuard({ children }: { children: React.ReactNode }) {
  const id = Cookies.get("dawratUserId");
  const { data, isSuccess } = useGetUserQuery(id as string);
  const router = useRouter();
  useLayoutEffect(() => {
    if (data && isSuccess) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);
  return <div>{children}</div>;
}

export default PublicAuthGuard;
