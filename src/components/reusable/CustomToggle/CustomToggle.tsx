import {CustomToggleWrapper} from "./customToggle.style";
import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomToggle: React.FC<Props> = ({onChange}) => {
  return <CustomToggleWrapper className="label toggle">
    <input type="checkbox" className="toggle_input" onChange={onChange}/>
    <div className="toggle-control"></div>
  </CustomToggleWrapper>
}

export default CustomToggle;

