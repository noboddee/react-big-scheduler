'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCalendar = require('react-calendar');

var _reactCalendar2 = _interopRequireDefault(_reactCalendar);

require('./MinCalendar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MiniCalendar = function (_React$Component) {
	_inherits(MiniCalendar, _React$Component);

	function MiniCalendar() {
		_classCallCheck(this, MiniCalendar);

		var _this = _possibleConstructorReturn(this, (MiniCalendar.__proto__ || Object.getPrototypeOf(MiniCalendar)).call(this));

		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleChangeMonthView = _this.handleChangeMonthView.bind(_this);
		_this.togglingMonthChosenStyle = _this.togglingMonthChosenStyle.bind(_this);
		_this.updateMonthViewAfterChanging = _this.updateMonthViewAfterChanging.bind(_this);
		return _this;
	}

	_createClass(MiniCalendar, [{
		key: 'formatWeekDays',
		value: function formatWeekDays(dayName) {
			switch (dayName.getDay()) {
				case 0:
					return 'D';
				case 1:
					return 'L';
				case 2:
					return 'M';
				case 3:
					return 'M';
				case 4:
					return 'J';
				case 5:
					return 'V';
				case 6:
					return 'S';
				default:
					return dayName.toString().charAt(0);
			}
		}
	}, {
		key: 'togglingMonthChosenStyle',
		value: function togglingMonthChosenStyle(currentDateDiv) {
			var clickedDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.date;

			// making string from objects
			var today = new Date().toString();
			clickedDate = clickedDate.toString();

			// get date without hours
			today = today.substr(0, 11);
			clickedDate = clickedDate.substr(0, 11);

			// adding chosen style
			if (today === clickedDate) {
				currentDateDiv.classList.remove('chosen-month-view');
			} else {
				currentDateDiv.classList.add('chosen-month-view');
			}
		}
	}, {
		key: 'updateMonthViewAfterChanging',
		value: function updateMonthViewAfterChanging() {
			// getting current date div
			var currentDateDiv = document.getElementsByClassName('react-calendar__tile--now')[0];

			if (currentDateDiv && !currentDateDiv.classList.contains('chosen-month-view')) {
				this.togglingMonthChosenStyle(currentDateDiv);
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.props.updateDate(e);
			// geting current date div
			var currentDateDiv = document.getElementsByClassName('react-calendar__tile--now')[0];

			if (currentDateDiv) {
				this.togglingMonthChosenStyle(currentDateDiv, e);
			}
		}
	}, {
		key: 'handleChangeMonthView',
		value: function handleChangeMonthView() {
			this.updateMonthViewAfterChanging();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.updateMonthViewAfterChanging();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_reactCalendar2.default, {
					formatShortWeekday: function formatShortWeekday(locale, date) {
						return _this2.formatWeekDays(date);
					},
					value: this.props.date,
					minDetail: 'month',
					showToday: true,
					className: ['calendar-style'],
					locale: 'fr-FR',
					onChange: function onChange(e) {
						return _this2.handleChange(e);
					},
					onActiveDateChange: this.handleChangeMonthView
				})
			);
		}
	}]);

	return MiniCalendar;
}(_react2.default.Component);

exports.default = MiniCalendar;