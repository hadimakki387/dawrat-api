import AutoCompleteSearch from '@/components/global/AutoCompleteSearch'
import React from 'react'

function SearchHeader() {
  return (
    <div className="w-full flex items-center mb-4 gap-4">
    <div className="w-1/4">
      <AutoCompleteSearch
        data={[{ title: "data", id: "fjhkjg" }]}
        placeholder="Search for your university"
        setSearch={() => {}}
        setSelectedItem={() => {}}
        style={{ borderRadius: "0.7rem" }}
        className="mr-4 p-1"
        name="university"
        label="University filter"
        // formik={formik}
      />
    </div>
    <div className="w-1/4">
      <AutoCompleteSearch
        data={[{ title: "data", id: "fjhkjg" }]}
        placeholder="Search Course"
        setSearch={() => {}}
        setSelectedItem={() => {}}
        style={{ borderRadius: "0.7rem" }}
        className="mr-4 p-1"
        name="university"
        label="Course filter"
        // formik={formik}
      />
    </div>
    <div className="w-1/4">
      <AutoCompleteSearch
        data={[{ title: "data", id: "fjhkjg" }]}
        placeholder="Filter by category"
        setSearch={() => {}}
        setSelectedItem={() => {}}
        style={{ borderRadius: "0.7rem" }}
        className="mr-4 p-1"
        name="university"
        label="Category filter"
        // formik={formik}
      />
    </div>
    <div className="w-1/4">
      <AutoCompleteSearch
        data={[{ title: "data", id: "fjhkjg" }]}
        placeholder="Filter By Language"
        setSearch={() => {}}
        setSelectedItem={() => {}}
        style={{ borderRadius: "0.7rem" }}
        className="mr-4 p-1"
        name="university"
        label="Language filter"
        // formik={formik}
      />
    </div>
  </div>
  )
}

export default SearchHeader