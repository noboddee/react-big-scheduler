import React from 'react'
import Calendar from 'react-calendar'

import './MinCalendar.css'

class MiniCalendar extends React.Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.handleChangeMonthView = this.handleChangeMonthView.bind(this)
		this.togglingMonthChosenStyle = this.togglingMonthChosenStyle.bind(this)
		this.updateMonthViewAfterChanging = this.updateMonthViewAfterChanging.bind(this)
	}

	formatWeekDays(dayName) {
		switch (dayName.getDay()) {
		case 0:
			return 'D'
		case 1:
			return 'L'
		case 2:
			return 'M'
		case 3:
			return 'M'
		case 4:
			return 'J'
		case 5:
			return 'V'
		case 6:
			return 'S'
		default:
			return dayName.toString().charAt(0)
		}
	}

	togglingMonthChosenStyle(currentDateDiv, clickedDate = this.props.date) {
		// making string from objects
		let today = new Date().toString()
		clickedDate = clickedDate.toString()

		// get date without hours
		today = today.substr(0, 11)
		clickedDate = clickedDate.substr(0, 11)

		// adding chosen style
		if (today === clickedDate) {
			currentDateDiv.classList.remove('chosen-month-view')
		} else {
			currentDateDiv.classList.add('chosen-month-view')
		}
	}

	updateMonthViewAfterChanging() {
		// getting current date div
		let currentDateDiv = document.getElementsByClassName('react-calendar__tile--now')[0]

		if (currentDateDiv && !currentDateDiv.classList.contains('chosen-month-view')) {
			this.togglingMonthChosenStyle(currentDateDiv)
		}
	}

	handleChange (e) {
		this.props.updateDate(e)
		// geting current date div
		let currentDateDiv = document.getElementsByClassName('react-calendar__tile--now')[0]

		if (currentDateDiv) {
			this.togglingMonthChosenStyle(currentDateDiv, e)
		}
	}
	
	handleChangeMonthView () {
		this.updateMonthViewAfterChanging()
	}

	componentDidUpdate() {
		this.updateMonthViewAfterChanging()
	}

	render() {
		return (
			<div>
				<Calendar
					formatShortWeekday={(locale, date) => this.formatWeekDays(date)}
					value={this.props.date}
					minDetail={'month'}
					showToday={true}
					className={['calendar-style']}
					locale={'fr-FR'}
					onChange={e => this.handleChange(e)}
					onActiveDateChange={this.handleChangeMonthView}
				/>
			</div>
		)
	}
}

export default MiniCalendar
