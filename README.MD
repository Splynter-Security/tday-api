# Lightbulb API Documentation
## Get up and running
docker-compose up --build

## API Overview
curl -X POST -H "Content-Type: application/json" -d '{"name": "bulb-name"}' http://localhost:3000/lightbulbs

curl http://localhost:3000/lightbulbs

curl http://localhost:3000/lightbulbs/{name}

curl -X PUT -H "Content-Type: application/json" -d '{"name": "bulb-name", "status": "on"}' http://localhost:3000/lightbulbs

curl -X DELETE -H "Content-Type: application/json" -d '{"name": "bulb-name"}' http://localhost:3000/lightbulbs

curl -X DELETE http://localhost:3000/lightbulbs/all

