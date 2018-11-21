import React from 'react';

const SelectControl = (props) => {
    return (<select value={props.data.value} readOnly>
        {props.data.options.map((el, i) => {
            return (<option value={el} key={i}>{el}</option>)
        })}
    </select>)
}

export default SelectControl;
