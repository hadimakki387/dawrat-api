import { ChipType } from '@/services/constants';
import React from 'react'

type Props = {
    label: string;
    className: string;
    noBg?: boolean;
    
  };

function Chip({
  label,
  className,
  noBg = false,
}: Props) {
   
  return (
    <div className={`${className} text-white rounded-full`} >{label}</div>
  )
}

export default Chip