FROM node:20-alpine as nodework

ARG BUILD_ENV=dev
ARG REACT_APP_BASE_URL
ARG PUBLIC_URL="/"

RUN echo ${BUILD_ENV}
RUN echo ${REACT_APP_BASE_URL}

ENV VITE_APP_API=${REACT_APP_BASE_URL}

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN sh -c "ls -a"
# RUN yarn build-${BUILD_ENV}
RUN if [ "${BUILD_ENV}" = "dev" ||  "${BUILD_ENV}" = "prod" ]; then \
    sh -c "yarn build-${BUILD_ENV}"; \
    elif [ -n "${REACT_APP_BASE_URL}" ]; then \
    sh -c "yarn env-cmd -e default --use-shell \
    'export \
    VITE_APP_API=${REACT_APP_BASE_URL} \
    PUBLIC_URL=${PUBLIC_URL} \
    && yarn vite build'"; \
    else \
    sh -c "yarn env-cmd -e default vite build"; \
    fi


# Nginx Block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /usr/app/dist .
COPY --from=nodework /usr/app/nginx/default.conf /etc/nginx/conf.d