import {
  faAngleDown,
  faBars,
  faGear,
  faSearch,
  faSignOut,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import DaPopOver from "../global/DaPopOver";
import DaSearch from "../global/DaSearch/DaSearch";
import ProfileAvatar from "../global/ProfileAvatar";
import { useDispatch } from "react-redux";
import { setToggle, setUser } from "@/core/features/global/redux/global-slice";
import { NavItems } from "@/services/NavItems";
import { CircularProgress } from "@mui/material";
import { useLogoutMutation } from "@/core/rtk-query/user";
import { toast } from "sonner";
import Image from "next/image";

function HomeNavBar() {
  const path = usePathname();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const search = params?.search;
  const dispatch = useDispatch();
  const Items = NavItems();
  const showSearch = searchParams.get("showSearch");
  const newUrl = new URLSearchParams(searchParams.toString());
  const [logout] = useLogoutMutation();

  return (
    <>
      {showSearch ? (
        <div className="p-6 flex items-center gap-2 fixed w-full">
          <div className="w-full">
            <DaSearch
              defaultValue={search ? (search as string) : ""}
              padding=""
              handleSubmit={(search) => {
                router.push(`/search/${search}`);
              }}
            />
          </div>
          <FontAwesomeIcon
            icon={faX}
            size="sm"
            onClick={() => {
              newUrl.delete("showSearch");
              router.push(`?${newUrl.toString()}`);
            }}
          />
        </div>
      ) : (
        <nav className="flex items-center justify-between border-b-2 border-neutral-300  h-[10vh] bg-white fixed w-full px-6 z-20 ">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                {Items ? (
                  <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => {
                      dispatch(setToggle(true));
                    }}
                    className=" relative top-[1.5px] "
                  />
                ) : (
                  <CircularProgress size={20} className="" />
                )}
              </div>
              <div
                className={`text-xl font-bold flex items-center ${
                  path !== "/" ? "w-[13vw]" : ""
                }`}
              >
                <Image
                  src={`/logo/primary.png`}
                  alt="dawrat-logo"
                  width={500}
                  height={500}
                  className="w-14 hover:cursor-pointer"
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </div>
            </div>
            {path !== "/" && (
              <div className="w-[20vw] max-sm:hidden">
                <DaSearch
                  defaultValue={search ? (search as string) : ""}
                  padding=""
                  handleSubmit={(search) => {
                    router.push(`/search/${search}`);
                  }}
                />
              </div>
            )}
            <div className="flex items-center gap-4 max-sm:hidden">
              <p
                className="text-subTitleText hover:cursor-pointer hover:text-primary transition-all duration-500 font-semibold"
                onClick={() => {
                  router.push("/universities");
                }}
              >
                Universities
              </p>
              <p
                className="text-subTitleText hover:cursor-pointer hover:text-primary transition-all duration-500 font-semibold"
                onClick={() => {
                  router.push("/questions");
                }}
              >
                AI Questions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <div className="sm:hidden">
              <FontAwesomeIcon
                icon={faSearch}
                onClick={() => {
                  newUrl.set("showSearch", "true");
                  router.push(`?${newUrl.toString()}`);
                }}
              />
            </div>
            <DaPopOver
              open={true}
              menuItems={[
                {
                  name: "Profile",
                  onClick: () => {
                    router.push("/profile");
                  },
                  icon: (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-subTitleText"
                    />
                  ),
                },
                {
                  name: "Settings",
                  onClick: () => router.push("/settings"),
                  icon: (
                    <FontAwesomeIcon
                      icon={faGear}
                      className="text-subTitleText"
                    />
                  ),
                },
                {
                  name: "Logout",
                  onClick: () => {
                    Cookie.remove("dawratUserId");
                    const id = toast.loading("Logging you out...");
                    logout()
                      .unwrap()
                      .then(() => {
                        toast.dismiss(id);
                        toast.success("See you soon!");
                        dispatch(setUser(null));
                        router.push("/home");
                      })
                      .catch((e) => {
                        toast.dismiss(id);
                        toast.error("OOPS! something went wrong.");
                      });
                  },
                  icon: <FontAwesomeIcon icon={faSignOut} />,
                },
              ]}
            >
              <div className="flex items-center gap-4 relative">
                <ProfileAvatar />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="text-subTitleText"
                />
              </div>
            </DaPopOver>
          </div>
        </nav>
      )}
    </>
  );
}

export default HomeNavBar;
