#!/bin/bash
set -x;

/bin/bash /entrypoint.sh mongod > /dev/null 2>&1 &

cp .env.example .env;
npm run build;
npm start;