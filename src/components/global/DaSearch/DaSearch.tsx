"use client"
import React, { useEffect } from "react";
import "./index.css";
import { useFormik } from "formik";
import * as Yup from "yup";

//add the same props here as in searchInput.tsx
interface Props {
  placeholder?: string;
  className?: string;
  padding?: string;
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (search: string) => any;
  defaultValue?: string;
}

function DaSearch({
  placeholder = "search ...",
  padding = "p-2",
  handleSubmit,
    defaultValue
}: Props) {
  const formik = useFormik({
    validationSchema: Yup.object({
      search: Yup.string(),
    }),
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      if (handleSubmit) handleSubmit(values.search);
    },
  });
  useEffect(() => {
    if (defaultValue) {
      formik.setFieldValue("search", defaultValue);
    }
  }, []);
  return (
    <form
      aria-label="Courses, books, or documents"
      className={`_e1f367dfc208 _f04bf322e3f3 snipcss-h6A3v  ${padding}`}
      onSubmit={(e) => {
        e.preventDefault()
        formik.handleSubmit()
      }}
    >
      <input
        type="search"
        placeholder={placeholder}
        data-hj-whitelist="true"
        spellCheck="true"
        className="_ccbdb6025af7 _f04bf322e3f3 p-2"
        name="search"
        value={formik.values.search}
        onChange={(e)=>formik.handleChange(e)}
        onBlur={(e)=>formik.handleBlur(e)}
       
      />
      <span className="_b5480744d655 _f04bf322e3f3">
        <button
          className="_9862b2b6a967 _c157be3cb088 _1ee6d659bd43"
          type="submit"
          data-test-selector="big-search-bar-input-submit-button"
          aria-label="Search"
          onClick={() => formik.handleSubmit()}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="magnifying-glass"
            className="svg-inline--fa fa-magnifying-glass fa-fw _db78be352894 _6d88284663af"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="var(--title-text)"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            ></path>
          </svg>
        </button>
      </span>
    </form>
  );
}

export default DaSearch;
