
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { ZErrGlobalErrorHandler } from './ngx-zerr.global.error-handler';
import { ZErrOptions } from './ngx-zerr.options';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ZErrGlobalErrorHandler
    }
  ],
  exports: []
})
export class NgxZerrModule {

  static forRoot( options: ZErrOptions ) : ModuleWithProviders<NgxZerrModule> {
    return {
      ngModule: NgxZerrModule,
      providers: [
        { provide: ZErrOptions, useValue: options }
      ]
    }
  }

}