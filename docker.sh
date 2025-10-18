docker network create tl-network;
docker container stop redis-stack; sudo docker container rm redis-stack; docker run -d --restart always --name redis-stack -p 6379:6379 -p 8001:8001 -e REDIS_ARGS="--requirepass anh08091998t" redis/redis-stack:latest;
docker container stop postgres;
docker container rm postgres;
docker run -d --network=tl-network -p 6432:5432 -e POSTGRES_PASSWORD=buuandbee --name postgres postgres:16.3; sudo sleep 10;
docker container stop hasura;
sudo docker container rm hasura;
sudo docker run -d --network=tl-network -e HASURA_GRAPHQL_ADMIN_SECRET=anh08091998t@HASURA -p 18080:8080 -e HASURA_GRAPHQL_ENABLE_CONSOLE=true -e HASURA_GRAPHQL_METADATA_DATABASE_URL=postgresql://postgres:buuandbee@postgres:5432/postgres --name hasura hasura/graphql-engine:v2.15.2
# sudo docker run -d --network=tl-network --cpus="1.0" --memory="1g" --memory-swap="1g" -e HASURA_GRAPHQL_ADMIN_SECRET=anh08091998t@HASURA -p 18080:8080 -e HASURA_GRAPHQL_ENABLE_CONSOLE=true -e HASURA_GRAPHQL_METADATA_DATABASE_URL=postgresql://postgres:buuandbee@postgres:5432/postgres --name hasura hasura/graphql-engine:v2.15.2


docker compose up -d -f docker-compose.yml