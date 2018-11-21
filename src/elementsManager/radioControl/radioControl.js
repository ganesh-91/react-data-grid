import React from 'react';

const RadioControl = (props) => {
    return (
        props.data.options.map((el, i) => {
            return (
                <span key={i}>
                    <input type="radio" value={el} checked={props.data.value === el} readOnly /> {el}
                </span>);
        })
    )
}

export default RadioControl;
