#! /bin/sh

yarn install --force
NODE_ENV=$APP_ENV ./node_modules/.bin/sequelize db:migrate

if [ "$APP_ENV" = "development" ]
then
   yarn start:dev
else
   yarn build && yarn start:prod
fi
