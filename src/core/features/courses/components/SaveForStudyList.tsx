import DaDialog from "@/components/global/DaDialog";
import { useAppSelector } from "@/core/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { setSaveCourseDialog } from "../redux/courses-slice";
import { Checkbox } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrashCan, faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import TextFieldComponent from "@/components/global/TextFieldComponent";
import DaButton from "@/components/global/DaButton";
import {
  useCreateStudylistMutation,
  useDeleteStudylistMutation,
  useGetStudylistQuery,
  useUpdateStudylistMutation,
} from "@/core/rtk-query/user";
import { generateToast, updateToast } from "@/services/global-function";
import { ToastType } from "@/services/constants";
import { StudylistInterface } from "@/backend/modules/studylist/studylist.interface";

type Props = {};

function SaveForStudyListDialog({}: Props) {
  const { selectedDocInCourse, saveCourseDialog } = useAppSelector(
    (state) => state.courses
  );
  const { user } = useAppSelector((state) => state.global);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const { data: Studylist, isLoading: loadingStudylist } = useGetStudylistQuery(
    user?.id as string,
    {
      skip: !saveCourseDialog,
    }
  );

  const [updateStudyList] = useUpdateStudylistMutation();
  const [createStudyList] = useCreateStudylistMutation();
  const [deleteStudyList] = useDeleteStudylistMutation();

  const handleCreateStudyList = () => {
    const id = generateToast({
      message: "Creating Studylist...",
      toastType: ToastType.default,
      isLoading: true,
    });
    createStudyList({
      body: {
        title: params.get("studylistName") as string,
      },
      id: user?.id as string,
    })
      .unwrap()
      .then((res) => {
        updateToast(id, "Studylist Created", {
          toastType: ToastType.success,
          isLoading: false,
          duration: 2000,
        });
        params.delete("addStudyList");
        params.delete("studylistName");
        router.push(`?${params.toString()}`);
      })
      .catch((err) => {
        updateToast(id, `${err?.data?.message}`, {
          toastType: ToastType.error,
          isLoading: false,
          duration: 2000,
        });
      });
  };
  const handleUpdateStudyList = (item: StudylistInterface) => {
    const id = generateToast({
      message: "Saving Changes...",
      toastType: ToastType.default,
      isLoading: true,
    });
    updateStudyList({
      body: selectedDocInCourse?._id as string,
      id: item?.id as string,
      userId: user?.id as string,
    })
      .unwrap()
      .then((res) => {
        updateToast(id, "Changes Saved", {
          toastType: ToastType.success,
          isLoading: false,
          duration: 2000,
        });
      })
      .catch((err) => {
        updateToast(id, `${err?.data?.message}`, {
          toastType: ToastType.error,
          isLoading: false,
          duration: 2000,
        });
      });
  };
  const handleDeleteStudyList = (item: StudylistInterface) => {
    const id = generateToast({
      message: "Deleting Studylist...",
      toastType: ToastType.default,
      isLoading: true,
    });
    deleteStudyList({
      userId: user?.id as string,
      id: item.id,
    })
      .unwrap()
      .then((res) => {
        updateToast(id, "Studylist Deleted", {
          toastType: ToastType.success,
          isLoading: false,
          duration: 2000,
        });
      })
      .catch((err) => {
        updateToast(id, `${err?.data?.message}`, {
          toastType: ToastType.error,
          isLoading: false,
          duration: 2000,
        });
      });
  };


  return (
    <DaDialog
      open={saveCourseDialog}
      onClose={() => {
        dispatch(setSaveCourseDialog(false));
      }}
      loading={!Studylist || loadingStudylist}
    >
      <div className="p-4 text-titleText space-y-4">
        <h1 className="text-xl text-darkText font-bold flex items-center justify-between">
          Save to a Studylist
          <FontAwesomeIcon
            icon={faX}
            size="sm"
            className="hover:cursor-pointer"
            onClick={() => {
              dispatch(setSaveCourseDialog(false));
            }}
          />
        </h1>
        <div>
          {Studylist && Studylist?.length > 0 ? (
            Studylist.map((item: StudylistInterface) => {
              const isExist = item?.documents?.includes(
                selectedDocInCourse?.id as string
              );

              return (
                <div
                  className="flex items-center justify-between"
                  key={item.id}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <Checkbox
                        sx={{
                          "&.MuiCheckbox-root": {
                            padding: "0 !important",
                          },
                        }}
                        size="small"
                        onChange={(e) => {
                          handleUpdateStudyList(item);
                        }}
                        checked={isExist}
                      />
                    </div>
                    <p className="text-lg font-medium">{item?.title}</p>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="hover:text-error hover:cursor-pointer"
                      onClick={() => {
                        handleDeleteStudyList(item);
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-lg font-medium">No Studylists, Add One</div>
          )}
        </div>
        {!params.get("addStudyList") && (
          <div
            className="flex items-center gap-2 hover:cursor-pointer"
            onClick={() => {
              params.set("addStudyList", "true");
              router.push(`?${params.toString()}`);
            }}
          >
            <div>
              <FontAwesomeIcon icon={faAdd} className="text-titleText" />
            </div>
            <div className="font-medium text-lg">Create new Studylist</div>
          </div>
        )}
        {params.get("addStudyList") && (
          <div className="flex items-center justify-between gap-2 w-full max-sm:flex-col">
            <div className="w-full flex items-center gap-2 max-sm:w-full">
              <div className="">
                <FontAwesomeIcon icon={faAdd} className="text-titleText" />
              </div>
              <div className="w-full">
                <TextFieldComponent
                  placeholder="Enter Studylist name..."
                  onChange={(e) => {
                    params.set("studylistName", e.target.value);
                    router.push(`?${params.toString()}`);
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 gap-2 flex items-center max-sm:justify-center  max-sm:w-full">
              <div className="w-1/2">
                <DaButton
                  fullRounded
                  className="bg-primary text-white w-full "
                  label="Create"
                  onClick={() => {
                    handleCreateStudyList();
                  }}
                />
              </div>
              <div className="w-1/2">
                <DaButton
                  fullRounded
                  className=" w-full"
                  label="Cancel"
                  onClick={() => {
                    params.delete("addStudyList");
                    router.push(`?${params.toString()}`);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DaDialog>
  );
}

export default SaveForStudyListDialog;
