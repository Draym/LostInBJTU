'use strict';

/**
 * @ngdoc function
 * @name LostInBJTUApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the LostInBJTUApp
 */
angular.module('LostInBJTUApp')
  .controller('MainCtrl', function ($scope, $uibModal, $location, RequestAPI, SubmitResult) {

    $scope.teams = [];
    $scope.change = {};
    $scope.focus = -1;
    $scope.isBusy = false;


    $scope.openAddTeamModal = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/team/addTeamModal.html',
        controller: 'AddTeamModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };

    $scope.transformChanges = function(data) {
      return {
        _id: data._id,
        teamName: data.teamName,
        projectName: data.projectName,
        rating: data.rating,
        members: JSON.stringify(data.members)
      };
    };

    $scope.saveChanges = function () {
      $scope.isBusy = true;
      RequestAPI.PUT("/team", $scope.transformChanges($scope.change), SubmitResult.submitSuccess(function (response) {
          $scope.initMain();
        }, "Team updated!"),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }));
    };

    $scope.cancelChanges = function () {
      $scope.change = {
        teamName: $scope.teams[$scope.focus].teamName,
        projectName: $scope.teams[$scope.focus].projectName,
        members: $scope.teams[$scope.focus].members,
        rating: $scope.teams[$scope.focus].rating
      };
    };

    $scope.initMain = function () {
      $scope.isBusy = true;
      RequestAPI.GET("/team", SubmitResult.submitSuccess(function (response) {
          $scope.teams = response.data;
          $scope.isBusy = false;
        }),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }));
    };

    $scope.initMain();

    // MANAGE TEAM
    $scope.detailTeam = function (i) {
      if (i == $scope.focus) {
        $scope.focus = -1;
        $scope.change = {};
      } else {
        $scope.focus = i;
        $scope.change = {
          teamName: $scope.teams[i].teamName,
          projectName: $scope.teams[i].projectName,
          members: $scope.teams[i].members,
          rating: $scope.teams[i].rating,
          _id: $scope.teams[i]._id
        };
      }
    };

    $scope.deleteTeam = function (index) {
      RequestAPI.DELETE("/team", SubmitResult.submitSuccess(function (response) {
          $scope.initMain();
          $scope.focus = -1;
        }),
        SubmitResult.submitFailure(), {id: $scope.teams[index]._id});
    };


    // MANAGE MEMBERS IN TEAM
    $scope.addMember = function (container) {
      container.push({name: ""});
    };

    $scope.removeMember = function (container, index) {
      container.splice(index, 1);
    };


    $scope.moveMember = function (container, index, mode) {
      var tmp;

      if (mode == "down" && index != container.length - 1) {
        tmp = container[index + 1];
        container[index + 1] = container[index];
        container[index] = tmp;
      }
      else if (mode == "up" && index != 0) {
        tmp = container[index - 1];
        container[index - 1] = container[index];
        container[index] = tmp;
      }
    };
  });
