(function(){

    angular
        .module("_webApi_")
        .service("webApi.requests", webApiRequests);

    function webApiRequests(catAccount, catAdminManage){

        /**
         * Obtain the arguments collection, which should contain a suitable request groups.
         * Then via special iterator check each group DATA and retrieve the list of requests.
         * Thus, the result will be a concatenated array of objects.
         * @type {Array}
         */
        var data = [];
        [].slice.call(arguments).forEach(function(arg){
            arg.DATA.forEach(function(r){
                data.push(r);
            });
        });

        /**
         * Return all API methods.
         * @returns {{Url: string, CustomOptions: boolean, Method: string, InvokeName: string}[]}
         */
        this.load = function(){

            return data;

        };

    }

    // IoC container.
    webApiRequests.$inject = [
        "cat.account",
        "cat.adminManage"
    ];

})();