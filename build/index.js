module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _radioControl = __webpack_require__(7);

var _radioControl2 = _interopRequireDefault(_radioControl);

var _selectControl = __webpack_require__(8);

var _selectControl2 = _interopRequireDefault(_selectControl);

var _checkControl = __webpack_require__(6);

var _checkControl2 = _interopRequireDefault(_checkControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementsManager = function (_Component) {
    _inherits(ElementsManager, _Component);

    function ElementsManager() {
        _classCallCheck(this, ElementsManager);

        return _possibleConstructorReturn(this, (ElementsManager.__proto__ || Object.getPrototypeOf(ElementsManager)).apply(this, arguments));
    }

    _createClass(ElementsManager, [{
        key: 'render',
        value: function render() {
            if (this.props.data.cntrlType === 'input') {
                return _react2.default.createElement('input', { type: 'text', value: this.props.data.value, readOnly: true });
            }
            if (this.props.data.cntrlType === 'select') {
                return _react2.default.createElement(_selectControl2.default, { data: this.props.data });
            }
            if (this.props.data.cntrlType === 'data') {
                return _react2.default.createElement(
                    'span',
                    null,
                    this.props.data.value
                );
            }
            if (this.props.data.cntrlType === 'check') {
                return _react2.default.createElement(_checkControl2.default, { data: this.props.data });
            }
            if (this.props.data.cntrlType === 'radio') {
                return _react2.default.createElement(_radioControl2.default, { data: this.props.data });
            }
        }
    }]);

    return ElementsManager;
}(_react.Component);

exports.default = ElementsManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

__webpack_require__(13);

var _pageLink = __webpack_require__(10);

var _pageLink2 = _interopRequireDefault(_pageLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationComponent = function (_React$Component) {
    _inherits(PaginationComponent, _React$Component);

    function PaginationComponent() {
        _classCallCheck(this, PaginationComponent);

        var _this = _possibleConstructorReturn(this, (PaginationComponent.__proto__ || Object.getPrototypeOf(PaginationComponent)).call(this));

        _this.handlePaginationChange = _this.handlePaginationChange.bind(_this);
        return _this;
    }

    _createClass(PaginationComponent, [{
        key: 'render',
        value: function render() {
            var rows = [];
            var pgNum = [];
            var showPagination = true;

            for (var i = 1; i <= Math.ceil(this.props.itemCount / this.props.itemPerPage); i++) {
                if (i >= this.props.activePage - 4 && i <= this.props.activePage + 4) {
                    pgNum.push(React.createElement(_pageLink2.default, {
                        activePage: this.props.activePage,
                        handlePaginationChange: this.handlePaginationChange,
                        index: i,
                        key: i }));
                }
                rows.push(React.createElement(_pageLink2.default, {
                    activePage: this.props.activePage,
                    handlePaginationChange: this.handlePaginationChange,
                    index: i,
                    key: i }));
            }

            if (this.props.itemCount < this.props.itemPerPage) {
                showPagination = false;
            }

            // const pgNum = rows.slice(this.props.activePage,9);

            return React.createElement(
                'nav',
                { 'aria-label': 'Page navigation' },
                React.createElement(
                    'ul',
                    { hidden: !showPagination, className: 'pagination  pagination-sm' },
                    pgNum
                )
            );
        }
    }, {
        key: 'handlePaginationChange',
        value: function handlePaginationChange(action, event) {
            if (action === 'TO_PAGE_NUMBER') {
                this.props.pageChange(parseInt(event.target.value, 10));
            }
        }
    }]);

    return PaginationComponent;
}(React.Component);

exports.default = PaginationComponent;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckControl = function CheckControl(props) {
    return props.data.options.map(function (el, i) {
        return _react2.default.createElement(
            "span",
            { key: i },
            _react2.default.createElement("input", { type: "checkbox", name: props.data.key, value: el, checked: props.data.value.includes(el), readOnly: true }),
            " ",
            el
        );
    });
};

exports.default = CheckControl;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioControl = function RadioControl(props) {
    return props.data.options.map(function (el, i) {
        return _react2.default.createElement(
            "span",
            { key: i },
            _react2.default.createElement("input", { type: "radio", value: el, checked: props.data.value === el, readOnly: true }),
            " ",
            el
        );
    });
};

exports.default = RadioControl;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectControl = function SelectControl(props) {
    return _react2.default.createElement(
        'select',
        { value: props.data.value, readOnly: true },
        props.data.options.map(function (el, i) {
            return _react2.default.createElement(
                'option',
                { value: el, key: i },
                el
            );
        })
    );
};

exports.default = SelectControl;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(5);

var _pagination = __webpack_require__(4);

var _pagination2 = _interopRequireDefault(_pagination);

var _elementsManager = __webpack_require__(3);

var _elementsManager2 = _interopRequireDefault(_elementsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDataTable = function (_React$Component) {
    _inherits(ReactDataTable, _React$Component);

    function ReactDataTable() {
        _classCallCheck(this, ReactDataTable);

        var _this = _possibleConstructorReturn(this, (ReactDataTable.__proto__ || Object.getPrototypeOf(ReactDataTable)).call(this));

        _this.state = {
            list: [],
            filter: {},
            sortOrder: {},
            header: [],
            activePage: 1,
            itemPerPage: ""
        };
        _this.getSortIcon = _this.getSortIcon.bind(_this);
        _this.filterList = _this.filterList.bind(_this);
        _this.sortIcon = _this.sortIcon.bind(_this);
        _this.handlePaginationChange = _this.handlePaginationChange.bind(_this);
        return _this;
    }

    _createClass(ReactDataTable, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                itemPerPage: this.props.itemPerPage,
                list: this.props.list
            });
            this.getHeaderFromList(this.props.header);
        }
    }, {
        key: 'getSortIcon',
        value: function getSortIcon(name) {
            if (name === "asc") {
                return _react2.default.createElement('i', { className: 'fa fa-caret-up', 'aria-hidden': 'true' });
            }
            if (name === "desc") {
                return _react2.default.createElement('i', { className: 'fa fa-caret-down', 'aria-hidden': 'true' });
            }
            if (name === "default") {
                return _react2.default.createElement('i', { className: 'fa fa-sort', 'aria-hidden': 'true' });
            }
        }
    }, {
        key: 'filterList',
        value: function filterList(key, arr) {
            var _this2 = this;

            return _react2.default.createElement(
                'select',
                { value: this.state.filter[key], onChange: function onChange(e) {
                        _this2.filterChanged(key, e);
                    } },
                _react2.default.createElement(
                    'option',
                    { value: '' },
                    'All'
                ),
                arr.map(function (el, i) {
                    return _react2.default.createElement(
                        'option',
                        { key: i, value: el },
                        el
                    );
                })
            );
        }
    }, {
        key: 'sortIcon',
        value: function sortIcon(num) {
            var _this3 = this;

            return _react2.default.createElement(
                'span',
                { className: 'table__thead--sort-icon',
                    onClick: function onClick() {
                        _this3.sortChanged(num);
                    } },
                this.getSortIcon(this.state.sortOrder[num])
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var noData = _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    { className: 'table__tbody--tr-td no-data', colSpan: '100%' },
                    'No Data !!'
                )
            );

            var listEl = this.state.list.map(function (el, i) {
                if (i <= _this4.state.activePage * _this4.state.itemPerPage - 1 && i >= (_this4.state.activePage - 1) * _this4.state.itemPerPage) {
                    return _react2.default.createElement(
                        'tr',
                        { className: 'table__tbody--tr', key: i },
                        el.map(function (elm, ind) {
                            return _react2.default.createElement(
                                'td',
                                { key: i + ind, className: 'table__tbody--tr-td' },
                                _react2.default.createElement(_elementsManager2.default, { data: elm })
                            );
                        })
                    );
                }
            });

            return _react2.default.createElement(
                'div',
                { className: 'custom-classes' },
                _react2.default.createElement(
                    'table',
                    { className: 'table' },
                    _react2.default.createElement(
                        'thead',
                        { className: 'table__thead' },
                        _react2.default.createElement(
                            'tr',
                            { className: 'table__thead--tr' },
                            this.props.header.map(function (el, i) {
                                return _react2.default.createElement(
                                    'th',
                                    { key: i, className: 'table__thead--th' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'table__thead--name' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            el.name
                                        ),
                                        el.sort && _this4.sortIcon(el.colNum)
                                    )
                                );
                            })
                        ),
                        _react2.default.createElement(
                            'tr',
                            { className: 'table__thead--tr' },
                            this.props.header.map(function (el, i) {
                                return _react2.default.createElement(
                                    'th',
                                    { key: i, className: 'table__thead--th' },
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        el.filter && _this4.filterList(el.colNum, el.filterArr)
                                    )
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        { className: 'table__tbody' },
                        this.state.list.length > 0 ? listEl : noData
                    )
                ),
                _react2.default.createElement(_pagination2.default, {
                    itemCount: this.state.list.length,
                    maxButtons: 5,
                    itemPerPage: this.state.itemPerPage,
                    activePage: this.state.activePage,
                    pageChange: this.handlePaginationChange })
            );
        }
    }, {
        key: 'sortChanged',
        value: function sortChanged(colNum) {

            var sortOrder = JSON.parse(JSON.stringify(this.state.sortOrder));
            var dataList = JSON.parse(JSON.stringify(this.state.list));

            Object.keys(sortOrder).forEach(function (key) {
                if (parseInt(key) !== parseInt(colNum)) {
                    sortOrder[key] = "default";
                }
            });

            if (sortOrder[colNum] === 'asc') {
                sortOrder[colNum] = "desc";
            } else if (sortOrder[colNum] === 'desc') {
                sortOrder[colNum] = "default";
            } else if (sortOrder[colNum] === 'default') {
                sortOrder[colNum] = "asc";
            }

            if (sortOrder[colNum] !== '') {
                if (sortOrder[colNum] === 'default') {
                    dataList = this.props.list;
                } else {
                    var sort = sortOrder[colNum] === 'asc' ? true : false;
                    dataList.sort(function (a, b) {
                        var nameA = a[colNum].value.toLowerCase(),
                            nameB = b[colNum].value.toLowerCase();
                        if (nameA < nameB) return sort ? -1 : 1;
                        if (nameA > nameB) return sort ? 1 : -1;
                        return 0;
                    });
                }
            }
            this.setState({ activePage: 1, sortOrder: sortOrder, list: dataList });
        }
    }, {
        key: '_checkFilterHelper',
        value: function _checkFilterHelper(dataArr, filterList) {
            var count = 0;
            Object.keys(filterList).map(function (el) {
                if (filterList[el] === '' || (Array.isArray(dataArr[el].value) ? dataArr[el].value.includes(filterList[el]) : filterList[el] === dataArr[el].value)) {
                    count++;
                }
            });
            return Object.keys(filterList).length === count ? true : false;
        }
    }, {
        key: 'filterChanged',
        value: function filterChanged(prop, e) {
            var _this5 = this;

            var filter = JSON.parse(JSON.stringify(this.state.filter));
            filter[prop] = e.target.value;

            var newList = [];

            this.props.list.map(function (el) {
                if (_this5._checkFilterHelper(el, filter)) {
                    newList.push(el);
                }
            });

            this.setState({ filter: filter, list: newList });
        }
    }, {
        key: 'getHeaderFromList',
        value: function getHeaderFromList(list) {
            var filterObj = {};
            var sortObj = {};

            list.map(function (el) {
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
    }, {
        key: 'handlePaginationChange',
        value: function handlePaginationChange(value) {
            this.setState({ activePage: value });
        }
    }]);

    return ReactDataTable;
}(_react2.default.Component);

exports.default = ReactDataTable;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PageLink = function PageLink(props) {

    var handlePaginationChange = function handlePaginationChange(event) {
        props.handlePaginationChange('TO_PAGE_NUMBER', event);
    };

    return React.createElement(
        'li',
        { className: 'page-item',
            onClick: handlePaginationChange },
        React.createElement(
            'button',
            { type: 'button', value: props.index,
                className: "page-link " + (props.activePage === props.index ? "active" : "") },
            props.index
        )
    );
};

exports.default = PageLink;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".pagination {\n    display: flex;\n    flex-direction: row;\n    list-style: none;\n    padding: 0px;\n    justify-content: flex-end;\n    margin-right: 20px;\n}\n\n.pagination .page-link {\n    /* margin: 0px 5px; */\n    /* height: 25px; */\n    background-color: transparent;\n    border: none;\n    text-decoration: underline;\n    color: blue;\n    cursor: pointer;\n    /* width: 25px; */\n    font-size: 13px;\n    padding: 0px 5px;\n}\n\n.pagination .page-link.active {\n    /* padding: 0px 5px; */\n    text-decoration: none;\n    background-color: cornflowerblue;\n    color: white;\n    border-radius: 3px;\n}\n\n.table {\n    width: 100%;\n    border-top: 1px solid gray;\n    border-left: 1px solid gray;\n    border-right: 1px solid gray;\n    border-spacing: 0px;\n}\n\n.table__thead--tr:last-child .table__thead--th {\n    border-bottom: 1px solid gray;\n    padding: 0px 8px 8px 8px;\n}\n\n.table__thead--tr:last-child .table__thead--th:not(:last-child) {\n    border-right: 1px solid gray;\n}\n\n.table__thead--tr:first-child .table__thead--th {\n    padding: 8px 8px 0px 8px;\n}\n\n.table__thead--tr:first-child .table__thead--th:not(:last-child) {\n    border-right: 1px solid gray;\n}\n\n.table__thead--tr .table__thead--th {\n    min-width: 200px;\n    text-align: left;\n}\n\n.table__thead--th .table__thead--name {}\n\n.table__thead--th .table__thead--name .table__thead--sort-icon {\n    margin-left: 5px;\n}\n\n.table__tbody--tr {}\n\n.table__tbody--tr-td {\n    padding: 4px 8px;\n    border-bottom: 1px solid gray;\n}\n\n.table__tbody--tr-td:not(:last-child) {\n    border-right: 1px solid gray;\n}\n\n.table__tbody--tr-td.no-data {\n    text-align: center;\n}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".pagination {\n    display: flex;\n    flex-direction: row;\n    list-style: none;\n    padding: 0px;\n    justify-content: flex-end;\n    margin-right: 20px;\n}\n\n.pagination .page-link {\n    /* margin: 0px 5px; */\n    /* height: 25px; */\n    background-color: transparent;\n    border: none;\n    text-decoration: underline;\n    color: blue;\n    cursor: pointer;\n    /* width: 25px; */\n    font-size: 13px;\n    padding: 0px 5px;\n}\n\n.pagination .page-link.active {\n    /* padding: 0px 5px; */\n    text-decoration: none;\n    background-color: cornflowerblue;\n    color: white;\n    border-radius: 3px;\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./pagination.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./pagination.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);