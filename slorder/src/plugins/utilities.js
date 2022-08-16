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
  addDayByStr: function(dateStr, addNum) {
    let date = new Date(dateStr);
    if (date === null) {
      return
    }
    if (typeof addNum !== 'number') {
      return
    }

    return new Date(date.setDate(date.getDate() + addNum));
  }
}
export {dateUtil}