npm install

mysql> CREATE DATABASE western;
./node_modules/db-migrate/bin/db-migrate up --config ./config/database.json -e dev
./node_modules/db-migrate/bin/db-migrate create create_translate_table --config ./config/database.json -e dev



npm start

