<img class='full' src='assets/posts/guides/001_angular_apps_on_github_pages/thumbnail.png'>

# Angular on GitHub Pages
GitHub Pages is a free hosting service for static websides offered by Github. If you like to get an impression on what's awaiting you, check out the introduction video to [Github Pages](https://youtu.be/2MsN8gpT6jY). Although Github Pages comes with a the Jekyll blogging platform, it is rather limited, motivating me to write this small article about running an Angular application on Github Pages.

## Getting Started
Let's get started: Go to [Github.com](https://github.com) and create a new repository starting with the name of your Github user account, followed by the suffix .github.io, as depicted below:

```TS
<your-github-username>.github.io
```

After having done so, just clone the freshly created repository and go to your repository. Create an Angular application there by using Angular's CLI or copy and paste an existing project:

```TS
ng new blog
```

Afterwards, jump into your project an search for the **angular.json** file and open it. You will likely see a section that looks similar to the one depicted below. There is only one change to be made, that is to change the "outputPath" property from the default "dist" to **"docs"**.

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

Now, build your project by running Angular's standard build command::

```TS
ng build
```
After having built your project, your docs directory should look roughly the same as this one:
<img class='half-width' src='assets/posts/guides/001_angular_apps_on_github_pages/file_structure.png'>

## Deploying your application

The only thing that is missing now is to configure Github Pages, so that it serves your freshly built project. In order to do so, go to [Github.com](https://github.com) and jump into your <your-github-username>.github.io directory. Once arrived there, open the **Settings** tap and navigate to the menu entry **Pages** at the left. You should see a page that looks like the one depicted below:

<img class='almost-full-width' src='assets/posts/guides/001_angular_apps_on_github_pages/angular_on_github_pages.png'>

Make sure that you have selected your **/docs** rather than your **/ (root)** as your source folder for Github Pages. After having selected your **/docs** directory, head back to your editor and push your entire project, including your docs directory to your master branch by executing the following commands:

```TS
git add .
git commit -m "initial commit"
git push
```