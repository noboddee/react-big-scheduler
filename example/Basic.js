import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr'
import 'antd/lib/style/index.less'
import MiniCalendar from '../src/Components/MiniCalendar/MiniCalendar'     //Add this code for locally example
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, DemoData } from '../src/index'
import Nav from './Nav'
import Tips from './Tips'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'

class Basic extends Component {
  constructor (props) {
    super(props)
    this.parentRef = React.createRef()
    moment.locale('fr')
    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData(Date.now(), ViewTypes.Day, false, false, {
      schedulerWidth: 1000,
      dayStartFrom: 6,
      checkConflict: true,
      calendarPopoverEnabled: false,
      nonAgendaDayCellHeaderFormat: 'HH[h]',
      nonAgendaOtherCellHeaderFormat: 'ddd D/MM',
      views: [
        {viewName: 'Jour', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
        {viewName: 'Semaine', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
        {viewName: 'Mois', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false}
      ]
    }, {
      getDateLabelFunc: this.getDateLabel
    }, moment)
    // schedulerData.localeMoment.locale('en')
    schedulerData.setResources(DemoData.resources)
    schedulerData.setEvents(DemoData.events)
    this.state = {
      viewModel: schedulerData,
      currentDate: new Date()
    }
    window.onresize = this.onWindowResize
  }

  onWindowResize = (e) => {
    const {viewModel} = this.state
    const divWidth = document.documentElement.clientWidth * 0.8
    console.log('new width', this.parentRef.current.clientWidth)
    viewModel.setSchedulerWidth(divWidth)
    this.setState({
      viewModel,
      divWidth
    })
  }

  render () {
    const {viewModel, currentDate} = this.state
    return (
      <div>
        <Nav/>
        <div ref={this.parentRef} style={{width: document.documentElement.clientWidth * 0.8}}>
          <h3 style={{textAlign: 'center'}}>Basic example<ViewSrcCode
            srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/Basic.js"/></h3>
          <Scheduler schedulerData={viewModel}
                     parentRef={this.parentRef}
                     prevClick={this.prevClick}
                     nextClick={this.nextClick}
                     onSelectDate={this.onSelectDate}
                     onViewChange={this.onViewChange}
                     eventItemClick={this.eventClicked}
                     viewEventClick={this.ops1}
                     viewEventText="Ops 1"
                     viewEvent2Text="Ops 2"
                     viewEvent2Click={this.ops2}
                     updateEventStart={this.updateEventStart}
                     updateEventEnd={this.updateEventEnd}
                     moveEvent={this.moveEvent}
                     newEvent={this.newEvent}
                     onScrollLeft={this.onScrollLeft}
                     onScrollRight={this.onScrollRight}
                     onScrollTop={this.onScrollTop}
                     onScrollBottom={this.onScrollBottom}
                     conflictOccurred={this.conflictOccurred}
                     nonAgendaCellHeaderTemplateResolver={this.nonAgendaCellHeaderTemplateResolver}
                     leftCustomHeader={
                       <MiniCalendar date={currentDate} updateDate={this.onChangeDate}/>
                     }
          />
        </div>
        <Tips/>
      </div>
    )
  }

  prevClick = (schedulerData) => {
   /* if (schedulerData.viewType === ViewTypes.Day) {
      newCurrentDate.subtract(1, 'd')
    } else if (schedulerData.viewType === ViewTypes.Week) {
      newCurrentDate.subtract(1, 'w')
    } else if (schedulerData.viewType === ViewTypes.Month) {
      newCurrentDate.subtract(1, 'm')
    }*/

    schedulerData.prev()
    schedulerData.setEvents(DemoData.events)

    const {startDate, endDate} = schedulerData
    const newCurrentDate = startDate === endDate ? moment(startDate).toDate() : [moment(startDate).toDate(), moment(endDate).toDate()]

    this.setState({
      viewModel: schedulerData,
      currentDate: newCurrentDate
    })
  }

  nextClick = (schedulerData) => {
    /* const newCurrentDate = moment(this.state.currentDate)
    if (schedulerData.viewType === ViewTypes.Day) {
      newCurrentDate.add(1, 'd')
    } else if (schedulerData.viewType === ViewTypes.Week) {
      newCurrentDate.add(1, 'w')
    } else if (schedulerData.viewType === ViewTypes.Month) {
      newCurrentDate.add(1, 'm')
    }*/

    schedulerData.next()
    schedulerData.setEvents(DemoData.events)

    const {startDate, endDate} = schedulerData
    const newCurrentDate = startDate === endDate ? moment(startDate).toDate() : [moment(startDate).toDate(), moment(endDate).toDate()]

    this.setState({
      viewModel: schedulerData,
      currentDate: newCurrentDate
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    schedulerData.setEvents(DemoData.events)
    const {startDate, endDate} = schedulerData
    const newCurrentDate = startDate === endDate ? moment(startDate).toDate() : [moment(startDate).toDate(), moment(endDate).toDate()]

    this.setState({
      viewModel: schedulerData,
      currentDate: newCurrentDate
    })
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    schedulerData.setEvents(DemoData.events)
    const {startDate, endDate} = schedulerData
    const newCurrentDate = startDate === endDate ? moment(startDate).toDate() : [moment(startDate).toDate(), moment(endDate).toDate()]

    this.setState({
      viewModel: schedulerData,
      currentDate: newCurrentDate
    })
  }

  onChangeDate = (date) => {
    const schedulerData = this.state.viewModel
    schedulerData.setDate(date)
    schedulerData.setEvents(DemoData.events)

    const {startDate, endDate} = schedulerData
    const newCurrentDate = startDate === endDate ? moment(startDate).toDate() : [moment(startDate).toDate(), moment(endDate).toDate()]

    this.setState({
      viewModel: schedulerData,
      currentDate: newCurrentDate
    })
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {

      let newFreshId = 0
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId)
          newFreshId = item.id + 1
      })

      let newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: 'purple'
      }
      schedulerData.addEvent(newEvent)
      this.setState({
        viewModel: schedulerData
      })
    }
  }

