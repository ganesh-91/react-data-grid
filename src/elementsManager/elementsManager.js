import React, { Component } from 'react';
import RadioControl from './radioControl/radioControl';
import SelectControl from './selectControl/selectControl';
import CheckControl from './checkControl/checkControl';

class ElementsManager extends Component {
    render() {
        if (this.props.data.cntrlType === 'input') {
            return (<input type="text" value={this.props.data.value} readOnly />)
        }
        if (this.props.data.cntrlType === 'select') {
            return (<SelectControl data={this.props.data} />)
        }
        if (this.props.data.cntrlType === 'data') {
            return (<span>{this.props.data.value}</span>)
        }
        if (this.props.data.cntrlType === 'check') {
            return (<CheckControl data={this.props.data} />)
        }
        if (this.props.data.cntrlType === 'radio') {
            return (<RadioControl data={this.props.data} />)
        }
    }
}

export default ElementsManager;
