# ngx-zerr
Welcom to ngx-zerr - the be-all (not really) catch-all errors and post them via http - angular error handler

### PLEASE NOTE THIS MODULE IS CURRENTLY IN ALPHA, PROBABLY HAS BUGS, AND SHOULD BE TESTED THOROUGHLY IF CONSIDERED FOR USE IN PRODUCTION

## Install
npm install --save ngx-zerr

## Usage
To use this module, you must import and configure it in your app.module.ts

```ts
import { NgxZerrModule } from 'ngx-zerr';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    NgxZerrModule.forRoot({
      errorsPostEndpoint: <string>, // any URL you wish to have your errors posted to
      debug: <bool>
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Interfaces & Classes
The module works by catching all errors in the angular project, serializing the error object and posting it along with some additional information, the following interface shows what is posted to the endpoint

```ts
interface ZError {
    error: string;
    timestamp: number;
    browserAgent: string;
    consoleLogMessages: any[];
    additionalInfo?: string;
}
```

The module is configured by supplying it with a set of options
```ts
export class ZErrOptions {
    errorsPostEndpoint: string;
    debug?: boolean;
    verboseLog?: boolean;
    additionalInfoGetter?: Function;
}
```
When debug is true, the module will log errors and debug messages to the console

### additionalInfoGetter
It is possible to provide the module with an 'additionalInfoGetter' method, this should return an object, and it will be serialized and pushed together with the error to the server. This allows for custom information gathering, such as localStorage contents or cookies - see the following example:

```ts
NgxZerrModule.forRoot({
      errorsPostEndpoint: 'http://localhost:3000/error',
      debug: true,
      verboseLog: true,
      additionalInfoGetter: () => {
        return {
            localStorage: localStorage,
            sessionStorage: sessionStorage,
            cookies: document.cookie
        }
      }
    })
```

Which will produce the following on the server after JSON.parse:

```json
 "additionalInfo": {
        "localStorage": {
          "opgaver": "[{\"id\":0,\"title\":\"Test Generated 0\",\"description\":\"This is only a test\",\"startDate\":\"2021-02-15T13:21:59.654Z\",\"status\":0},{\"id\":1,\"title\":\"Test Generated 1\",\"description\":\"This is only a test\",\"startDate\":\"2021-02-15T13:28:17.371Z\",\"status\":0}]",
          "signedIn": "true",
          "OTelJS.ClientId": "e22bf04e-ae2a-437e-80c8-0fd06aab5086",
          "userName": "someUser Name",
          "userRole": "0"
        },
        "sessionStorage": {},
        "cookies": "cookieconsent_status=dismiss;"
      }
    }
```