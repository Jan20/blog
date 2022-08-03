<!--
date=2022-06-27
topic=Docker
-->
<img class='full' src='assets/posts/guides/006_multi_container_applications/thumbnail.png'>

# Multi Container Applications

This post builds upon two previous articles about running and Angular-based frondend and Flask-based backend inside Docker containers. At the moment, both containers live in isolation. Naturally, we like to make sure that the frondend can request data from the backend. In order to do so, we want to create a <code>docker-compose.yml</code> file that defines a network of services that can communicate with each other.

The structure of any <code>docker-compose.yml</code> file is rather straightforward. It consists of a list of <code>services:</code> defining all Docker containers required to run a larger application. Each service gets identified by a unique name, such as <code>Angular_Introduction:</code>.

Within a service, quite a few things are configurable. First, the name of a container can be configured by the <code>container_name:</code> property. It's the name that gets displayed when running <code>docker ps</code> to list all running Docker containers. Second, every container requires an <code>image:</code> serving as blueprint for that particular container, which can be pretty much everything from a miniscule Flask backend up to a full-fletched operating system. Third, the <code>ports:</code> property maps a host's port to a port being exposed by a Docker container. A common example would be to bind localhost <code>127.0.0.1:80</code> port to port <code>80</code> of a Docker container. That's would is done in the example depicted below. However, mapping ports correctly can be an error prone process and demands from time to time a fair bit of experience. Finally, every container that should be able to communicate to another container needs to be part of a network, which is configured by the <code>networks:</code> property and takes the name of an arbitrary Docker network.

After having defined a range of services, one or multiple Docker networks can be configured. A new network can be defined using the <code>networks:</code> property. A final <code>docker-compose.yml</code> file defining an Angular frontend and a Flask backend, both being deployed inside a common **sample-network** is depicted below:

```TS
services:
  Angular_Introduction:
    container_name: Angular_Introduction
    image: angular_introduction
    ports:
      - 127.0.0.1:80:80
    networks:
      - sample-network
  
  Flask_Introduction:
    container_name: Flask_Introduction
    image: flask_introduction
    ports:
      - 127.0.0.1:8080:8080
    networks:
      - sample-network

networks:
  sample-network:
    name: sample-network
```

In order to run the Docker network defined above, please run the following command:

```TS
docker-compose -f docker-compose.yml up -d
```

If everything got configured correctly, the result should similar to the output shown below:
<img class='almost-full-width' src='assets/posts/guides/006_multi_container_applications/hello_world.png'>

## Closing remarks

In previous versions of Docker, it was required to specify a <code>version:</code> for the <code>docker-compose.yml</code> file. But since Docker version <code>v1.27.0</code> that's not required anymore.
