(function(){

    angular
        .module("_webApi_")
        .constant("cat.adminManage", {

            "DATA": [

                // This methods list is just for example.
                { Url: '/api/admin/delete/profile/{id}', CustomOptions: false, Method: 'delete', InvokeName: 'deleteAdminProfileById' },
                { Url: '/api/admin/update/profile/{id}/block', CustomOptions: false, Method: 'put', InvokeName: 'blockAdminProfileById' }

            ]

        });

})();