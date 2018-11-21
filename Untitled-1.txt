# multi-select-react

## Description
A React data grid.

----
## Installation
```
npm link from build folder.
npm link npm link react-data-table
```
----
## 1. Basic Usage
```js
import React, { Component } from 'react';
import  ReactDataTable  from 'react-data-table';

class MyComponent extends Component {
  constructor() {
        super();
        this.state = {
      activePage: 1,
      itemPerPage: 5,
      header: [
        {
          name: 'First Name',
          key: "first_name",
          filter: false,
          colNum: 0,
          sort: true,
        },
        {
          name: 'Last Name',
          key: "last_name",
          filter: false,
          colNum: 1,
          sort: true,
        },
        {
          name: 'Gender',
          key: "gender",
          filter: true,
          colNum: 2,
          sort: false,
          filterArr: ["Male", "Female", "Ignore"]
        },
        {
          name: 'Occupation',
          key: "occupation",
          filter: true,
          colNum: 3,
          sort: false,
          filterArr: ["student", "working"]
        },
        {
          name: 'Hobbies',
          key: "hobbies",
          filter: true,
          colNum: 4,
          sort: false,
          filterArr: ["music", "reading", "sport"]
        }
      ],
      list: [
        [
          { "cntrlType": "input", "key": "first_name", "value": "Gracie", "toBeDisplay": true },
          { "cntrlType": "data", "key": "last_name", "value": "Tremayle", "toBeDisplay": true },
          { "cntrlType": "select", "key": "gender", "value": "Female", "options": ["Male", "Female", "Ignore"], "toBeDisplay": true },
          { "cntrlType": "radio", "key": "occupation", "value": "student", "options": ["student", "working"], "toBeDisplay": true },
          { "cntrlType": "check", "key": "hobbies", "value": ["music", "reading"], "optionsArr": ["music", "reading", "sport"], "toBeDisplay": true }
        ], [
          { "cntrlType": "input", "key": "first_name", "value": "Cyril", "toBeDisplay": true },
          { "cntrlType": "data", "key": "last_name", "value": "Choppin", "toBeDisplay": true },
          { "cntrlType": "select", "key": "gender", "value": "Male", "options": ["Male", "Female", "Ignore"], "toBeDisplay": true },
          { "cntrlType": "radio", "key": "occupation", "value": "working", "options": ["student", "working"], "toBeDisplay": true },
          { "cntrlType": "check", "key": "hobbies", "value": ["music", "reading"], "optionsArr": ["music", "reading", "sport"], "toBeDisplay": true }
        ]]
    }
    }
  render() {
    return (
      <ReactDataTable
        list={this.state.list}
        itemPerPage={this.state.itemPerPage}
        header={this.state.header} />
    );
  }

}

```
Default value for isTextWarp is true, for component to grow vertically and display all options selected set isTextWarp to false.

----

## Props

| Prop  | Type  | Default | Description |
|:--------- | :---- | :----   |:----  |
| `list` | `Array of Array` | R | List of the data to be display
| `itemPerPage` | `Number` | R | Number of item per page
| `custom-classes` | `Css class` | Optional | Can be used to override the component.
