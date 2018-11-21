import React, { Component } from 'react';
import './index.css';
import PaginationComponent from "./pagination/pagination";
import ElementsManager from './elementsManager/elementsManager';
class ReactDataTable extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            filter: {},
            sortOrder: {},
            header: [],
            activePage: 1,
            itemPerPage: "",
        };
        this.getSortIcon = this.getSortIcon.bind(this);
        this.filterList = this.filterList.bind(this);
        this.sortIcon = this.sortIcon.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            itemPerPage: this.props.itemPerPage,
            list: this.props.list
        });
        this.getHeaderFromList(this.props.header);
    }

    getSortIcon(name) {
        if (name === "asc") {
            return (<i className="fa fa-caret-up" aria-hidden="true"></i>)
        }
        if (name === "desc") {
            return (<i className="fa fa-caret-down" aria-hidden="true"></i>)
        }
        if (name === "default") {
            return (<i className="fa fa-sort" aria-hidden="true"></i>)
        }
    }


    filterList(key, arr) {
        return (<select value={this.state.filter[key]} onChange={(e) => { this.filterChanged(key, e) }} >
            <option value="">All</option>
            {arr.map((el, i) => {
                return (<option key={i} value={el}>{el}</option>)
            })}
        </select>)
    }

    sortIcon(num) {
        return (<span className="table__thead--sort-icon"
            onClick={() => { this.sortChanged(num) }}>{this.getSortIcon(this.state.sortOrder[num])}</span>)
    }

    render() {
        const noData = (
            <tr>
                <td className="table__tbody--tr-td no-data" colSpan="100%">No Data !!</td>
            </tr>);

        const listEl = (this.state.list.map((el, i) => {
            if (i <= (((this.state.activePage) * this.state.itemPerPage) - 1) && i >= ((this.state.activePage - 1) * this.state.itemPerPage)) {
                return (
                    <tr className="table__tbody--tr" key={i}>
                        {el.map((elm, ind) => {
                            return (
                                <td key={i + ind} className="table__tbody--tr-td">
                                    <ElementsManager data={elm} />
                                </td>);
                        })}
                    </tr>
                )
            }
        }));

        return (
            <div className="custom-classes">
                <table className="table">
                    <thead className="table__thead">
                        <tr className="table__thead--tr">
                            {this.props.header.map((el, i) => {
                                return (
                                    <th key={i} className="table__thead--th">
                                        <div className="table__thead--name">
                                            <span>{el.name}</span>
                                            {el.sort && this.sortIcon(el.colNum)}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                        <tr className="table__thead--tr">
                            {this.props.header.map((el, i) => {
                                return (
                                    <th key={i} className="table__thead--th">
                                        <div>
                                            {el.filter && this.filterList(el.colNum, el.filterArr)}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className="table__tbody">
                        {this.state.list.length > 0 ? listEl : noData}
                    </tbody>
                </table>
                <PaginationComponent
                    itemCount={this.state.list.length}
                    maxButtons={5}
                    itemPerPage={this.state.itemPerPage}
                    activePage={this.state.activePage}
                    pageChange={this.handlePaginationChange} />
            </div>
        );
    }

    sortChanged(colNum) {

        let sortOrder = JSON.parse(JSON.stringify(this.state.sortOrder));
        let dataList = JSON.parse(JSON.stringify(this.state.list));

        Object.keys(sortOrder).forEach((key) => {
            if (parseInt(key) !== parseInt(colNum)) {
                sortOrder[key] = "default";
            }
        });

        if (sortOrder[colNum] === 'asc') {
            sortOrder[colNum] = "desc"
        } else if (sortOrder[colNum] === 'desc') {
            sortOrder[colNum] = "default"
        } else if (sortOrder[colNum] === 'default') {
            sortOrder[colNum] = "asc"
        }

        if (sortOrder[colNum] !== '') {
            if (sortOrder[colNum] === 'default') {
                dataList = this.props.list;
            } else {
                let sort = sortOrder[colNum] === 'asc' ? true : false;
                dataList.sort((a, b) => {
                    var nameA = a[colNum].value.toLowerCase(), nameB = b[colNum].value.toLowerCase()
                    if (nameA < nameB)
                        return (sort ? -1 : 1);
                    if (nameA > nameB)
                        return (sort ? 1 : -1);
                    return 0
                });
            }

        }
        this.setState({ activePage: 1, sortOrder, list: dataList });
    }

    _checkFilterHelper(dataArr, filterList) {
        let count = 0;
        Object.keys(filterList).map((el) => {
            if (filterList[el] === '' ||
                (Array.isArray(dataArr[el].value) ?
                    dataArr[el].value.includes(filterList[el]) :
                    filterList[el] === dataArr[el].value)
            ) {
                count++;
            }
        });
        return (Object.keys(filterList).length === count) ? true : false;
    }

    filterChanged(prop, e) {

        const filter = JSON.parse(JSON.stringify(this.state.filter));
        filter[prop] = e.target.value;

        let newList = [];

        this.props.list.map((el) => {
            if (this._checkFilterHelper(el, filter)) {
                newList.push(el);
            }
        });

        this.setState({ filter, list: newList });
    }

    getHeaderFromList(list) {
        let filterObj = {};
        let sortObj = {};

        list.map((el) => {
            if (el.filter) {
                filterObj[el.colNum] = "";
            }
            if (el.sort) {
                sortObj[el.colNum] = "default";
            }
        });
        this.setState({
            filter: filterObj,
            sortOrder: sortObj
        });
    }

    handlePaginationChange(value) {
        this.setState({ activePage: value });
    }

}

export default ReactDataTable;
