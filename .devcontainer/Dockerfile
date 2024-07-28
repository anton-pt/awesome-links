ARG VARIANT=20-bullseye
FROM mcr.microsoft.com/devcontainers/typescript-node:1-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends inotify-tools
