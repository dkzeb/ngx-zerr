import { ErrorHandler, Injectable } from "@angular/core";
import { ZErrOptions } from "./ngx-zerr.options";
import { HttpClient } from '@angular/common/http';

interface ZError {
    error: string;
    timestamp: number;
    browserAgent: string;
    consoleLogMessages: any[];
    additionalInfo?: string;
}

let logBackup: any = console.log;
let logMessages = [];

// override console log
console.log = function() {
    logMessages.push.apply(logMessages, arguments);
    logBackup.apply(console,arguments)
}

@Injectable()
export class ZErrGlobalErrorHandler implements ErrorHandler {

    constructor(private http: HttpClient, private zOpts: ZErrOptions) {}

    handleError(errIn: Error) {
        const e: ZError = {
            error: JSON.stringify(errIn, ['name', 'message', 'stack']),
            timestamp: new Date().getTime(),
            browserAgent: navigator.userAgent,
            consoleLogMessages: logMessages
        };

        // clear log messages after error was thrown
        logMessages = [];

        if (this.zOpts.debug) {
            console.error('ZERR Debug Log:', errIn);
        }

        if(this.zOpts.verboseLog) {
            console.log(errIn);
        }

        if(this.zOpts.additionalInfoGetter) {
            e.additionalInfo = JSON.stringify(this.zOpts.additionalInfoGetter());
        }

        this.http.post(this.zOpts.errorsPostEndpoint, { error: e }).subscribe((res) => {
            if(this.zOpts.debug) {
                console.log('ZERR Debug Log:', res);
            }
        }, (err) => {
            console.log('ZERR Debug Log - HTTP ERR: ', err);
        });
    }
}
