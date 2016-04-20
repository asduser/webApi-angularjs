(function(){

    angular
        .module("_webApi_")
        .service("webApi.scenarios", webApiScenarios);

    /**
     * Scenarios to manage all http-requests from the storage.
     * @param {Object} webApiRequests
     */
    function webApiScenarios(webApiRequests){

        /** ---------------------------------------------------------------------------
         * This service generates all exists methods to work with webApi and provide them
         * into the main core to calls each of them directly from app.
         ** ---------------------------------------------------------------------------
         */

        /**
         * Retrieve a special http-request generator scenario and load webApi methods into the parent scope.
         * @param createRequest {Function}
         * @param scope {Object}
         * @returns {*}
         */
        this.inject = function(createRequest, scope){

            var requests = webApiRequests.load(),
                methods = getMethods(),
                scenarios = getAll();

            // Iterate all properties and spread children methods into the parent scope.
            for (var i in scenarios) {
                if (scenarios.hasOwnProperty(i)){
                    scope[i] = scenarios[i];
                }
            }

            /**
             * Obtain temporary object with http-methods to further work with property inheritance.
             * @returns {{}}
             */
            function getAll() {
                var obj = {};
                methods.forEach(function(m){
                    obj[m] = function(params){
                        var currentRequest = requests.filter(function(req){
                            return req.InvokeName == m;
                        });
                        var opts = currentRequest[0].CustomOptions && params.options || currentRequest[0].CustomOptions && params[params.length-1];                        
                        return createRequest(m, params, opts);
                    }
                });
                return obj;
            }

            /**
             * Retrieve an appropriate collection of existing http-methods.
             * @returns {Array}
             */
            function getMethods(){
                var result = [];
                requests.forEach(function(i){
                    result.push(i.InvokeName);
                });
                return result;
            }

        };

    }

    // Ioc container.
    webApiScenarios.$inject = ["webApi.requests"];

})();
