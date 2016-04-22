(function(){

    angular
        .module("_webApi_")
        .service("webApi", webApi);

    /**
     * Declare API provider to work with server-side.
     * @param {Object} $http
     * @param {"webApi.requests"} webApiRequests
     * @param {"webApi.scenarios"} webApiScenarios
     * @param {"webApi.constants"} webApiConstants
     * @param {"webApi.optimizer"} optimizer
     */
    function webApi($http, webApiRequests, webApiScenarios, webApiConstants, optimizer) {

        var DOMAIN = webApiConstants.DOMAIN;
        // Load all actions to work with server-side API.
        var actionList = webApiRequests.load();
        // Inherit webApi methods to allow user invoke it manually within app.
        webApiScenarios.inject(createRequest, this);

        /**
         * Derive type of http method and generate appropriate request with promise.
         * @param action {String}
         * @param params {Array}
         * @param opts {Object}
         * @returns {*}
         */
        function createRequest(action, params, opts) {
            var method = defineHttpProperty(action, "Method");
            if (!angular.isArray(params)) {
                return formatRequest(method).object(action, params, opts);
            } else {
                return formatRequest(method).array(action, params, opts);
            }
            //return $http[method](request, opts);
        }

        /**
         * Compare received string and get identical Method or Name from settings-list.
         * @param str {String}
         * @param prop {String}
         * @returns {string}
         */
        function defineHttpProperty(str, prop) {
            var result = actionList.filter(function (i) {
                return str == i.InvokeName;
            });
            return prop == "Url" ? result.shift().Url : result.shift().Method;
        }

        /**
         * If get request must be with many parameters in url like this: '../get-user-info/2/name',
         * transform all params from derived Array into special request-type.
         * @param params
         * @returns {string}
         */
        function definePrefix(params) {
            var result = "";
            params.forEach(function (i, index) {
                if (typeof i !== "object") {
                    result += index == 0 ? i : "/" + i;
                }            
            });
            return result;
        }

        /**
         * Define request type ('post'\'get' etc.) and generate appropriate http-request
         * according to received parameters type ('object' or 'array').
         * @param {String} type
         * @returns {{array: array, object: Object}}
         */
        function formatRequest(type){
            return {
                array: function (action, params, opts) {
                    return $http.get(DOMAIN + defineHttpProperty(action, "Url") + definePrefix(params), opts);
                },
                object: function (action, params, opts) {

                    var template = actionList.find(function(el){ return el.Url.indexOf('{') > -1 && el.InvokeName == action; });

                    if (template) {
                        switch (type) {
                            case "get":
                            case "delete":
                                return $http[type](DOMAIN + optimizer.toUrl(template.Url, params), opts);
                                break;
                            default:
                                return $http[type](DOMAIN + optimizer.toUrl(template.Url, params), params.data, opts);
                                break;
                        }
                    } else {
                        switch (type) {
                            case "get":
                                return $http[type](DOMAIN + defineHttpProperty(action, "Url") + optimizer.modify(params), opts);
                                break;
                            default:
                                return $http[type](DOMAIN + defineHttpProperty(action, "Url"), params, opts);
                                break;
                        }
                    }
                }
            };
        }

    }

    // Ioc container.
    webApi.$inject = [
        "$http",
        "webApi.requests",
        "webApi.scenarios",
        "webApi.constants",
        "webApi.optimizer"
    ];

})();