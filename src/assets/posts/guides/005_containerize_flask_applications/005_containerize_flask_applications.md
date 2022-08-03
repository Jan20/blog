<!--
date=2022-06-27
topic=Docker
-->
<img class='full' src='assets/posts/guides/005_containerize_flask_applications/thumbnail.png'>

# Containerize Flask Apps

As we have seen in the previous post that Docker provides a rather sophiticated toolset for creating images from applications, creating an easy way to share and deploy applications. But let's first take a closer look at creating a minimal working docker image in four rather simple steps.

## Step 1: Minimal Flask application

First take a quick look at a minimal Flask application as simple example. The application does nothing but returning "Hello World" upon calling the single endpoint it provides. Feel free to replace that barebone application at any time.

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

All dependencies required by Flask can be stored inside a requirements.txt file, so that they can be fetched and installed during the image build process.

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

## Step 2: Dockerfile

After having created a minimal Flask application, let's take a closer look at the <code>Dockerfile</code> used to create a Docker image depicted below. The Dockerfile is a text document that contains all the commands necessary to assemble an image. Quite important to note is, that the image gets build inside a build context, which is the set of files at a specified location, such as the present working directory.

All Dockerfiles start with the syntax definition, followed by a reference to a base image used to built upon. In our case, this would by <code>python:3</code>. A working directory for essembling the image gets defined, that may have an arbitrary name such as <code>/app</code>. the next part is a bit more interesting as the requirements.txt file, containing all dependencies required by Flask first gets copied in the working directory. Afterwards the <code>pip3 install</code> command for recursevely installing the dependencies defined in the requirement.txt gets executed. Afterwards, all remaining files get copied to the working dir. Finally, the the Flask application gets executed by running the <code>python3 -m flask run</code> command inside Docker's CMD command block, which is used execute arbitrary command line instructions.

```TS
# syntax=docker/dockerfile:1

FROM python:3

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "app.py"]
```

## Step 3: Building the image

First, make sure that you are in the same directory as the Dockerfile. Afterwards, execute the Docker <code>build</code> that searches for a valid Dockerfile at the present working directory. If a Dockerfile is found, the commands described inside the Dockerfile get executed sequentially. The <code>build</code> may take several additional parameters such as <code>-t</code> short for <code>-tag</code> which specifies an image's name, like <code>flask-introduction:latest</code>, where <code>latest</code> could be just as well replaced by an image's version number. Finally, take note of the <code>.</code> at the end of the build command that sends all files in the present working directory to the Docker deamon as build context.

```TS
docker build -t flask-introduction:latest .
```

## Step 4: Running the created image

After having executed the build command, the newly created image should be listed alongside other images using the <code>docker images</code> command. Now, it is time to actually run a Docker container based on our Docker image. This is achieved by using the <code>docker run</code> command and using the <code>-d</code> detached flag. This flag spins up the Docker container in the background. In addition, we map Fask's default port 5000 to the port 8080 of our localhost and finally provide the name of the image we like to use that is flask-introduction. A container should have been started successfully. All processes running inside Docker including our freshly started container can be observed via <code>docker ps</code>.

```TS
docker images
docker run -d -p 8080:5000 flask-introduction
docker ps
```

The output of the <code>docker images</code> should look similar to the one depicted below:
<img class='almost-full-width' src='assets/posts/guides/005_containerize_flask_applications/docker_images.png'>

## Step 5 (Optional): Take a look at the final result

By spinning up the Docker containing mapping Docker's internal port 5000 to the host's port 8080, the Flask application becomes accessible on localhost. Try it out by opening <code>localhost:8080</code>.
<img class='almost-full-width' src='assets/posts/guides/005_containerize_flask_applications/hello_world.png'>
