#!/usr/bin/env bash

# Function to display usage instructions
usage() {
  echo "Usage: ./manage.sh [command]"
  echo "Commands:"
  echo "  deploy            : Trigger a new GCP cloudbuild and cloudrun"
  echo "  build             : Build the Angular project for production"
  echo "  test              : Run unit tests"
  echo "  lint              : Lint the codebase"
  echo "  version           : Display Angular CLI version"
  echo "  help              : Display this help message"
  echo "  build_docker_image: Create a new Docker image"
  echo "  run_docker_image  : Create a container based on the Docker image"
}

build_docker_image() {
    docker build -t blog:latest "$(dirname "$PWD")"
}

run_docker_image() {
    docker run -d --name Blog -p "80:80" blog:latest
}

# Deploy a new version
deploy() {
    gcloud builds submit --config cloudbuild.yaml
}

test() {
    echo "test"
}

# Check if a command is provided
if [ $# -eq 0 ]; then
  echo "Error: No command provided."
  usage
  exit 1
fi

COMMAND=$(echo $1 | tr '[:upper:]' '[:lower:]')

# Check if a command was provided
if [ -z "$COMMAND" ]; then
    echo "Error: Command not provided."
    usage
fi

# Call the corresponding function based on the command
case "${COMMAND}" in
    deploy | build_docker_image | run_docker_image)
        $COMMAND
        ;;
    *)
        echo "Error: Unkown command '$COMMAND'"
        usage
        exit 1
        ;;
esac