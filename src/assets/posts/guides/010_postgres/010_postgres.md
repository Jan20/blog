<!--
date=2023-03-25
topic=Docker
summary=Gives step-by-step instructions for containerizing Postgres database.
-->
# Containerizing PostgreSQL

Running a PostgreSQL database inside a Docker container offers several benefits, including enhanced portability and isolation from other processes and databases running on the host system. However, two factors may be considered when setting up PostgreSQL in a container.

Firstly, it's rare for a database to be deployed in isolation. Therefore, it's advisable to define a service inside a docker-compose.yml file that enables the addition of other services in the future. This approach simplifies the management of multiple services and ensures that they work together smoothly.

Secondly, it's beneficial to have an admin interface in place to facilitate the management of the database. For example, deploying a tool like pgAdmin alongside the PostgreSQL database provides a user-friendly web-based interface for tasks such as creating tables, running queries, and monitoring performance metrics.

It is rather straightforward to spin up a PostgreSQL container by performing three steps:

1. Setting up environment variables to be passed to the Postgres container.

2. Defining a docker-compose file and add a service for the Postgres database. This file will define the configuration for our containers, including network settings, environment variables, and volumes.

3. Setting up pgAdmin, an open-source administration and management tool for PostgreSQL databases that can be installed and configured alongside our Postgres container.

## Step 1: Define Environment Variables

To get started, we need to set up some variables that we'll use when creating the Postgres and pgAdmin containers. For every Postgres database, we'll need a name and a user with a corresponding password. For simplicity, we'll use 'postgres' as the username and password, as shown below.

When creating the pgAdmin container, we'll also need to set up a user account. This user account must be an email address and will require a password. Additionally, we'll need to map port of our host system to pgAdmin. pgAdmin run on port 80 by default, however since we may want to keep port 80 open for other connections, it's recommended to use a different port, such as 5050 used in the example.

<strong>.env</strong>
```TS
POSTGRES_DATABASE_NAME=postgres_database
POSTGRES_DATABASE_USER=postgres
POSTGRES_DATABASE_PASSWORD=postgres
POSTGRES_DATABASE_PORT=5432

PGADMIN_ACCOUNT=admin@admin.com
PGADMIN_PASSWORD=admin
PGADMIN_PORT=5050
```

## Step 2: Defining a docker-compose.yml file

Our docker-compose will contain two services, namely <code>postgres_database</code> for the PostgreSQL database and <code>pgadmin_ui</code> for the pgAdmin instance, a shared a network allowing the two services to interact with each other, and finally a volume.

First, let's create a new network in the "networks" section named "sample-network" that both services will be connected to.

Secondly, we define a new volume in the "volumes" section named "postgres-db-data" that is used by the PostgreSQL service to store its data.

Thirdly, let's create a <code>postgres_database</code> service building on the office PostgreSQL 15.2 Alpine image. It mounts the "postgres-db-data" volume to persist the data stored in the container. It also maps the container's port 5432 to the specified host port, defined in the environment variable <code>POSTGRES_DATABASE_PORT</code>. We use the environment variables defined above for the datb ase name, user, and password. We also add the "restart" option to ensures that the container always restarts automatically.

Finally, we define the <code>pgadmin_ui</code> service using the official pgAdmin4 image. We set the the default email and password for pgAdmin4 to the environment variables <code>PGADMIN_ACCOUNT</code> and <code>PGADMIN_PASSWORD</code>. As mentioned above, we like to map the container's port 80 to different port on our host machine like 5050 defined in <code>PGADMIN_PORT</code> environment variable. the complete <code>docker-compose.yml</code> file may look like the one depicted below.

<strong>docker-compose.yml</strong>
```TS
version: "3.9"

services:
  postgres_database:
    image: postgres:15.2-alpine
    container_name: postgres_database
    volumes:
      - postgres-db-data:/var/lib/postgresql/data
    ports:
      - ${POSTGRES_DATABASE_PORT}:5432
    environment:
      POSTGRES_DB: ${POSTGRES_DATABASE_NAME}
      POSTGRES_USER: ${POSTGRES_DATABASE_USER}
      POSTGRES_PASSWORD: ${POSTGRES_DATABASE_PASSWORD}
    restart: always
    networks:
      - sample-network

  pgadmin_ui:
    image: dpage/pgadmin4
    container_name: pgadmin-ui
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_ACCOUNT}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD}
    ports:
      - ${PGADMIN_PORT}:80
    networks:
      - sample-network

networks:
  sample-network:
    name: sample-network

volumes:
  postgres-db-data:
```

## Step 3: Creating a manage.sh script

We may want to create a small bash script allowing us to start a PostgreSQL database quickly. The script outlined below just starts the the database and pgAdmin interface  defined in a Docker Compose file by running the "docker-compose up" command in detached mode, meaning that they will run in the background.

<strong>manage.sh</strong>
```TS
#!/usr/bin/env bash
case ${1} in
start)
    echo "Starting the postgres database"
    docker-compose -f docker-compose.yml up -d
;;
esac
```

Once we have set up our variables and defined the appropriate docker-compose file, we can start the PostgreSQL database and pgAdmin containers with a single command:

``` TS
sh manage.sh start
```

After starting the PostgreSQL and pgAdmin containers, it may take a few seconds for them to become available. Once they are up and running, we can verify that everything is working as expected by launching the pgAdmin UI in a web browser. To do this, we need to open <strong>localhost:5050</strong> in our preferred web browser.

<img class='almost-full-width' src='assets/posts/guides/010_postgres/pgAdmin_1.png'>

1. You will be prompted to sign in with the admin account and password previously defined the <code>.env</code> file.

2. Add a server by clicking on "Add New Server". Enter a name for the server in the "General" tab.

<img class='almost-full-width' src='assets/posts/guides/010_postgres/pgAdmin_2.png'>

3. In the "Connection" tab, enter the hostname, port, username, and password for the PostgreSQL server you want to connect to. Click on "Save" to save the server connection details.

<img class='almost-full-width' src='assets/posts/guides/010_postgres/pgAdmin_3.png'>

4. Hit save and get redirected to the postgres database

<img class='almost-full-width' src='assets/posts/guides/010_postgres/pgAdmin_4.png'>

## Recap

We've explored a simple approach for running a PostgreSQL database alongside pgAdmin interface, both defined in a docker-compose.yml file.