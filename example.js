(function(){

    "use strict";

    angular
        .module("myApp", ["_webApi_"])
        .controller("MyController", MyCtrl);

    function MyCtrl($scope, webApi){

        window._webApi = webApi;

    }

    MyCtrl.$inject = [
        "$scope",
        "webApi"
    ];

})();