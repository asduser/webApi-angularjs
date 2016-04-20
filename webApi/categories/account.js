(function(){

    angular
        .module("_webApi_")
        .constant("cat.account", {

            "DATA": [

                // This methods list is just for example.
                { Url: '/api/acc/login', CustomOptions: false, Method: 'post', InvokeName: 'login' },
                { Url: '/api/acc/logout', CustomOptions: false, Method: 'get', InvokeName: 'logout' }

            ]

        });

})();