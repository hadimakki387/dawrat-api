"use client";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useGetUserQuery } from "@/core/rtk-query/user";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/global/loading screen/LoadingScreen";
import { useDispatch } from "react-redux";
import { setUser } from "@/core/features/global/redux/global-slice";
// i want to disable eslint in the useEffect hook so i dont get the warning

function PrivateAuthGuard({ children }: { children: React.ReactNode }) {
  const id = Cookies.get("dawratUserId");
  const { data, isSuccess, isLoading, isError } = useGetUserQuery(id as string);
  const router = useRouter();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!data && isError) {
      router.push("/home");
    }
    if (isSuccess) {
      dispatch(setUser(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess, isError, isLoading]);

  return (
    <>{isSuccess ? <div>{children} </div> : isLoading && <LoadingScreen />}</>
  );
}

export default PrivateAuthGuard;
