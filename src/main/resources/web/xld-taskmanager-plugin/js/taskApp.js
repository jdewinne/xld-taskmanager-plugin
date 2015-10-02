var app = angular.module('TaskApp', ['ngResource', 'ui.bootstrap', 'xl.components', 'xl.templates']);

app.config(
    function ($httpProvider, $locationProvider) {
        if(parent && typeof parent.getAuthToken === 'function') $httpProvider.defaults.headers.common.Authorization = parent.getAuthToken()

        $locationProvider.html5Mode(true);
    })
    .constant('pollingInterval', 1000)
    .constant('enablePollingSequence', true)
    .constant('xlDeployServicesRoot', '../deployit/')
    .constant('xlExtApiServicesRoot', '../api/extension/')
    .constant('xlDeployBlockRoot','0_1_1');
