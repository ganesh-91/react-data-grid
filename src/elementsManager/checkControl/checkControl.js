import React from 'react';

const CheckControl = (props) => {
    return (
        props.data.options.map((el, i) => {
            return (
                <span key={i}>
                    <input type="checkbox" name={props.data.key} value={el} checked={props.data.value.includes(el)} readOnly /> {el}
                </span>);
        })
    )
}

export default CheckControl;
