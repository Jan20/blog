![Angular Logo](assets/posts/angular/001/angular.png)
# Angular Fundamentals
This guide provides a **brief overview** of creating a **new Angular application**.
## How to create a new application?
The easiest way to create a new Angular application consists in using the Angular command-line interface - `CLI`.
Use the following command to generate a new app, where **project name** can be replaced by any name, that
suits the app's purpose.

```ts
ng new <project name> --style=scss
```

## What is Angular Material?
Angular Material provides a range of common UI components, such as cards, tables and icons. **Angular Material** can be installed
using the follow commands:

```Shell
npm install --save @angular/material @angular/cdk
npm install --save @angular/animations
```

## How to start an Angular application
Angular applications can simply be run using a terminal. Actually, it is pretty easy actually. An Angular application can be
started using the following command:

```Shell
ng serve
```


### Theming
Add the following lines of code to the **styles.css** file located in the src folder.

```CSS
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
@import url(https://fonts.googleapis.com/css?family=Roboto:400, 300);
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);

*{
    padding:0;
    margin:0;
    font-family: 'Roboto', sans-serif;
}
```

### Material Design
Add the required dependencies to thapp.module.ts** file.

```ts
import { MatButtonModule, MatCheckboxModule, MatGridListModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
```
In the next step, it is necessary to add the MaterialModule as well as the BrowserAnimationsModule to the imports list, that can be found within the app.module.ts file as well.
   
 // Angular Material
 MaterialModule, 
 BrowserAnimationsModule,


## Angular CLI
Please make sure, that you keep the Angular CLI constantly on the latest version. If you decide to work on an older one, you might encounter problems related to 

```Shell
ng generate component menu
```

### Trouble Shooting

```Shell
npm outdated
npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@next --save
```

There might occure an error, stating that npm can not be updated due to a keepalive file that does not exits. This error can fixed by running:
```Shell
sudo npm install -g agentkeepalive --save
```
