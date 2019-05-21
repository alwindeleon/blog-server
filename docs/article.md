## Article

`Article` Endpoint for managaing articles.

### Endpoint Summary

-   `[GET]` /api/articles - [Retrieve All *Articles*](#Retrieve-All-Articles)
-   `[POST]` /api/article - [Create a new *Article*](#Create-a-new-Article)
-   `[GET]` /api/article/<.id> - [Retrieve a single *Article* with `id`](#Retrieve-a-single-Article)
-   `[PUT]` /api/article/<.id> - [Edit a single *Article* with `id`](#Edit-a-single-Article)
-   `[DELETE]` /api/article/<.id> - [Delete a single *Article* with `id`](#Delete-a-single-Article)
-   `[GET]` /api/articles/search - [Searches all *articles* for multiple values](#Search-articles)
-   `[POST]` /api/articles/search - [Applies Advance search(like ranges, arrays) over *articles* for multiple values](#Search-articles)
-   `[GET]` /api/articles/test - [Quick Test article](#Quick-Test-article)
-   `[POST]` /api/articles - [Create bulk *Article*](#Create-bulk-Article)
-   `[PUT]` /api/articles - [Edits bulk *Article* with conditions](#Edit-bulk-Article)
-   `[DELETE]` /api/articles - [Delete bulk *articles* in the collection](#Delete-bulk-articles)




**N.B**: The `/test` endpoint of this article is for quick development testing only. Do Disable this when in production!

### SDK Summary

    - Unity >= 5
    - Angular >= 4.3

The SDKs have provider code already set

### Retrieve All Articles

-   **Syntax** : `[GET] /api/articles [?skip= X & limit= Y]`
-   **URL** : `/api/articles`
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
        "articles ": [
          {"_id":"56cb91bdc3464f14678934ca","title":"lorem pisum dolor sit amet","excerpt":"lorem pisum dolor sit amet","content":"lorem pisum dolor sit amet","published":true,"created":"2019-05-21T06:27:31.003Z","author_id":"lorem pisum dolor sit amet"},
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

    `curl "http://localhost:3000/api/articles"`  
    Fetches 5 article results skipping the first 2

-   **Notes:**

### Create a new Article

-   **Syntax** : `[POST] /api/article`
-   **URL** : `/api/article`
-   **Method**: `POST`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `{article:{}}` - The base article data object

    ```
     {
       "article" : {
        {"_id":"56cb91bdc3464f14678934ca","title":"lorem pisum dolor sit amet","excerpt":"lorem pisum dolor sit amet","content":"lorem pisum dolor sit amet","published":true,"created":"2019-05-21T06:27:31.003Z","author_id":"lorem pisum dolor sit amet"}
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
          title : String, 
          excerpt : String, 
          content : String, 
          published : Boolean, 
          created : Date, 
          author_id : String
          
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
        "data": "Invalid article/key model provided",
        "message": "There was an error saving this data."
      }
    ```

-   **Sample Call:**

    ```
        curl -X POST -H "Content-Type: application/json"
          -H "Cache-Control: no-cache" -d     '{
          "article":{
              "name":"pen",
              "price":2.54
              }
          }' "http://localhost:3000/api/article"

    ```

    The key model being `article` the saves a 'pen' data

-   **Notes:**

### Retrieve a single Article

-   **Syntax** : `[GET] /api/article/:id`
-   **URL** : `/api/article/:id`
-   **Method**: `GET`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the article  


-   **Success Response:**

    **Code:** 200  
     **Content:**

    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          title : String, 
          excerpt : String, 
          content : String, 
          published : Boolean, 
          created : Date, 
          author_id : String
          
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
          "http://localhost:3000/api/article/587100001657a2bd9c5a00d"

    ```

    Fetches a single article from the collection `articles`

-   **Notes:**

### Edit a single Article

-   **Syntax** : `[PUT] /api/article/:id`
-   **URL** : `/api/article/:id`
-   **Method**: `PUT`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the article  
     `{article:{}}` - The base article data object that needs to be changed

    ```
     {
       "article" : {
         title : String, 
         excerpt : String, 
         content : String, 
         published : Boolean, 
         created : Date, 
         author_id : String
         
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
          title : String, 
          excerpt : String, 
          content : String, 
          published : Boolean, 
          created : Date, 
          author_id : String
          
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
        "data": "Invalid article/key model provided",
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
                "article22":{
                    "name":"sharpner",
                    "price":2.55
                  }
              }' "http://localhost:3000/api/article/587100001657a2bd9c5a00df"

    ```

    The key model being `article` which updates a 'sharpner' data

-   **Notes:**

### Delete a single Article

-   **Syntax** : `[DELETE] /api/article/:id`
-   **URL** : `/api/article/:id`
-   **Method**: `DELETE`
-   **URL Params**:  
     **Optional:** None  
     **Required:**

    `id` - The object id of the article

-   **Success Response:**

    **Code:** 202  
     **Content:**

    ```
    {
      "status": "success",
      "data": "The article got Deleted",
      "message": null
    }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
      {
      "status": "error",
      "data": "Error in deleting this article",
      "message": {
        .
        .
        .
      }
    }
    ```

-   **Sample Call:**

    ```
      curl -X DELETE "http://localhost:3000/api/article/58713b0a1657a2bd9c5ad"
    ```

    The key model being `article` which updates a 'sharpner' data

-   **Notes:**

### Delete all Articles

-   **Syntax** : `[DELETE] /api/articles`
-   **URL** : `/api/articles`
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
       "data": "All articles got Delete",
       "message": null
     }
    ```

-   **Error Response:**

    **Code:** 500  
     **Content:**

    ```
       {
         "status": "error",
         "data": "Error in deleting all articles",
         "message": {
           .
           .
           .
         }
       }
    ```

-   **Sample Call:**

    ```
      curl -X DELETE "http://localhost:3000/api/articles"
    ```

    The key model being `article` which updates a 'sharpner' data

-   **Notes:**

### Search Articles

-   **Syntax** : `[GET] /api/articles/search [?skip= X & limit= Y & keyword= field:value [,field:value]]`
-   **URL** : `/api/articles/search`
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
        "articles": [
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

    `curl "http://localhost:3000/api/articles/search?keyword=first:Sam,last:Jones"`  
    Searches articles with rows with its first name 'Sam' and last name 'Jones'

-   **Notes:**
    To use Strict Search, add param ?strict=true
