## Startup

### Configuration files

Before start project we need configure db connection and other security keys.

Application uses [node-config](https://www.npmjs.com/package/config) module which help override default configs.

To override local configuration we need to create file `APP/config/local.json` and override keys from `APP/config/default.json` file.

Example of `local.json`:

```json
{
  "database": {
    "url": "sqlite:///www/tmp/db.sqlite"
  }
}
```

### Install application dependencies

An application uses yarn as dependencies manager. To install dependencies we can following command:

```sh
yarn install
```

### Migrations

Before start application, we need to make sure DB has the last schema. Migrations apply on DB following command:

```sh
yarn migrate
```


### Start environment

For starting an application in development mode we need run following command:

```sh
yarn start:dev
```

For starting an application in production mode  we need run following command:

```sh
yarn start:prod
```

### Docker

To start application in docker we need copy env-file `APP/docker/.env.example` to `APP/docker/.env` and edit `APP/docker/.env` file.

After edit env-file to start an application run following command:

```sh
docker-compose up
```

### PM2

To start application using [pm2](https://github.com/Unitech/pm2) we need run following command:

```sh
# development mode (default)
pm2 start app.json
# production mode
pm2 start app.json --env production
```
