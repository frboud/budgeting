var BudgetApp = (function() {
  "use strict"
  var _self = {
    init: function() {
      this.cache.bind();
      // Initialize the individual boxes
      this.Calendar.init();
    },
    bind: function() {
      return this;
    },
    cache: function() {
      return this;
    },

    Calendar: {
      // dayNames: ['Sat', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
      dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthLength: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

      date: new Date(),
      year: null,
      month: null,
      day: null,

      init: function() {
        this.setInitialDate();
        this.fixLeapYear();

        this.draw.header();
        this.draw.body();
      },

      draw: {
        header: function() {
          var that = _self.Calendar;
          // Draw the month selector and day names
          var header = document.getElementById('calendar-header');

          header.innerHTML += "<h1>"+that.monthNames[that.month]+"</h1>";
          var html = '';

          for (var i = 0; i < 7; i++) {
            html += "<p class=\"day-name\">"+that.dayNames[i]+"</p>";
          }

          header.innerHTML += html;
        },

        body: function() {
          var that = _self.Calendar;
          // Draw the month selector and day names
          var body = document.getElementById('calendar-body');
          var html = '',
            dayCounter = 0;

          // Add the days from the previous month
          var monthStart = new Date(that.year, that.month, 1).getDay(),
            prevMonth = that.month -1;

          if (prevMonth === -1)
            prevMonth = 12;

          // Start at monthStart + 1 since calendars dont start at 0
          for (var i = (that.monthLength[prevMonth] - monthStart + 1); i <= that.monthLength[prevMonth]; i++, dayCounter++) {
            html += "<p class=\"calendar-date other-month\">"+i+"</p>";
          }

          // Add current month days
          for (var i = 1; i < that.monthLength[that.month] + 1; i++, dayCounter++) {
            html += "<p class=\"calendar-date\">"+i+"</p>";
          }

          // Add days after month end
          for (var i = 1; dayCounter % 7 !== 0; i++, dayCounter++) {
            html += "<p class=\"calendar-date other-month\">"+i+"</p>";
          }

          body.innerHTML += html;
        }
      },

      setInitialDate: function() {
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
      },

      fixLeapYear: function(year) {
        if (this.month == 1) { // Only matters in Feb
          if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0)
            this.monthLength[1] = 29;
        }
      }
    }


  }

  _self.init();
})();
