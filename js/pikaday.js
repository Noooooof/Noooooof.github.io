(function (root, factory) {
  'use strict';
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(function (req) {
      return factory();
    });
  } else {
    root.Pikaday = factory();
  }
} (this, function () {
  'use strict';
  var document = window.document,
    getName = function (i) {
      return i < 10 ? '0' + i : i;
    },
    isLeapYear = function (year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },
    getDaysInMonth = function (year, month) {
      return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },
    Pikaday = function (opts) {
      var data = '{"2014":{"4":{"31":true},"7":{"18":true},"8":{"5":true,"30":true}},"2015":{"0":{"29":true}},"2016":{"2":{"4":true,"5":true},"4":{"30":true}},"2018":{"8":{"14":true}},"2020":{"3":{"26":true,"27":true,"28":true,"29":true,"30":true},"4":{"1":true,"2":true,"3":true,"4":true,"5":true,"6":true,"7":true,"9":true,"10":true,"11":true,"12":true,"13":true,"17":true,"18":true,"21":true,"22":true,"26":true,"29":true},"5":{"1":true,"4":true,"5":true,"11":true,"21":true,"22":true,"23":true,"24":true,"25":true,"28":true,"29":true},"6":{"2":true,"3":true,"7":true,"10":true,"12":true,"15":true,"16":true,"17":true,"19":true,"20":true,"21":true,"22":true,"23":true,"24":true,"25":true,"27":true,"28":true,"29":true,"30":true,"31":true},"7":{"1":true,"2":true,"4":true,"9":true,"10":true,"12":true,"15":true,"16":true,"20":true,"21":true,"22":true,"23":true,"24":true,"27":true},"8":{"2":true,"7":true,"9":true,"11":true,"14":true,"17":true,"18":true,"20":true,"21":true,"22":true,"24":true}}}';
      this.data = JSON.parse(data);
      window.pdata = this.data;
      this.weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      this.mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      this.container = document.getElementById('calendar_wrap');
      this.time = this.container.getAttribute('time') || '';
      if (!this.time.length) {
        this.date = new Date();
      } else {
        this.date = new Date(this.time);
      }
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.months = this.month + 1;
      this.days = getDaysInMonth(this.year, this.month);
      var tmp = new Date(this.year, this.month, 1);
      this.before = tmp.getDay();
      this.draw();
    };

  Pikaday.prototype = {
    draw: function () {
      var title = '<caption>' + this.year + '年 ' + this.months + '月</caption>';
      var head = this.renderHead();
      var body = this.renderBody();
      var foot = this.renderFoot();
      var html = '<table id="wp-calendar">' + title + head + body + foot + '</table>';
      this.container.innerHTML = html;
    },
    renderHead: function () {
      var arr = [];
      for (var i = 0; i < 7; i++) {
        var tmp = this.weekdays[i];
        arr.push('<th scope="col" title="' + tmp + '">' + tmp + '</th>');
      }
      return '<thead>' + arr.join('') + '</thead>';
    },
    renderBody: function () {
      var arr = [];
      for (var i = 0; i < this.before; i++) {
        arr.push('<td class="is-empty"></td>')
      }
      for (var i = 1; i <= this.days; i++) {
        if (this.data[this.year] && this.data[this.year][this.month] && this.data[this.year][this.month][i]) {
          var str = '<a href="/archives/' + this.year + '/' + getName(this.months) + '/' + getName(i) + '/">' + i + '</a>';
        } else {
          var str = i;
        }
        var tmp = '<td>' + str + '</td>';
        if ((i+this.before)%7 == 0) {
          tmp += '</tr><tr>';
        }
        arr.push(tmp);
      }
      for (var i = this.days + 1; ; i++) {
        arr.push('<td class="is-empty"></td>');
        if ((i+this.before)%7 == 0) {
          break;
        }
      }
      return '<tbody><tr>' + arr.join('') + '</tr></tbody>';
    },
    renderNext: function(date, str1, str2) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var months = month + 1;
      if (this.data[year] && this.data[year][month]) {
        var tmp = '<a href="/archives/' + year + '/' + getName(months) + '/">' + str1 + ' ' + this.mons[month] + ' ' + str2 + '</a>';
        var res = '<td colspan="3">' + tmp + '</td>';
      } else {
        var res = '<td colspan="3"></td>';
      }
      return res;
    },
    renderFoot: function () {
      
      var prev = this.renderNext(new Date(this.year, this.month - 1), '&laquo;', '')
      var mid = '<td class="pad">&nbsp;</td>'
      var next = this.renderNext(new Date(this.year, this.month + 1), '', '&raquo;');
      return '<tfoot><tr>' + prev + mid + next + '</tr></tfoot>';
    },
  };
  new Pikaday();
}));
