FROM node:12.3-alpine
# TODO: take a look at https://github.com/nodejs/docker-node
# SHELL ["/bin/bash", "-c"]

# These are arbitrary for now.
# Environment=[Dev, Test, Staging, Production]
ENV ENVIRONMENT=Development
# Stage=[Build, QA, Release]
ENV STAGE=Build

# Assumes the base image has a non-root 'node' user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# TODO: REDIS ONLY SETTING - MOVE TO SEPARATE CONTAINER
# RUN echo never > /sys/kernel/mm/transparent_hugepage/enabled
# RUN echo never > /sys/kernel/mm/transparent_hugepage/enabled >> /etc/rc.local

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

# RUN ls -hal /home/node/app/node_modules

# RUN npm cache clean
# RUN npm cache --verify

# TODO: This doesn't actually publish but just documents intent? :S.
# EXPOSE 8002

# ENTRYPOINT ["/bin/bash"]
# CMD ["nodemon", "./bin/www"]
CMD ["npm", "start"]