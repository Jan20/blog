<!--
date=2023-03-05
topic=Code Quality
summary=Provides a brief introduction into ESLint.
-->

# Introduction to ESLint

ESLint is a popular open-source JavaScript linting tool that is used to analyze and check JavaScript/Typescript code for errors, stylistic issues, and potential problems. It helps to write better, more consistent code by identifying issues and providing suggestions for improvement.

ESLint works by parsing JavaScript code into an abstract syntax tree (AST) and then applying a set of rules to the AST to identify issues. These rules can be configured to suit the specific needs of a project, and there is a platora of pre-existing rules available ready to be integrated in a project. Most importantly, by using ESLint, it's possible to catch errors and potential issues early in the development process, leading to more stable, consistent, and maintainable code. 

## Linting Rules

ESLint supports a multitude of rules for identifying:

1. Syntax errors
2. Unused variables and functions
3. Missing or incorrect function parameters
4. Inconsistent spacing, indentation, and formatting
5. Improper use of global variables
6. Use of unsave function calls

## Setup

ESLint can be included into an existing project by running:

```TS
npm init @eslint/config
```

Some useful rules are provided as plugins that extend the ESLint's default rules set. I found RxJS-related rules especially useful that can be installed by using:

```TS
npm install eslint-plugin-rxjs --save-dev
```

Afterwards, the <code>.eslintrc.json</code> file's <code>rules</code> section can be extended by additional rules like

```TS
"rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "prefer-const": "error",
    "@typescript-eslint/ban-types": "error",
    "rxjs/no-async-subscribe": "error",
    "rxjs/no-ignored-observable": "error",
    "rxjs/no-nested-subscribe": "error",
    "rxjs/no-unbound-methods": "error",
    "rxjs/throw-error": "error"
}
```

## Recap

By enabling early detection of errors and potential issues, ESLint can be an invaluable tool during development. Furthermore, its ability to enforce higher code quality can help prevent the need for future refactoring efforts.
