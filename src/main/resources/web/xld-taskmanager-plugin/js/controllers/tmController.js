angular.module('TaskApp').controller('TaskManagerController', ['$log','$rootScope', '$window', '$scope', '$q', '$timeout', 'TasksService',
    function ($log, $rootScope, $window, $scope, $q, $timeout, TasksService) {

        $scope.emptyTaskList = false;
        $scope.taskList = [];
        $scope.detailedTask = null;

        $scope.showRefreshButton = function () {
            return true;
        };

        $scope.isEmptyTaskList = function () {
            return $scope.emptyTaskList;
        };

        $scope.loadTaskList = function () {
            TasksService.loadTaskList()
                .then(function (tasks) {
                    $log.debug("Received: " + tasks);
                    if (typeof tasks === 'undefined' || tasks.length == 0) {
                        $scope.emptyTaskList = true;
                    }
                    $scope.taskList = tasks;
                }, function (error) {
                    $log.debug("Received error: " + error);
                });
        };

        $scope.loadTaskDetails = function (task) {
            TasksService.loadTask(task.id)
                .then(function (taskDetail) {
                    $scope.detailedTask = taskDetail;
                });
        }

    }]);