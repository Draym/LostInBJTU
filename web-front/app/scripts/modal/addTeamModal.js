/**
 * Created by kevin on 02/05/2017.
 */

angular.module('LostInBJTUApp')
  .controller('AddTeamModalCtrl', function ($scope, $location, $uibModalInstance, RequestAPI, SubmitResult) {
    $scope.change = {members: []};
    $scope.isBusy = false;

    $scope.quit = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.create = function () {
      $scope.isBusy = true;
      RequestAPI.POST("/team", $scope.change, SubmitResult.submitSuccess(function (response) {
          $scope.initMain();
          $scope.quit();
        }, "Team created!"),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }));
    };
  });
