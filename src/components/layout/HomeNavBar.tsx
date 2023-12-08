import {
  faAngleDown,
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

function HomeNavBar() {
  const path = usePathname();
  const router = useRouter();
  const params = useParams();
  const search = params?.search;


  return (
    <nav className="flex items-center justify-between border-b-2 border-neutral-300  h-[10vh] bg-white fixed w-full px-6 z-20 ">
      <div className="flex gap-4 items-center">
        <div className={`text-xl font-bold ${path !== "/" ? "w-[13vw]" : ""}`}>
          Dawrat
        </div>
        {path !== "/" && (
          <div className="w-[20vw]">
            <DaSearch
              defaultValue={search ? search as string : ""}
              padding=""
              handleSubmit={(search) => {
                router.push(`/search/${search}`);
              }}
            />
          </div>
        )}
        <div className="flex items-center gap-4">
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
                <FontAwesomeIcon icon={faUser} className="text-subTitleText" />
              ),
            },
            {
              name: "Settings",
              onClick: () => router.push("/settings"),
              icon: (
                <FontAwesomeIcon icon={faGear} className="text-subTitleText" />
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
            <FontAwesomeIcon icon={faAngleDown} className="text-subTitleText" />
          </div>
        </DaPopOver>
      </div>
    </nav>
  );
}

export default HomeNavBar;
