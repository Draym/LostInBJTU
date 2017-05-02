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

    $scope.openAddTeamModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/team/addTeamModal.html',
        controller: 'AddTeamModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };

    $scope.detailTeam = function(i) {
      if (i == $scope.focus) {
        $scope.focus = -1;
        $scope.change = {};
      } else {
        $scope.focus = i;
        $scope.change = {teamName: $scope.teams[i].teamName, projectName:$scope.teams[i].projectName, members: $scope.teams[i].members, rating: $scope.teams[i].rating, _id: $scope.teams[i]._id};
      }
    };

    $scope.saveChanges = function() {
      RequestAPI.PUT("/team", $scope.change, SubmitResult.submitSuccess(function (response) {
        $scope.init();
        }, "Team updated!"),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }));
    };

    $scope.cancelChanges = function() {
      $scope.change = {teamName: $scope.teams[$scope.focus].teamName, projectName:$scope.teams[$scope.focus].projectName, members: $scope.teams[$scope.focus].members, rating: $scope.teams[$scope.focus].rating};
    };

    $scope.initMain = function () {
      RequestAPI.GET("/team", SubmitResult.submitSuccess(function (response) {
        console.log(response)
        $scope.teams = response.data.teams;
        }),
        SubmitResult.submitFailure());
    };

    $scope.initMain();

  });
