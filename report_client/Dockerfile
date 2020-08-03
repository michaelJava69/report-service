FROM mhart/alpine-node:latest
ADD package.json /tmp/package.json
RUN cd /tmp && npm update
RUN mkdir -p /opt/client && cp -a /tmp/node_modules /opt/client/
 
WORKDIR /opt/client
ADD . /opt/client

EXPOSE 8000

CMD ["npm", "start"]
