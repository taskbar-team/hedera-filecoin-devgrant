import CustomCalendarWrapper from "./customCalendar.style";
import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

type Props = {
  name?: string,
  label?: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const CustomCalendar: React.FC<Props> = ({name, label, value, onChange}) => {
  return <CustomCalendarWrapper>
    {label && <span className="label">{label}</span>}
    <TextField
      id="date"
      name={name}
      type="date"
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{inputProps: { min: new Date().toISOString().substring(0, 10) }}}
      value={value}
      onChange={onChange}
    />
  </CustomCalendarWrapper>
}

export default CustomCalendar;
