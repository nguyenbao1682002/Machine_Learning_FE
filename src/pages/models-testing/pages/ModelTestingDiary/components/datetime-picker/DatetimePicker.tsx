import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";
import "./DatetimePicker.css";

interface DatetimePickerProps {
    selectedDate: Date |null
    setSelectedDate: (newDate: Date | null) => void
}

interface CustomInputProps {
  value?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <div className="custom-input" onClick={onClick} ref={ref}>
      <div className="custom-input-btn">
        <FaCalendarAlt size={18} color="#333333ff" />
      </div>
      <div className="custom-input-text">{value}</div>
    </div>
  )
);

const DatetimePicker: React.FC<DatetimePickerProps> = ({ selectedDate, setSelectedDate }) => {

  return (
    <DatePicker
      selected={selectedDate} 
      onChange={(date) => setSelectedDate(date)}
      dateFormat="dd-MM-yyyy"
      customInput={<CustomInput />}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      
    />
  );
}

export default DatetimePicker;