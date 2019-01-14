import React from "react";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  textField: {
    width: '100%',
    color: 'red'
  },
});

class ExampleDatePicker extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="form-control">
        <TextField
            id="date"
            type="date"
            className={classes.textField}
          />
      </div>
    );
  }
}


export default withStyles(styles)(ExampleDatePicker);