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
}
```

The module is configured by supplying it with a set of options
```ts
export class ZErrOptions {
    errorsPostEndpoint: string;
    debug?: boolean;
}
```
When debug is true, the module will log errors and debug messages to the console