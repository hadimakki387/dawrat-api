
type Props = {
    label: string;
    className: string;
    noBg?: boolean;
    
  };

function Chip({
  label,
  className,
}: Props) {
   
  return (
    <div className={`${className} text-white rounded-full`} >{label}</div>
  )
}

export default Chip