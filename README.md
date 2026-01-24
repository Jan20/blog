[![Unit Tests](https://github.com/Jan20/blog/actions/workflows/unit-tests.yml/badge.svg?branch=main)](https://github.com/Jan20/blog/actions/workflows/unit-tests.yml)

# Jan's Engineering Blog

This repository holds the source code for my small software engineering blog. Feel free to take a look at https://janladicha.de to see the project in action. I decided to go for a rather bare-bone Angular application ready to get served on GCP's Cloud Run platform.

<img width="2032" alt="Screenshot 2024-10-27 at 12 29 01" src="https://github.com/user-attachments/assets/e738e7e6-128c-4106-b401-0a81ebefdf36">

# Getting Started

**Step 1:** Install npm dependencies:

```
npm install --verbose
```

**Step 2:** Install the Angular CLI if not already present:

```
npm install -g @angular/cli
```

**Step 3:** Serve the application locally by running:

```
ng serve
```

# Deployment

**Step 1:** Sign in to your GCP account

```
gcloud auth login
```

**Step 2:** Set the desired GCP project

```
gcloud config set project <your-gcp-project-id>
```

**Step 3:** Submit the build using Cloud Build

```
gcloud builds submit --config cloudbuild.yaml --verbosity=debug
```