###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2021-04-14                                              ##
## version         : 1.1                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
FROM node:16-alpine

RUN apk update && apk add build-base git python3

# COPY package.json .
# COPY package-lock.json .
# COPY ./src ./src
# COPY ./dist ./dist
# COPY ./resources ./resources
# COPY ./spec ./spec
COPY . .

RUN npm install -g npm
# RUN npm install typescript
#tsconfig-paths
RUN npm install
#RUN npm run build


EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

# CMD ["npm", "run start:prod"]

CMD npm run start
