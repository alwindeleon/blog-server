## User

`User` Endpoint for managaing users.

### Endpoint Summary

-   `[GET]` /api/users - [Retrieve All *Users*](#Retrieve-All-Users)
-   `[POST]` /api/user - [Create a new *User*](#Create-a-new-User)
-   `[GET]` /api/user/<.id> - [Retrieve a single *User* with `id`](#Retrieve-a-single-User)
-   `[PUT]` /api/user/<.id> - [Edit a single *User* with `id`](#Edit-a-single-User)
-   `[DELETE]` /api/user/<.id> - [Delete a single *User* with `id`](#Delete-a-single-User)
-   `[GET]` /api/users/search - [Searches all *users* for multiple values](#Search-users)
-   `[POST]` /api/users/search - [Applies Advance search(like ranges, arrays) over *users* for multiple values](#Search-users)
-   `[GET]` /api/users/test - [Quick Test user](#Quick-Test-user)
-   `[POST]` /api/users - [Create bulk *User*](#Create-bulk-User)
-   `[PUT]` /api/users - [Edits bulk *User* with conditions](#Edit-bulk-User)
-   `[DELETE]` /api/users - [Delete bulk *users* in the collection](#Delete-bulk-users)




**N.B**: The `/test` endpoint of this user is for quick development testing only. Do Disable this when in production!

### SDK Summary

    - Unity >= 5
    - Angular >= 4.3

The SDKs have provider code already set

### Retrieve All Users

-   **Syntax** : `[GET] /api/users [?skip= X & limit= Y]`
-   **URL** : `/api/users`
-   **Method**: `GET`
-   **URL Params**:  
     **Required:** None  
     **Optional:**

    `skip=[Integer]` - Offsets(Skips) index of results  
     `limit=[Integer]` - Total number of results in the current request to return

-   **Success Response:**

    **Code:** 200 <br />
    **Content:**

    ```
    {
      "status": "success",
      "data": {
        "users ": [
          {"_id":"56cb91bdc3464f14678934ca","username":"lorem pisum dolor sit amet","password":"lorem pisum dolor sit amet","description":"lorem pisum dolor sit amet","profile_url":"lorem pisum dolor sit amet"},
          .
          .
          .
        ],
        "count": 1
      },
      "message": null
    }
    ```

-   **Sample Call:**

    `curl "http://localhost:3000/api/users"`  
    Fetches 5 user results skipping the first 2

-   **Notes:**

### Create a new User

-   **Syntax** : `[POST] /api/user`
-   **URL** : `/api/user`
-   **Method**: `POST`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `{user:{}}` - The base user data object

    ```
     {
       "user" : {
        {"_id":"56cb91bdc3464f14678934ca","username":"lorem pisum dolor sit amet","password":"lorem pisum dolor sit amet","description":"lorem pisum dolor sit amet","profile_url":"lorem pisum dolor sit amet"}
       }
     }
    ```

-   **Success Response:**

    **Code:** 201  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "__v": 0,
          "_id": "58713aaf1657a2bd9c5a00e0",
          username : String, 
          password : String, 
          description : String, 
          profile_url : String
          
        },
        "message": null
      }
    ```

-   **Error Response:**

    **Code:** 500 <br />
    **Content:**

    ```
      {
        "status": "error",
        "data": "Invalid user/key model provided",
        "message": "There was an error saving this data."
      }
    ```

-   **Sample Call:**

    ```
        curl -X POST -H "Content-Type: application/json"
          -H "Cache-Control: no-cache" -d     '{
          "user":{
              "name":"pen",
              "price":2.54
              }
          }' "http://localhost:3000/api/user"

    ```

    The key model being `user` the saves a 'pen' data

-   **Notes:**

### Retrieve a single User

-   **Syntax** : `[GET] /api/user/:id`
-   **URL** : `/api/user/:id`
-   **Method**: `GET`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the user  


-   **Success Response:**

    **Code:** 200  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          username : String, 
          password : String, 
          description : String, 
          profile_url : String
          
        },
        "message": null
      }
    ```

-   **Error Response:**

    **Code:** 404  
     **Content:**

    ```
      {
        "status": "error",
        "data": 404,
        "message": "Not Found Error"
      }
    ```

-   **Sample Call:**

    ```
        curl -X GET -H "Content-Type: application/json"
          -H "Cache-Control: no-cache"
          "http://localhost:3000/api/user/587100001657a2bd9c5a00d"

    ```

    Fetches a single user from the collection `users`

-   **Notes:**

### Edit a single User

-   **Syntax** : `[PUT] /api/user/:id`
-   **URL** : `/api/user/:id`
-   **Method**: `PUT`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the user  
     `{user:{}}` - The base user data object that needs to be changed

    ```
     {
       "user" : {
         username : String, 
         password : String, 
         description : String, 
         profile_url : String
         
       }
     }
    ```

-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          username : String, 
          password : String, 
          description : String, 
          profile_url : String
          
        },
        "message": null
      }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
      {
        "status": "error",
        "data": "Invalid user/key model provided",
        "message": "There was an error updating this data."
      }
    ```

    **Code:** 404  
     **Content:**

    ```
    {
      "status": "error",
      "data": 404,
      "message": "No Data Found"
    }
    ```

-   **Sample Call:**

    ```
        curl -X PUT -H "Content-Type: application/json"
          -H "Cache-Control: no-cache"
          -d '{
                "user22":{
                    "name":"sharpner",
                    "price":2.55
                  }
              }' "http://localhost:3000/api/user/587100001657a2bd9c5a00df"

    ```

    The key model being `user` which updates a 'sharpner' data

-   **Notes:**

### Delete a single User

-   **Syntax** : `[DELETE] /api/user/:id`
-   **URL** : `/api/user/:id`
-   **Method**: `DELETE`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the user

-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
    {
      "status": "success",
      "data": "The user got Deleted",
      "message": null
    }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
      {
      "status": "error",
      "data": "Error in deleting this user",
      "message": {
        .
        .
        .
      }
    }
    ```

-   **Sample Call:**

    ```
      curl -X DELETE "http://localhost:3000/api/user/58713b0a1657a2bd9c5ad"
    ```

    The key model being `user` which updates a 'sharpner' data

-   **Notes:**

### Delete all Users

-   **Syntax** : `[DELETE] /api/users`
-   **URL** : `/api/users`
-   **Method**: `DELETE`
-   **URL Params**:  
     **Optional:** None  
     **Required:** None
-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
     {
       "status": "success",
       "data": "All users got Delete",
       "message": null
     }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
       {
         "status": "error",
         "data": "Error in deleting all users",
         "message": {
           .
           .
           .
         }
       }
    ```

-   **Sample Call:**

    ```
      curl -X DELETE "http://localhost:3000/api/users"
    ```

    The key model being `user` which updates a 'sharpner' data

-   **Notes:**

### Search Users

-   **Syntax** : `[GET] /api/users/search [?skip= X & limit= Y & keyword= field:value [,field:value]]`
-   **URL** : `/api/users/search`
-   **Method**: `GET`
-   **URL Params**:  
     **Required:** keyword  
     **Optional:**

    `skip=[Integer]` - Offsets(Skips) index of results  
     `limit=[Integer]` - Total number of results in the current request to return
    `keyword=[CSV]` - keyword = field1:value1, filed2:value2 ...
    `strict=[Boolean]` - Performs Strict search.

-   **Success Response:**

    **Code:** 200 <br />
    **Content:**

    ```
    {
      "status": "success",
      "data": {
        "users": [
          {
            "_id": "587100001657a2bd9c5a00df",
            name : String,
        price : Number,
            "__v": 0
          },
          .
          .
          .
        ],
        "count": 1
      },
      "message": null
    }
    ```

-   **Sample Call:**

    `curl "http://localhost:3000/api/users/search?keyword=first:Sam,last:Jones"`  
    Searches users with rows with its first name 'Sam' and last name 'Jones'

-   **Notes:**
    To use Strict Search, add param ?strict=true
