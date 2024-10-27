<!--
date=2023-04-13
topic=Angular
summary=Gives a brief introduction to npm and its most commonly-used command-line commands.
-->

# Beginner's Guide to npm

Let's assume you've just started out using Angular or any other modern web application framework. Changes are high that you stumbled across a package.json that got generated automatically using the `ng new` command of Angular's CLI. The package.json file's main purpose is to provide a list of a project's dependencies that are managed through the Node Package Manager (npm) which is the largest registry of open source software packages in the world, with over 1.5 million packages and counting. Let's take a closer look at the package.json.

# Package.json File

A typical package.json in a newly initialized Angular project looks similar to the one depicted below.

![package-json.png](assets/posts/course/introduction-to-npm/package-json.png)

The package.json file serves three purpose:

1. Dependency management: The package.json file lists all the dependencies required by the project, including their versions. This allows developers to install all the necessary packages with a single command (npm install) and ensures that everyone working on the project has the same dependencies.

2. Script management: The package.json file can define custom scripts that developers can run with the npm run command. For example, you could define a script called start that runs your application, or a script called test that runs your test suite.

3. Project metadata: The package.json file includes metadata about the project, such as its name, version, description, author, and license. This information can be used by other developers who want to understand what the project does and how to use it.

## Managing npm Dependencies

Npm comes with a rather powerful command line interface that allows to install dependencies, devDependencies and upgrade them.

To install a new dependency or devDependency like the <code>@testing-library/dom</code> package that provides a set of utilities for testing DOM nodes and elements in the browser, run  the following command:

```TS
npm install --save-dev @testing-library/dom
```

The <code>--save-dev</code> flag specifies that the package should be installed as a development dependency rather than a production dependency, meaning it will only be required for testing and won't be included in the final build of the project.

Most dependencies available through npm require us to periodically upgrade their versions. This can either be done by manually modify the version numbers defined in the package.json file which can be rather error-prone. Using npm's build-in <code>update</code> command with the <code>--save</code> flag provides a saver and faster alternative. The <code>--save</code> flag ensures that the version that the package.json file gets updated as expected.

```TS
npm update --save
```

Dependencies tend to outdate rather quickly making it hard to keep on top of the latest fixes and features. However, it is possible show a list of all dependencies that have newer versions available than the ones currently installed by running:

```TS
npm outdated
```

The output of the <code>npm outdated</code> command will include information about each outdated dependency, including the package name, the currently installed version, the latest version available, and the type of dependency (whether it's a direct or transitive dependency).

This command can be useful for keeping a project up-to-date and ensuring that all dependencies are using the latest security patches and bug fixes. If any dependencies are outdated, they can be updated by running the <code>npm update</code> command described above.

It's important to note that updating dependencies may require additional changes to the project code, as newer versions of a dependency may have breaking changes or require different configuration options. So, it's always recommended to test the project thoroughly after updating dependencies.

The <code>npm outdated</code> and <code>npm update</code> commands come actually in two different flavours. They can either be used on project level or a global level, allowing to look for outdated updates that are installed on a machine such as Angular's CLI by adding the <code>-g</code> to the command.

```TS
npm outdated -g
```

The command should generate a list of outdated global dependencies.

![package-json.png](assets/posts/course/introduction-to-npm/npm-outdated.png)

All global dependencies can easily be updated by running <code>npm update</code> with the <code>-g</code> flag as follows:

```TS
npm update -g
```

## Managing Node Versions

For updating the Node verions, the Node Version Manager (nvm) is probably the best option.

```TS
open 'https://github.com/nvm-sh/nvm'
```

After having installed nvm, the Node version can be updated by simply running the following command.

```TS
nvm install node 
```

## Recap

In this post, we took a first look at npm and the core purposes for adding a package.json file to a project, which is to simplify the management of dependencies, adding scripts and project metadata. We have covered some of the most-commoonly used command-line commands provided by npm such as <code>npm install</code>, <code>npm outdated</code> and <code>npm update --save</code>.

However, this was just a brief introduction, and there's a lot more to explore, especially when it comes to the scripting options npm provides. I plan to cover this topic in more depth in a future post, so stay tuned for more insights. Until then, take care!