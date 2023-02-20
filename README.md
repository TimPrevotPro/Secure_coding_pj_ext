# secure-coding-project-http-endpoints

## Documentation

Please note that the scripts in this project are written for Unix CLI and not windows. If you are using windows, please use WSL2 and install Node.js on your sub-system.

We used git Flow to manage our work with features on branch develop.

`
  start a feature : git flow feature start nameOfTheFeature
  finish a feature : git flow feature finish
`

## Questions

### Question 1:

_Please write a small paper about REST naming convention._

REST APIs uses URIs to address ressources. It is important to have a consistent naming scheme to make the API intuitive. </br>
A ressource can be a collection or a singleton, like **customers** is a collection of **customer** singletons. To identify the **customers** ressource, we can use `/customers` and for a single **customer**, we can use `/customers/{customerId}`.</br>
A ressource may contain sub-collections also. For example, a **customer** can have multiples **accounts**, identified using this URN `/customers/{customerId}/accounts`.</br>
Obviously, the singleton convention applies and we can access a specific account following `/customers/{customerId}/accounts/{accountId}`.</br>

Here is a quick summary of best RESTful practices:

-   Use nouns to represent ressources instead of verbs except in the case of the **controller**

    -   A **document** is a singleton akin to a database record. </br> - Use the singular name like "admin" or a UID

    -   A **collection** is a server-managed directory of resources, meaning the client may propose new ressources to add, but it is up to the server to decide. </br> - Use the plural name like "users"

    -   A **store** is a client-managed resource repository. It differs from the **collection** by letting a client API put resources in, get them back out, and decide when to delete them. </br> - Use the plural name like "playlists"

    -   A **controller** models a procedural concept. Controller resources are like executable functions, with parameters and return values, inputs, and outputs. </br> - Use verbs like "play" or "checkout" but do not use CRUD function verbs

-   Use a consistent naming scheme for readability and maintainability

    -   Forward slash **/** should only be used to indicate hierarchical relationships and not as trailling

    -   Use hyphens **-** to improve readability, but never use underscores **\_**

    -   Use only lowercase to avoid confusion

    -   Do not use file extensions as they provide nothing and look bad

    -   Never use CRUD function verbs, HTTP request methods will indicate the performed CRUD function.

    -   Use query component to filter URI collection like `/device-management/managed-devices?region=USA&brand=XYZ&sort=installation-date`

---

### Question 2:

_Considering they use REST naming convention, what would do POST /web-api/users and POST /web-api/sessions endpoints?_

</br>

`POST /web-api/users` intends to add a user to the **users** collection.</br>
`POST /web-api/sessions` intends to add a session to the **sessions** collection.

---

### Question 4:

_How behaves fastify:_

1. _If no json schema is provided for any of body, query and params ?_</br>
2. _If the client submits an unknown property, according to the JSON schema ?_</br>
3. _If the client omits a required property, according to the JSON schema?_

</br>

1. If no json schema is provided for any of the body, query and params, the request still goes through and will be processed by the server.
2. If the client submits an unknown property, according to the JSON schema, the property will be dismissed by fastify but the request will still go through.
3. If the client omits a required property, according to the JSON schema, the fastify instance will respond with an error like: </br>
   `{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "body must have required property 'firstName'"
}.`</br>
   We are now sure that the JSON schemas' validation policy is working.

---

_Question 5 :_
|Criteria|Stateful Session|Stateless Session (JWT)|
|--------|----------------|----------------------|
|Scalability|less scalable due to the need to maintain state on the server|more scalable due to the stateless nature of the session management|
|Architecture Complexity|more complex due to the need to maintain state on the server|less complex due to the stateless nature of the session management|
|Information Known by Client|more information is known by the client, as the client must maintain the session state|less information is known by the client, as the session state is maintained on the server|
|Revocation Strategy|Revocation is easier as the server has access to the session state and can simply invalidate it|Revocation is more difficult as the server must maintain a list of revoked tokens and check it on each request|
|Impact of Session Leak|If a session leaks, an attacker could potentially gain access to the user's account|If a token leaks, an attacker could potentially gain access to the user's account, but the impact is less severe as the token is short-lived and can be easily revoked|
|Common Weaknesses|Misconfigurations in session management, such as not invalidating sessions properly, can lead to security vulnerabilities|Misconfigurations in JWT management, such as not properly validating tokens or using weak signing algorithms, can lead to security vulnerabilities|
|Client-Side Strategy|requires additional code on the client to maintain and submit the session state|requires additional code on the client to properly handle and securely submit the JWT token|
|Additional Library Requirements|requires additional libraries on the server to handle session management|requires additional libraries on the server to handle JWT management and signing/verifying tokens|

---

### Question 6:

_Search and summarise solutions to protect the confidentiality of the session identifier stored in a browser’s cookie. Focus on the actions you can take as a backend developer or server-side infrastructure engineer._
</br>

-   Use HTTPS to have end-to-end encryption.
-   Regenerating session identifier at key points such as after login.
-   Compare User Agent/IP address against the one used before login.
-   Destroying old session regularly.
