import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import { formatDate, parseDate } from "react-day-picker/moment";

import "react-day-picker/lib/style.css";

export default class ExampleDatePicker extends React.Component {
  render() {
    const FORMAT = "YYYY-MM-DD";
    return (
      <div>
        <DayPickerInput
          format={FORMAT}
          parseDate={parseDate}
          placeholder={`${formatDate(new Date())}`}
          onDayChange={this.props.onDateChange}
        />
      </div>
    );
  }
}
