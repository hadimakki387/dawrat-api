import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useGetUserQuery } from "@/core/rtk-query/auth";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/global/loading screen/LoadingScreen";
// i want to disable eslint in the useEffect hook so i dont get the warning

function PrivateAuthGuard({ children }: { children: React.ReactNode }) {
  const id = Cookies.get("dawratUserId");
  const { data, isSuccess, isLoading, isError } = useGetUserQuery(id);
  const router = useRouter();
  useLayoutEffect(() => {
    if (!data && isError) {
      console.log("unauthorized")
      router.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess,isError,isLoading]);

  return (
    <>{isSuccess ? <div>{children}</div> : isLoading && <LoadingScreen />}</>
  );
}

export default PrivateAuthGuard;
