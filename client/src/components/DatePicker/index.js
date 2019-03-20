import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import { formatDate, parseDate } from "react-day-picker/moment";

import "./style.css";

const ExampleDatePicker = ({ onDateChange }) => (
  <DayPickerInput
    format="YYYY-MM-DD"
    parseDate={parseDate}
    placeholder={`${formatDate(new Date())}`}
    onDayChange={onDateChange}
  />
);

export default ExampleDatePicker;
