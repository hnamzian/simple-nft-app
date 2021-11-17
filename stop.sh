rm -rf artifacts
rm -rf cache

docker-compose down -v

cd app

rm -rf dist
rm -rf contracts

docker-compose down -v