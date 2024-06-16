#!/bin/sh

# Run the migrations
node ./dist/migrate.js

# Run the seeders
node ./dist/seeders.js

# Start the server
node ./dist/src/main