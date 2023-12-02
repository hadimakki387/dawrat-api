
export const returnData =(data:any)=>{
  const {_id, ...newData} = data
  return {
    id:_id,
    ...newData._doc
  }
}

export const returnArrayData = (data:any)=>{

  const newData = data.map((item:any)=>{
    const {_id, ...newData} = item
    return {
      id:_id,
      ...newData._doc
    }
  })
  return newData

}
