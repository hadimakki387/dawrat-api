import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function MyBooks() {
  return (
    <div className="space-y-1">
      <h1 className="text-darkText font-bold text-2xl tracking-wide ">
        My books
      </h1>
      <div className="flex items-center gap-4 bg-primaryBg p-4 text-primary rounded-lg">
        <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-lg">
          <div className="bg-white w-4 h-4 flex items-center justify-center rounded-lg">
            <FontAwesomeIcon
              icon={faExclamation}
              className="text-primary text-sm"
            />
          </div>
        </div>
        <p className="text-darkText">
          You are not following any books yet. Use the search bar to find your
          books and follow them.
        </p>
      </div>
    </div>
  );
}

export default MyBooks;
