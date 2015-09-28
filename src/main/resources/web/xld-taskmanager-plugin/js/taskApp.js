var app = angular.module('TaskApp', ['ngResource', 'ui.bootstrap']);

app.config(
    function ($httpProvider, $locationProvider) {
        if(parent && typeof parent.getAuthToken === 'function') $httpProvider.defaults.headers.common.Authorization = parent.getAuthToken()

        $locationProvider.html5Mode(true);
    })
    .constant('pollingInterval', 1000)
    .constant('enablePollingSequence', true)
    .constant('xlDeployServicesRoot', '../deployit/')
    .constant('xlExtApiServicesRoot', '../api/extension/');



function renderTask(taskData) {
    if( validateUser(myUsername, myPassword) == 1 ) {
        return $.ajax({
            type: "GET",
            url: "/deployit/tasks/v2/" + taskData.id + "/block/0_1_1",
            username: myUsername,
            password: myPassword,
            dataType: "json",
            success: function ( data, status, jqXHR ) {
                html="";
                html=html + "<h4>" + data.state + " - ";
                html=html + data.description + "</h4>";
                return html;
            }
        })
    }
}

function getAllTasks() {
    if( validateUser(myUsername, myPassword) == 1 ) {
        $.ajax({
            type: "GET",
            url: "/deployit/tasks/v2/current/all",
            username: myUsername,
            password: myPassword,
            dataType: "json",
            success: function ( data, status, jqXHR ) {
                html="";
                for( i = 0; i < data.length; i++ ) {
                    html=html + "<div data-role=\"collapsible\" data-theme=\"a\">";
                    html=html + renderTask(data[i]);
                    //var steps = data[i].block.steps;
                    //for( j=0; j < steps.length; j++ ) {
                    //    html=html + "<div data-role=\"collapsible\" data-theme=\"b\"><h2>" + steps[j].state;
                    //    html=html + " - " + steps[j].description + "</h2>";
                    //    html=html + "<code>" + steps[j].log + "</code>";
                    //    html=html + "</div>";
                    //}
                    html=html + "</div>";
                }

                $("#task-list-empty").hide();
                $("#taskList").show();
                $("#taskList").html(html).collapsibleset("refresh");
            },
            error: function( jqXHR, textStatus, errorThrown) {
                $("#task-list-empty").show();
                $("#taskList").hide();
            }
        });
    } else {
        $.mobile.changePage($("#login"),"slide");
    }
}
