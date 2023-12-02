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
      { title === "Heading 1" ? (
        <Icon fill="var(--title-text)"/>
      ) :title === "Heading 2" ? (
        <Icon fill="var(--title-text)"/>
      ): Icon ? (
        <FontAwesomeIcon icon={Icon} className="text-titleText" />
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
