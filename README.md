# webApi-angularjs
RESTful webApi module using Angular.js.

## How to use

1. Go to *webApi/categories/* directory.
2. Create a new file, which will be responsible for some functional requests group to work with API. For example: if you have a lot of similar requests which contain some repeating code, just include them into appropriate category ( 'api/food/manage/{id}/delete', 'api/food/manage/{id}/update' -> *foodManage.js*).
3. Fill each request using an existing template (see '*webApi/categories/account.js*' file).
4. Then add your created constant name into '*webApi/categories-handler/requests.js*'.
5. Now you may use new methods in application via special "InvokeName" parameter.
6. To edit APi settings use *"config/webApiSettings.js"* file.

## Samples

DOMAIN: http://yourdomain.com/ 

### *** GET. Case #1 ***

```javascript

// url -> http://yourdomain.com/admin/news/

// request
{ Url: 'admin/news/', CustomOptions: false, Method: 'get', InvokeName: 'getNews' }

// Invoke method.
webApi.getNews([]).success( // ...some actions...

```

### *** GET. Case #2 ***

```javascript

// url -> http://yourdomain.com/admin/news/3

// Declare request.
{ Url: 'admin/news/', CustomOptions: false, Method: 'get', InvokeName: 'getNewsDetailsById' }

// Invoke method.
webApi.getNewsDetailsById([3]).success( // ...some actions...

```

### *** GET. Case #3 ***

```javascript

// url -> http://yourdomain.com/admin/news/3/title

// Declare request.
{ Url: 'admin/news/{id}/title', CustomOptions: false, Method: 'get', InvokeName: 'getNewsDetailsById' }

// Invoke method.
webApi.getNewsDetailsById({
  url: { id: 3}
}).success( // ...some actions...

```

### *** GET. Case #4 ***

```javascript

// url -> http://yourdomain.com/admin/news/10?category=sport&period=week

// Declare request.
{ Url: 'admin/news', CustomOptions: false, Method: 'get', InvokeName: 'getNewsDetailsById' }

// Invoke method and specify an appropriate arguments.
webApi.getNewsDetailsById({
  before: ['10'],
  after: { "category": "sport", "period": "week" }
}).success( // ...some actions...

```

### *** DELETE. Case #1 ***

```javascript

// url -> http://yourdomain.com/admin/delete-user/10

// Declare request.
{ Url: 'admin/delete-user/{id}', CustomOptions: false, Method: 'delete', InvokeName: 'deleteUser' }

// Invoke method.
webApi.updateUser({
  url: { "id": 10 }
}).success( // ...some actions...

```

### *** POST, PUT, UPDATE. Case #1 ***

```javascript

// url -> http://yourdomain.com/api/login
// model -> { Login: "test", Password: "test1" }

// Declare request.
{ Url: 'api/login', CustomOptions: false, Method: 'post', InvokeName: 'login' }

// Invoke method.
var request = {
  Login: "test",
  Password: "test1"
};
webApi.login(request).success( // ...some actions...

```

### *** POST, PUT, UPDATE. Case #2 ***

```javascript

// url -> http://yourdomain.com/admin/manage/10/update
// model -> { "name": "Bob", "age": 20 }

// Declare request.
{ Url: 'admin/manage/{id}/{action}', CustomOptions: false, Method: 'put', InvokeName: 'updateUser' }

// Invoke method.
webApi.updateUser({
  url: { "id": 10, "action": "update" },
  data: { "name": "Bob", "age": 20 }
}).success( // ...some actions...

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
