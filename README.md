# ngx-zerr Workspace

This library is built with @angular/cli scaffolding - therefore the rest of this readme is the standard readme from NG - it does however give a pretty good idea of what to do - to add a bit i have the following tidbit

## Using the library locally
You can build and link the library to your local npm registry by running
`npm run build-zerr` - this is equivallent to running `ng build ngx-zerr && cd dist/ngx-zerr && npm link && cd ../../`
After which, you can link this to your local angular project by running `npm link ngx-zerr` in that project folder
*This is just generally how you link local packages and have nothing to do with this project :)*

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
