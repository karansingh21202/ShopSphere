import React from 'react'
import {ScheduleComponent,Day,Week,WorkWeek,Month,Agenda,Inject,Resize,DragAndDrop} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {Header} from '../Components';
import { scheduleData } from '../data/dummy';


const Calendar = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Scheduler"/>
      <ScheduleComponent
      height="650px"
      eventSettings={{dataSource:scheduleData}}
      selectedDate={new Date()}  // This will give the current date and time
      >
      <Inject services={[Day,Week,WorkWeek,Month,Agenda,Resize,DragAndDrop]} />
      </ScheduleComponent>
    </div>
  )
}

export default Calendar
