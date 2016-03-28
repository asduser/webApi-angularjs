# webApi-angularjs
webApi client-side implementation using Angular.js

###  Purpose

A special Angular.js module to improve management and handling http-requests relationship between client and serveer.
 
All that you need - just modify <b>DOMAIN url</b> in <i>"config"</i>, thereafter add a list of htt-requests into <i>"requests"</i> according to the specified format.

### Advantages

<ol>
<li> Simple to manage, scale. </li>
<li> Has a special GET formatter to allow user work with objects inside $http.get methods. </li>
<li> Independent module which may be integrated into any Angular.js application. </li>
</ol>

### How to use

Inject module into your Angular.js application:

```javascript
// ...
angular.module('myApp', ['_webApi_']);
// ...
```

To edit any global parameter use "<i>config/webApiConstants.js</i>" file. First of all, you need to change the DOMAIN field:

```javascript
"DOMAIN": "http:// {YourApiUrl} /",
```

Edit "<i>main/requests.js</i>" to add a new webApi methods into your app:

```javascript
{ Url: 'api/users/get-all', CustomOptions: false, Method: 'get', InvokeName: 'getUsers' }
```

<b> Url </b> - existing api-method to send http-request.

<b> CustomOptions </b> - true\false to use a 3-rd 'options' parameter in requests. This is helpful when you need use a specific CORS modificators. See examples for details.

<b> Method </b> - type of http-method (GET, POST, PUT, DELETE, UPDATE etc.).

<b> InvokeName </b> - internal method name to invoke it within application and establish a connection with webApi module.

### Samples

DOMAIN: http://yourdomain.com/ 

#### *** GET-methods ***

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

#### *** POST-methods ***

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


#### *** PUT-methods ***
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


#### *** DELETE-methods ***
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


#### *** Sending a request options ***

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