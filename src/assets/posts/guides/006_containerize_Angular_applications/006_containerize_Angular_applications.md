<!--
date=2022-06-27
topic=Docker
series=Docker
series_section=3
summary=This post covers the creation of a container image for a minimal Angular application.
-->

# Containerize Angular Applications

As we have seen in the last entry of the series, it is rather simple to containerize a miminal Flask application. However, as applications tend to comprise also of a frondend, let's take a closer look at running an Angular application in a Docker container.

## Step 1: Creating a Angular Application

Our Angular application should do not much more than retrieving a message form a backend, such as the Flask application we've created in the apprevious post of the series and displaying it to the screen. The easiest to initialize a new Angular application is to use the <code>ng new</code> command provided by Angular's CLI. Angular Material is an optional library that provides a range of UI elements, I personally like although not strictly required here.

```TS
ng new project && add @angular/material
```

A freshly initialised Angular project comes already with a quite a few automatically generated files. As we like to build a minimal application, let's focus on the <code>src/app</code> directory, where the <code>app module</code> and <code>app component</code> reside. First jump to the directory by running the following command.

```TS
cd src/app && ls
```

The console output should look roughly similar to the one dipected below.

<img class='almost-full-width' src='assets/posts/guides/006_containerize_Angular_applications/app_module.png'>

First, we need a way to retrieve a message from a backend. There are several ways we could achieve that. But one standard solution would be to create a service handling the backend communication. Angular's CLI provides the <code>ng generate service [SERVICE_NAME]</code> command or just <code>ng g s [SERVICE_NAME]</code> to create new services quickly.

```TS
ng g s rest
```

After having generated the <code>RestService</code>, we want to implement a <code>fetchMessage()</code> method performing a get request to a backend running on port <code>8080</code> on our <code>localhost</code>. The complete file should look similar to the one depicted below.

**rest.service.ts**
```TS
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private readonly httpClient: HttpClient) { }

  public fetchMessage(): Observable<string> {
    return this.httpClient.get<string>('http://127.0.0.1:8080').pipe(catchError(() => of("not connected")))
  }
}
```

Now, we can override the default content of the <code>AppComponent</code>. The controller's main purpose is to call the <code>RestService</code> and to bind the result of the service's <code>fetchMessage()</code> to a local variable. The complete class should similar to the one depicted below.

**app.component.ts**
```TS
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public readonly message: Observable<string> = this.restService.fetchMessage();

  constructor(private readonly restService: RestService) {}
}
```

The message received from the backend is aviable in the <code>AppComponent</code> but is not yet renders. One way to show the message on the page would be to utilize Angular's <code>async</code> pipe to subscribe to the message Observable of the <code>AppComponent</code>. The message could simply be rendered as text or as depiced below inside an Angular Material <code>MatCard</code> component.

**app.component.html**
```TS
<mat-card *ngIf="message | async as message">
  {{ message }}
</mat-card>
```

It is purely optional to provide a stylesheet of the component, but the scss file shown below formats the <code>MatCard</code> in which the message is displayed a bit.

**app.component.scss**
```TS
.mat-card {
  width: 250px;
  height: 100px;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(180deg, rgba(240,218,57,1) 0%, rgba(197,100,36,1) 100%);
  transition: box-shadow 1s, margin-top 1s, width 1s, height 1s, transform 0.7s;
  font-family: 'Courier New', Courier, monospace;
  padding-top: 100px;
  margin: auto;
  margin-top: 200px;
}

.mat-card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: scale(1.02);
}
```

## Step 2: Defining a Dockerfile

There are several ways to create a Docker image for an Angular application. One option would be to split the process into two parts, A first one to build the Angular application and a second one to run the bundled application on a webserver like Nginx. The build step takes a node image, copies all files in the present working directory to the build stage, installs all npm packaged defined in the <code>packages.json</code> file and finally runs npm's <code>build</code> command. 

The second state takes an image of a webserver, in the example depicted below we use and <code>nginx:alpine</code> image. The image contains an Alpine Linux distribution on which a Nginx webserver is installed. The second stage takes nginx's html folder as working directory, removes all boilerplate code on that location, copies the dist directory of the first stage into the working directory and finally starts Nginx. Setting the <code>/app/dist/[PROJECT_NAME]</code> path correcly is rather important. In the examples below, the project's name is just ***project***, thus leading to the <code>/app/dist/project</code> path. If a Angular project had a different name, the path would have to be replaced.

```TS
FROM node:18-alpine3.15 AS builder

WORKDIR /app

COPY . .

RUN npm i && npm run build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/project .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

## Step 3: Building the Image

Once the Dockerfile has been defined, building the Docker image is rather straight-forward by running the command shown below.

```TS
docker build -t angular-introduction:latest .
```

## Step 4: Starting a Container

A new container based on the <code>angular-introduction</code> image, can be created by running hte following command.

```TS
docker run -d -p 80:80 angular-introduction
docker ps
```

After the container has started, it should be possible to open <code>localhost:80</code> and see a page looking similar to one depicted below.

<img class='almost-full-width' src='assets/posts/guides/006_containerize_Angular_applications/not_connected.png'>

## Closing Remarks

At the moment, there is no backend available to fetch a message from. Please take a look at the next post to bring the pieces together by defining a Docker compose file starting the Flask backend from the previous post and the Angular application described in this post.