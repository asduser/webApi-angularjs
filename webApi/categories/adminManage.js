(function(){

    angular
        .module("_webApi_")
        .constant("cat.adminManage", {

            "DATA": [

                // This methods list is just for example.
                { Url: '/api/admin/get/profile/{id}', CustomOptions: false, Method: 'get', InvokeName: 'getAdminProfileById' },
                { Url: '/api/admin/update/profile/{id}/block', CustomOptions: false, Method: 'put', InvokeName: 'blockAdminProfileById' }

            ]

        });

})();