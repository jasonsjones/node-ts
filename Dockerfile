FROM node

MAINTAINER Jason Jones

RUN useradd --user-group --create-home --shell /bin/false node
ENV HOME=/home/node

COPY . $HOME/
RUN chown -R node:node $HOME/

USER node
WORKDIR $HOME/
RUN npm install

CMD ["npm", "start"]
