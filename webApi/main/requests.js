(function(){

    angular
        .module("_webApi_")
        .service("webApi.requests", webApiRequests);

    function webApiRequests(){

        /**
         * Return all API methods.
         * @returns {{Url: string, CustomOptions: boolean, Method: string, InvokeName: string}[]}
         */
        this.load = function(){
        return [

            // Working methods, use webApi[InvokeName] to invoke it.

            { Url: 'admin/news/', CustomOptions: true, Method: 'get', InvokeName: 'getNews' },
            { Url: '/admin/manage/{id}', CustomOptions: true, Method: 'put', InvokeName: 'manageAdmin' },
            { Url: '/admin/news/{id}', CustomOptions: false, Method: 'delete', InvokeName: 'deleteNews' }

        ];
    };

    }

})();