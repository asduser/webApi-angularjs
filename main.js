(function(){

    "use strict";

    angular
        .module("myApp", ["_webApi_"])
        .controller("myCtrl", myCtrl);

    /**
     * Declare a main controller.
     * @param $scope
     * @param {"webApi"} webApi
     */
    function myCtrl($scope, webApi){

        // This is just test data to represent a current version of webApi library.
        // To edit an existing request go to the "webApi.requests" service.

        // e.g. # 1
        // webApi.getNews([]).success(function(data){ some actions...  });

        // e.g. # 2
        // webApi.deleteNews( {url: {id: 10} } ).success(function(data){ some actions...  });

    }

    // Ioc container.
    myCtrl.$inject = [
        "$scope",
        "webApi"
    ];

})();