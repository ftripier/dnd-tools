FROM node:carbon
RUN apt-get update && \
	DEBIAN_FRONTEND=noninteractive apt-get -yq install sqlite3 && \
	rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
WORKDIR /source