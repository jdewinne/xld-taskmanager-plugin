angular.module('TaskApp')
    .factory('TasksService', function(xJsonHttp, xlDeployServicesRoot) {
        return {
            loadTaskList: function() {
                return xJsonHttp.get(xlDeployServicesRoot + 'tasks/v2/current/all', null, false);
            },
            loadTask: function(taskId) {
                return xJsonHttp.get(xlDeployServicesRoot + 'tasks/v2/' + taskId + '/block/0_1_1', null, false);
            }
        };
    });