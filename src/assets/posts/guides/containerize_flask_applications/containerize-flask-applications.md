<!--
date=2022-06-27
topic=Docker
series=Docker
series_section=2
summary=This post covers the creation of a container image for a minimal Flask application.
-->

# Containerize Flask Apps

Docker's container runtime allows to run applications in their dedicated containers based on a predefined image. However, how are container images created? Let's answer this question by building a minimal Flask application, creating a corresponding image and spin up a container based on that image.

## Step 1: Create a Flask Application

Flask is a minimal Python library for writing web applications. If you are interested to learn more about the library itself, take a look at [Flask's documentation](https://flask.palletsprojects.com/en/2.2.x/). However, our application is intended to be as minimal as it gets. It will spin up a webserver doing not much more than returning "Hello World from Flask" upon calling the single endpoint it provides. It consists of a single app.py file called that's content is depicted below:

<b>app.py</b>

```TS
from flask import Flask
from waitress import serve

app = Flask(__name__)


@app.after_request
def add_access_control_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, HEAD, OPTIONS, POST, PUT"
    return response


@app.route('/')
def hello_world():
    return {"message": "Hello World from Flask"}


if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=8080)

```

Flask requires a range of dependencies that are defined in a requirements.txt file, so that they can be fetched and installed during the image's build process.

<b>requirements.txt</b>

```TS
click==8.1.3
Flask==2.1.2
importlib-metadata==4.11.4
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.1
waitress==2.1.2
Werkzeug==2.1.2
zipp==3.8.0
```

## Step 2: Create a Dockerfile

After having created a minimal Flask application, let's take a closer look at the <code>Dockerfile</code> used to create a Docker image depicted below. The Dockerfile is a text document that contains all the commands necessary to assemble an image. An image gets build within a build context, which is the set of files at a specified location, such as the present working directory.

All Dockerfiles start with the syntax definition, followed by a reference to a base image used to built upon. In our case, this would be <code>python:3.9</code> containing a Debian distribution and as the name suggests Python 3.9. A working directory for essembling the image gets defined, that may have an arbitrary name such as <code>/app</code>. The requirements.txt file containing all dependencies required by Flask first gets copied in the working directory. Afterwards the <code>pip3 install</code> command gets executed that recursevely installs all dependencies defined in the requirement. Then, the <code>COPY . .</code> command copies of the project's files to the working directory. Finally, we define an entry point for the application by running the <code>python3 app.py</code> command inside Docker's CMD command block, which is used to execute arbitrary command line instructions.

```TS
# syntax=docker/dockerfile:1

FROM python:3.9

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "app.py"]
```

## Step 3: Build the Image

First, make sure that you are in the same directory as the Dockerfile. Afterwards, execute the Docker <code>build</code> command that searches for a valid Dockerfile at the present working directory. If a Dockerfile like the one shown above is found, the commands described inside the Dockerfile get executed sequentially. The <code>build</code> may take several additional parameters such as <code>-t</code> short image's tag consisting of a image's name, followed by an optional version number. In our case, we default to <code>latest</code>, but we could just as well have chosen <code>1.0</code> or any other version number. Finally, take note of the <code>.</code> at the end of the build command that sends all files in the present working directory to the Docker deamon as build context.

```TS
docker build -t flask-introduction:latest .
```

## Step 4: Run the Image

After having executed the build command, the newly created image should be listed alongside other images using the <code>docker images</code> command. Now, it is time to actually run a Docker container based on our Docker image. This is achieved by using the <code>docker run</code> command and using the <code>-d</code> (short for <code>--detached</code>)flag for running a container in the background. In addition, we map Fask's default port <code>5000</code> to the port <code>8080</code> of our localhost by using the <code>-p</code> (short for <code>--publish</code> flag. The syntax for mapping ports of a host machine Finally, we provide the name of the image we like to use that is flask-introduction. A container should have been started successfully. All processes running inside Docker including our freshly started container can be observed via <code>docker ps</code>.

```TS
docker images
docker run -d -p 8080:5000 flask-introduction
docker ps
```

The output of the <code>docker images</code> should look similar to the one depicted below:
<img class='almost-full-width' src='assets/posts/guides/containerize_flask_applications/docker_images.png'>

## Step 5 (Optional): Take a look at the final result

By spinning up the Docker containing mapping Docker's internal port 5000 to the host's port 8080, the Flask application becomes accessible on localhost. Try it out by opening <code>localhost:8080</code>.
<img class='almost-full-width' src='assets/posts/guides/containerize_flask_applications/hello_world.png'>
