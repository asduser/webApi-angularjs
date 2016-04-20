# webApi-angularjs
RESTful webApi module using Angular.js.

## Advantages

<ol>
<li> Simple to manage, scalable. </li>
<li> Has a special formatter which allows user to work with objects inside $http methods. </li>
<li> Independent module which may be integrated into different Angular.js application. </li>
</ol>

## Installation

Inject module into your Angular.js application:

```javascript
// ...
angular.module('myApp', ['_webApi_']);
// ...
```

To edit any global parameter use *"config/webApiConstants.js"* file. First of all, you need to change the DOMAIN field:

```javascript
"DOMAIN": "http:// {YourApiUrl} /",
```

Edit *"main/requests.js"* to add a new webApi methods into your app:

```javascript
{ Url: 'api/users/get-all', CustomOptions: false, Method: 'get', InvokeName: 'getUsers' }
```

<b> Url </b> - existing api-method to send http-request.

<b> CustomOptions </b> - true\false to use a 3-rd 'options' parameter in requests. This is helpful when you need use a specific CORS modificators. See examples for details.

<b> Method </b> - type of http-method (GET, POST, PUT, DELETE, UPDATE etc.).

<b> InvokeName </b> - internal method name to invoke it within application and establish a connection with webApi module.

## How to use

1. Go to *webApi/categories/* directory.
2. Create a new file, which will be responsible for some functional requests group to work with API. For example: if you have a lot of similar requests which contain some repeating code, just include them into appropriate category ( 'api/food/manage/{id}/delete', 'api/food/manage/{id}/update' -> *foodManage.js*).
3. Fill each request using an existing template (see '*webApi/categories/account.js*' file).
4. Then add your created constant name into '*webApi/categories-handler/requests.js*'.
5. Now you may use new methods in application via special "InvokeName" parameter.

In controller:

```javascript

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

```

## Samples

DOMAIN: http://yourdomain.com/ 

### *** GET-methods ***

```javascript
/**************************/
/* Get all existing news. */
/**************************/

// Declare request.
{ Url: 'admin/news/', CustomOptions: false, Method: 'get', InvokeName: 'getNews' }

// Invoke method and specify an appropriate arguments.
webApi.getNews([]).success( // ...some actions...

// Your request is: http://yourdomain.com/admin/news/


/*************************************/
/* Get news details by specified ID. */
/*************************************/

// Declare request. Case # 1.
{ Url: 'admin/news/', CustomOptions: false, Method: 'get', InvokeName: 'getNewsDetailsById' }

// Invoke method and specify an appropriate arguments.
webApi.getNewsDetailsById([3]).success( // ...some actions...

// Your request is: http://yourdomain.com/admin/news/3


// Declare request. Case # 2.
{ Url: 'admin/news/{id}/title', CustomOptions: false, Method: 'get', InvokeName: 'getNewsDetailsById' }

// Invoke method and specify an appropriate arguments.
webApi.getNewsDetailsById({
  url: { id: 3}
}).success( // ...some actions...

// Your request is: http://yourdomain.com/admin/news/3/title


// Declare request. Case # 3.
{ Url: 'admin/news', CustomOptions: false, Method: 'get', InvokeName: 'getNewsDetailsById' }

// Invoke method and specify an appropriate arguments.
webApi.getNewsDetailsById({
  before: ['10'],
  after: { "category": "sport", "period": "week" }
}).success( // ...some actions...

// Your request is: http://yourdomain.com/admin/news/10?category=sport&period=week

```

### *** POST-methods ***

```javascript
/*************************************/
/* Login into account. */
/*************************************/

// Declare request.
{ Url: 'api/login', CustomOptions: false, Method: 'post', InvokeName: 'login' }

// Invoke method and specify an appropriate arguments.
var request = {
  Login: "test",
  Password: "test1"
};
webApi.login(request).success( // ...some actions...

// Your request is: http://yourdomain.com/api/login
// Request model is: { Login: "test", Password: "test1" }

```

### *** PUT-methods ***

```javascript
/*************************************/
/* Update user details. */
/*************************************/

// Declare request.
{ Url: 'admin/manage/{id}/{action}', CustomOptions: false, Method: 'put', InvokeName: 'updateUser' }

// Invoke method and specify an appropriate arguments.
webApi.updateUser({
  url: { "id": 10, "action": "update" },
  data: { "name": "Bob", "age": 20 }
}).success( // ...some actions...

// Your request is: http://yourdomain.com/admin/manage/10/update
// Request model is: { "name": "Bob", "age": 20 }

```

### *** DELETE-methods ***

```javascript
/*************************************/
/* Delete user. */
/*************************************/

// Declare request.
{ Url: 'admin/delete-user/{id}', CustomOptions: false, Method: 'delete', InvokeName: 'deleteUser' }

// Invoke method and specify an appropriate arguments.
webApi.updateUser({
  url: { "id": 10 }
}).success( // ...some actions...

// Your request is: http://yourdomain.com/admin/delete-user/10

```

### *** Sending a request options ***

To send a specific request options, foremost <u>CustomOptions: <b>true</b></u>. in "<i>requests.js</i>". Then use a following syntax:
You may specify there 'headers', 'responseType', 'timeout' etc. See https://docs.angularjs.org/api/ng/service/$http in section "Arguments" for details.

<u>Case # 1.</u>
Inside array, the last argument - is an option object. <u>Example:</u> 
```javascript
webApi.getUserInfo([10, {"headers": {"Content-Type": "text/plain"} } ]);

```

<u>Case # 2.</u>
If using an object, just designate an appropriate field within request. <u>Example:</u> 

```javascript
webApi.login({
  Login:'user',
  Password: 'pass',
  options: {"timeout": 100}
});
```
