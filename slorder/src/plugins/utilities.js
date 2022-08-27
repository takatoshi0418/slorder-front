const dateUtil = {
  nowDateStr: function() {
    let date = new Date();
    return this.toStrFormat(date);
  },
  toStrFormat: function(date) {
    let delimiter = '-';
    let year = new String(date.getFullYear());
    let month = new String(date.getMonth() + 1);
    let day = new String(date.getDate());
    
    return year + delimiter + month.padStart(2, '0') + delimiter + day.padStart(2, '0');
  },
  addDay: function(dateObj, addNum) {
    let date = new Date(dateObj);
    if (date === null) {
      return
    }
    if (typeof addNum !== 'number') {
      return
    }

    return new Date(date.setDate(date.getDate() + addNum));
  },
  toDateTruncTime: function(str) {
    let date = new Date(str);
    return new Date(date.setHours(0,0,0,0));
  },
  isWeekday: function(date) {
    return date.getDay() % 6 !== 0;
  },
  getWeekdays: function(startStr, endStr) {
    if (!startStr || typeof startStr !== 'string'
      || !endStr || typeof endStr !== 'string') {
        return -1;
      }
    let startDate = new Date(startStr);
    let endDate = new Date(endStr);

    if (startDate > endDate) {
      return -1;
    }
    
    let workDate = new Date(startDate);
    let WeekdayCnt = 0;
    while(workDate.getTime() <= endDate.getTime()) {
      if (this.isWeekday(workDate)) {
        WeekdayCnt = WeekdayCnt + 1;
      }
      workDate = this.addDay(workDate, 1);
    }
    return WeekdayCnt;
  },
  getBetweenHours: function(startStr, endStr) {
    if (!startStr || typeof startStr !== 'string'
      || !endStr || typeof endStr !== 'string') {
        return;
      }
    let startDate = new Date(startStr);
    let endDate = new Date(endStr);

    if (startDate > endDate) {
      return;
    }
    return (endDate.getTime() - startDate.getTime()) / 60 / 60 / 1000
  }
}
export {dateUtil}