  updateEventStart = (schedulerData, event, newStart) => {
    if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
      schedulerData.updateEventStart(event, newStart)
    }
    this.setState({
      viewModel: schedulerData
    })
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
      schedulerData.updateEventEnd(event, newEnd)
    }
    this.setState({
      viewModel: schedulerData
    })
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
      schedulerData.moveEvent(event, slotId, slotName, start, end)
      this.setState({
        viewModel: schedulerData
      })
    }
  }

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next()
      schedulerData.setEvents(DemoData.events)
      this.setState({
        viewModel: schedulerData
      })

      schedulerContent.scrollLeft = maxScrollLeft - 10
    }
  }

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev()
      schedulerData.setEvents(DemoData.events)
      this.setState({
        viewModel: schedulerData
      })

      schedulerContent.scrollLeft = 10
    }
  }

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop')
  }

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom')
  }

  conflictOccurred = (schedulerData, action, event, type, slotId, slotName, start, end) => {
    alert(`Conflict occurred. {action: ${action}, event: ${event}`)
  }

  getDateLabel = (schedulerData, viewType, startDate, endDate) => {
    console.log('run get Label')
    let start = schedulerData.localeMoment(startDate);
    let end = schedulerData.localeMoment(endDate);
    let dateLabel = start.format('dddd DD MMMM');

    if (viewType === ViewTypes.Week) {
      dateLabel = `${start.format('D')} - ${end.format('D MMM YYYY')}`;
      if (start.month() !== end.month())
        dateLabel = `${start.format('D MMM')} - ${end.format('D MMM YYYY')}`;
      if (start.year() !== end.year())
        dateLabel = `${start.format('D MMM YYYY')} - ${end.format('D MMM YYYY')}`;
    }
    else if (viewType === ViewTypes.Month) {
      dateLabel = start.format('MMMM YYYY')
    }
    else if (viewType === ViewTypes.Year) {
      dateLabel = start.format('YYYY');
    }

    return dateLabel;
  }

  nonAgendaCellHeaderTemplateResolver = (schedulerData, item, formattedDateItems, style) => {
    let datetime = schedulerData.localeMoment(item.time);
    let isCurrentDate = false;

    if (schedulerData.viewType === ViewTypes.Day) {
      isCurrentDate = datetime.isSame(new Date(), 'hour');
    }
    else {
      isCurrentDate = datetime.isSame(new Date(), 'day');
    }

    if (isCurrentDate) {
      style.backgroundColor = '#2ab8a9';
      style.color = '#ffffff';
    }

    return (
      <th key={item.time} className={`header3-text`} style={style}>
        {
          formattedDateItems.map((formattedItem, index) => (
            <div key={index}
                 dangerouslySetInnerHTML={{__html: formattedItem.replace(/[0-9]/g, '<b>$&</b>')}}/>
          ))
        }
      </th>
    );
  }

}

export default withDragDropContext(Basic)
