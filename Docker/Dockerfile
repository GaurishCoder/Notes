FROM node

ENV MONGO_INITDB_ROOT_USERNAME: admin \
    MONGO_INITDB_ROOT_PASSWORD: qwerty

RUN mkdir -p testapp

COPY . /testapp

CMD [ "node","/testapp/server.js" ]