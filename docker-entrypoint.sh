#!/bin/sh
set -e

echo "[entrypoint] Running Prisma migrations..."
npx prisma migrate deploy --schema prisma/schema.prisma

echo "[entrypoint] Running seed (first run will insert data, next runs will skip)..."
node dist/prisma/seed.js

echo "[entrypoint] Starting application..."
exec node dist/src/main.js
