import {
  faAngleDown,
  faBars,
  faGear,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";
import { useParams, usePathname, useRouter } from "next/navigation";
import DaPopOver from "../global/DaPopOver";
import DaSearch from "../global/DaSearch/DaSearch";
import ProfileAvatar from "../global/ProfileAvatar";
import { useDispatch } from "react-redux";
import { setToggle } from "@/core/features/global/redux/global-slice";
import { NavItems } from "@/services/NavItems";
import { CircularProgress } from "@mui/material";

function HomeNavBar() {
  const path = usePathname();
  const router = useRouter();
  const params = useParams();
  const search = params?.search;
  const dispatch = useDispatch();
  const Items = NavItems();

  return (
    <>
      <div className="w-full flex items-center justify-center bg-primary text-sm text-white font-semibold fixed to-pink-200 z-30">
        The Website Is Still Under Development
      </div>
      <nav className="flex items-center justify-between border-b-2 border-neutral-300  h-[10vh] bg-white fixed w-full px-6 z-20 ">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            {Items ? (
              <div className="md:hidden">
                <FontAwesomeIcon
                  icon={faBars}
                  onClick={() => {
                    dispatch(setToggle(true));
                  }}
                />
              </div>
            ) : (
              <div className="md:hidden">
                <CircularProgress />
              </div>
            )}
            <div
              className={`text-xl font-bold ${path !== "/" ? "w-[13vw]" : ""}`}
            >
              Dawrat
            </div>
          </div>
          {path !== "/" && (
            <div className="w-[20vw]">
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
            <p className="text-subTitleText ">Universities</p>
            <p className="text-subTitleText ">Books</p>
            <p className="text-primary ">AI Questions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
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
                  Cookie.remove("dawratToken");
                  window.location.reload();
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
    </>
  );
}

export default HomeNavBar;
