<!--
date=2022-06-27
topic=Docker
series=Docker
series_section=1
summary=Provides a high-level introduction to Docker an its terminology.
-->

# Introduction to Docker

This post is the first entry in a series about Docker. The series focuses on building Docker images for Flask and Angular applications as well as running containers on those images. Please grab a big cup of coffee as this series will be a rather long read.

## Motivation

Nearly all software applications require an operating system to run, dependencies to be installed and ports to be exposed for communication. However, no two computer systems are exactly identical. An operating system might not be updated to its latest version or uses a slightly outdated set of dependencies. This underlying deversity makes it hard for traditional software to be deployed quickly and riliably.

One approach to cope with diverse systems would be to execute an application in a dedicated virtual machine (VM), installing all required dependencies on that VM and finally execute the desired application. However, running a full-fletched VM consumes a lot of resources that could be used more efficiently. Docker introduces a container runtime allowing processes to run in isolated containers sharing a machine’s OS system kernel, thus causing less overhead than VMs.

## Docker Containers

A Docker container is a bundle of application code together with all required dependencies enabling an application to run quickly and reliably on diverse computing environments. A more detailed description aobut Docker containers can be found Docker's [What is a Container?](https://www.docker.com/resources/what-container/) page.

## Docker Images

A docker image, on the other hand, is an executable package of software that specifies an applications codebase, runtime, dependencies and settings. Docker images can be considered as blueprints for containers.

## Dockerfile

Docker images are built by exeucting the instructions defined in a Dockerfile. A Dockerfile is a text document that contains all the commands nessesary to assemble an image. Normally, a Dockerfile starts with defining a base image, such as a Linux Alpine image bundled with a webserver or desired software application.

## Next Steps

It is about time to jump into the code and get some hands-on experience with Docker by containerizing a minimal Flask application in the [next blog post](/blog/guides/005_containerize_flask_applications/005_containerize_flask_applications.md)
