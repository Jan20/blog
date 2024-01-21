<!--
date=2022-07-08
topic=Angular
summary=Gives an introduction to hosting an Angular project on GitHub Pages
-->

# Angular on GitHub Pages

GitHub Pages is a free hosting service for static websites offered by Github. If you like to get an impression on what's awaiting you, check out the introduction video to [Github Pages](https://youtu.be/2MsN8gpT6jY). Although Github Pages comes with a the Jekyll blogging platform, it is rather limited, motivating me to write this small article about running an Angular application on Github Pages.

## Getting Started

Let's get started: Go to [Github.com](https://github.com) and create a new repository starting with the name of your Github user account, followed by the suffix .github.io, as depicted below:

```TS
[YOUR_GITHUB_USERNAME].github.io
```

After having done so, just clone the freshly created repository and change your working directory to jump in the cloned folder. Once there, create an Angular application by using Angular's CLI or use an existing project :

```TS
git clone <YOUR_GITHUB_USERNAME>.github.io
cd <YOUR_GITHUB_USERNAME>.github.io
ng new <NAME_FOR_YOUR_ANGULAR_APPLICATION>
```

Afterwards, jump into your Angular project an search for the **angular.json** file and open it. You will likely see a section that looks similar to the one depicted below. There is only one change to be made, that is to change the "outputPath" property from the default "dist" to **"docs"**.

```TS
"projects": {
    ...
    "options": {
        "outputPath": "dist", // change outputPath to "docs"
        "outputPath": "docs",

        ...
    }
}
```

Now, feel free to build your project by running Angular's standard build command:

```TS
ng build
```

After having built your project, your docs directory should look roughly the same as this one:

<img class='half-width' src='assets/posts/course/101-angular-apps-on-github-pages/file-structure.png'>

## Deploying your application

The only thing that is missing now is to configure Github Pages, so that it serves your freshly built project. In order to do so, go to [Github.com](https://github.com) and jump into your project. Once arrived there, open the **Settings** tap and navigate to the menu entry **Pages** at on the left hand side. You should see a page that looks like the one depicted below:

<img class='almost-full-width' src='assets/posts/course/101-angular-apps-on-github-pages/angular-on-github-pages.png'>

Make sure that you have selected your **/docs** rather than your **/ (root)** as your source folder for Github Pages. After having selected your **/docs** directory, head back to your editor and push your entire project, including your docs directory to your master branch by executing the following commands:

```TS
git add .
git commit -m "initial commit"
git push
```

That's it. After a couple of minutes, you should be able to access your webside hosted on GitHub Pages.