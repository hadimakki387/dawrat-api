
export const returnData =(data:any)=>{
  const {_id, ...newData} = data
  return {
    id:_id,
    ...newData._doc
  }
}

export const returnUser = (user:any)=>{
  
}
