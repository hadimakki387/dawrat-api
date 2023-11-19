import React from "react";
import "./MenuItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItem = ({ icon: Icon, title, action, isActive = null }: any) => {
  return (
    <button
      className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
      onClick={action}
      title={title}
    >
      {title === "Heading 1" ? (
        <Icon />
      ) : title === "Heading 2" ? (
        <Icon />
      ) : Icon ? (
        <FontAwesomeIcon icon={Icon} fill={"white"} />
      ) : (
        ""
      )}
      {/* <svg className="remix">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg> */}
    </button>
  );
};

export default MenuItem;
