npm i

npm run compile

mkdir -p app/contracts
cp artifacts/contracts/TreeToken.sol/TreeToken.json ./app/contracts/TreeToken.json

docker network create nft_network

docker-compose up -d

sleep 2

INPUT=`npm run "deploy:local"`

TREE_TOKEN_ADDRESS=$(echo $INPUT | sed 's/.*TreeToken Address: *//g')
echo $TREE_TOKEN_ADDRESS

export TREE_TOKEN_ADDRESS=$TREE_TOKEN_ADDRESS

cd app

docker-compose up --build -d