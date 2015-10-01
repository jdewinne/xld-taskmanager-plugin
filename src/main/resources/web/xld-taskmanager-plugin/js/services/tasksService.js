angular.module('TaskApp')
    .factory('TasksService', function(xJsonHttp, xlDeployServicesRoot, xlDeployBlockRoot) {
        return {
            loadTaskList: function() {
                return xJsonHttp.get(xlDeployServicesRoot + 'tasks/v2/current/all', null, false);
            },
            loadTask: function(taskId) {
                return xJsonHttp.get(xlDeployServicesRoot + 'tasks/v2/' + taskId + '/block/' + xlDeployBlockRoot, null, false);
            }
        };
    });