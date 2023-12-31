import {SSEConfig} from "@ioc:isimisi/SSE";

export const sseConfig: SSEConfig = {
  pad_for_ie: false, // if the HTTP request is from an IE 8/9 browser - set to 'true'
  no_ids: false, // if you need id: key/value (from the cuid lib) as part of the text-stream response - set to 'true'
  prefered_event_name: "message", // if you need event: key/value (here set to 'message')  as part of the text-stream resposne - set here to whatever you like
  redis: false, // save clients to redis
  redisKey: null, // set to a string if you want to use another name for the key where clients are saved
  cors: {
    /*
    |--------------------------------------------------------------------------
    | Origin
    |--------------------------------------------------------------------------
    |
    | Set a list of origins to be allowed for `Access-Control-Allow-Origin`.
    | The value can be one of the following:
    |
    | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
    |
    | Boolean (true)    - Allow current request origin.
    | Boolean (false)   - Disallow all.
    | String            - Comma separated list of allowed origins.
    | Array             - An array of allowed origins.
    | String (*)        - A wildcard (*) to allow all request origins.
    | Function          - Receives the current origin string and should return
    |                     one of the above values.
    |
    */
    origin: 'http://localhost:3000',

    /*
    |--------------------------------------------------------------------------
    | Methods
    |--------------------------------------------------------------------------
    |
    | An array of allowed HTTP methods for CORS. The `Access-Control-Request-Method`
    | is checked against the following list.
    |
    | Following is the list of default methods. Feel free to add more.
    */
    methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH"],
    /*
    |--------------------------------------------------------------------------
    | Expose Headers
    |--------------------------------------------------------------------------
    |
    | A list of headers to be exposed by setting `Access-Control-Expose-Headers`.
    | header. By default following 6 simple response headers are exposed.
    |
    | Cache-Control
    | Content-Language
    | Content-Type
    | Expires
    | Last-Modified
    | Pragma
    |
    | In order to add more headers, simply define them inside the following array.
    |
    | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
    |
    */
    exposeHeaders: [
      "cache-control",
      "content-language",
      "content-type",
      "expires",
      "last-modified",
      "pragma",
    ],

    /*
    |--------------------------------------------------------------------------
    | Credentials
    |--------------------------------------------------------------------------
    |
    | Toggle `Access-Control-Allow-Credentials` header. If value is set to `true`,
    | then header will be set, otherwise not.
    |
    | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
    |
    */
    credentials: false,

    /*
    |--------------------------------------------------------------------------
    | MaxAge
    |--------------------------------------------------------------------------
    |
    | Define `Access-Control-Max-Age` header in seconds.
    | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
    |
    */
    maxAge: 90,
  },
};
