(function(){

    "use strict";

    angular
        .module("_webApi_")
        .service("webApi.optimizer", requestOptimizer);


    function requestOptimizer(){

        /**
         * --------------------------------------------------------------------------------
         * Retrieve JSON in "key-value" type and transform it into valid $http.get request.
         * For example: { before: ['user', 'id'], after: {Page: 10, UserName: 'Bob'} }
         * will be transformed to user/id?Page=10&UserName=Bob
         * --------------------------------------------------------------------------------
         * @param {Object} getRequest
         * @returns {string}
         */
        this.modify = function(getRequest){
            var result = "";
            getRequest.before.forEach(function (i, index) {
                result += index == 0 ? i : "/" + i;
            });
            result += "?";
            for (var key in getRequest.after) {
                if (getRequest.after.hasOwnProperty(key)){
                    result += key + "=" + getRequest.after[key] + "&";
                }
            }
            // Remove the last concatenate symbol to bring existing string into a valid format.
            return result.slice(0, -1);
        };


        /**
         * --------------------------------------------------------------------------------
         * Convert template string into a suitable http-request string.
         * For example: toUrl("get-user/{id}/country", {url: {'id': 20}, data: {'title': 'Some text'} } )
         * will be converted to get-user/20/country + model in request {'title': 'Some text'}.
         * --------------------------------------------------------------------------------
         * @param {String} template
         * @param {Object} model
         * @returns {string}
         */
        this.toUrl = function(template, model){
            var result = template, url = model.url;
            if (template.indexOf("{") > -1) {
                for (var key in url) {
                    if (url.hasOwnProperty(key)) {
                        var regexp = new RegExp("{" + key + "}", "i");
                        result = result.replace(regexp, url[key]);
                    }
                }
            }
            return result;
        };


    }

})();