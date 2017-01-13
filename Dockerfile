FROM node

MAINTAINER Jason Jones

RUN useradd --user-group --create-home --shell /bin/false nodets
ENV HOME=/home/nodets

COPY . $HOME/
RUN chown -R nodets:nodets $HOME/

USER nodets
WORKDIR $HOME/
RUN npm install

CMD ["npm", "start"]
