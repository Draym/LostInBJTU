'use strict';

/**
 * @ngdoc service
 * @name LostInBJTUApp.dateTools
 * @description
 * # dateTools
 * Factory in the LostInBJTUApp.
 */
angular.module('LostInBJTUApp')
  .factory('DateTools', function () {

    return {
      addSecondsToCurrentDate: function (seconds) {
        var date = new Date();
        date.setSeconds(date.getSeconds() + seconds);
        return date;
      },
      addMinutesToCurrentDate: function (minutes) {
        var date = new Date();
        date.setMinutes(date.getMinutes() + minutes);
        return date;
      },
      diffBySeconds: function (date1, date2) {
        return (date2 - date1) / 1000;
      }
    };
  });
