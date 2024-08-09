import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{
  today: DateTime = DateTime.local();
  activeMonth: DateTime = this.today;
  firstDayOfActiveMonth: DateTime = this.activeMonth.startOf('month');
  weekdays: string[] = Info.weekdays('short');
  daysOfMonth: DateTime[] = [];

  @Output() dateReceived = new EventEmitter<DateTime>();

  ngOnInit(): void {
      this.daysOfMonth = this.renderDaysOfMonth()
  }

  private renderDaysOfMonth(){
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth.startOf('week'),
      this.firstDayOfActiveMonth.endOf('month').endOf('week')
    ).splitBy({day: 1}).map(d => {
      if(d.start === null){
        throw new Error('Wrong dates.')
      }
      return d.start;
    })
  }

  onMonthBack(){
    this.activeMonth = this.activeMonth.minus({months: 1}),
    this.firstDayOfActiveMonth = this.activeMonth.startOf('month');
    this.daysOfMonth = this.renderDaysOfMonth()
  }

  onMonthForward(){
    this.activeMonth = this.activeMonth.plus({months: 1})
    this.firstDayOfActiveMonth = this.activeMonth.startOf('month');
    this.daysOfMonth = this.renderDaysOfMonth()
  }

  onSelectDate(date: DateTime){
    this.dateReceived.emit(date)
  }
}
