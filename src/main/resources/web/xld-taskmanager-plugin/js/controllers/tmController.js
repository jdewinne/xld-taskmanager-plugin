angular.module('TaskApp').controller('TaskManagerController', ['$log','$rootScope', '$window', '$scope', '$q', '$timeout', 'TasksService',
    function ($log, $rootScope, $window, $scope, $q, $timeout, TasksService) {

        $scope.emptyTaskList = false;
        $scope.taskList = [];
        $scope.detailedTask = null;
        $scope.detailedTaskTreeModel = [];
        $scope.treeModel="[]";

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

        function addTaskBlock(block, blockId, detailedTaskTreeModel) {
            var children = []
            var treeNode = {id:blockId, path:blockId, label:block.description + " - " + block.state, classType:"versionClass", idDom:blockId, children:children};
            detailedTaskTreeModel.push(treeNode);
            if (!_.isEmpty(block.blocks)) {
                for (var i = 0; i < block.blocks.length; i++) {
                    addTaskBlock(block.blocks[i], blockId + "_" + i, children);
                }
            }
            if (!_.isEmpty(block.steps)) {
                for (var i = 0; i < block.steps.length; i++) {
                    addTaskStep(block.steps[i], blockId + "_" + i, children);
                }
            }
        }

        function addTaskStep(step, stepId, detailedTaskTreeModel) {
            var treeNode = {id:stepId, path:stepId, label:step.description + " - " + step.state, classType:"versionClass", idDom:stepId};
            detailedTaskTreeModel.push(treeNode);
        }


        function loadDetailedTaskTreeModel() {
            var detailedTaskTreeModel = [];
            if (!_.isEmpty($scope.detailedTask.blocks)) {
                for (var i = 0; i < $scope.detailedTask.blocks.length; i++) {
                    addTaskBlock($scope.detailedTask.blocks[i], i, detailedTaskTreeModel);
                }
            }
            if (!_.isEmpty($scope.detailedTask.steps)) {
                for (var i = 0; i < $scope.detailedTask.steps.length; i++) {
                    addTaskStep($scope.detailedTask.steps[i], i, detailedTaskTreeModel);
                }
            }

            return detailedTaskTreeModel;

        }

        $scope.loadTaskDetails = function (task) {
            TasksService.loadTask(task.id)
                .then(function (taskDetail) {
                    $scope.detailedTask = taskDetail;
                    $scope.treeModel=loadDetailedTaskTreeModel();
                });
        };

        // Widget tree view

        $scope.counter = 1;

        $scope.findNodeChildren = function (node) {
            var deferred = $q.defer();

            deferred.resolve([{
                "id": "id_Applications/asdfs/" + $scope.counter,
                "path": "Applications/asdfs/" + $scope.counter,
                "label": 'Child ' + $scope.counter,
                "classType": "versionClass",
                "idDom": "id_Applications-asdfs-" + $scope.counter,
                "children": []
            }]);

            $scope.counter++;

            return deferred.promise;
        };


        $scope.treeOptions = {
            clickAction: function (node) {
                console.log('node ' + node + ' is clicked');
            },
            dblClickAction: function (node) {
                console.log('node ' + node + ' is double clicked');
            }
        };

    }]);