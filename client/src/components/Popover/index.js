import React from 'react';
import Popover from "react-simple-popover";

export default class PopoverWrapp extends React.Component {
    render() {
        return (
            <Popover
                placement={this.props.placement}
                container={this}
                target={this.props.refs}
                show={this.props.show}
                onHide={this.props.handleClose}
            >
                {this.props.children}
            </Popover>
        )
    }
}
