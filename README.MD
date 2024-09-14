# Kong
Kong acts as API gateway. 
Ports: 
- 8444: admin UI
- 8443: proxy/gateway


# Lightbulb API Documentation
## Get up and running
docker-compose up --build

## Change urls
Only place to change URLs is in frontend/index.html

## API Overview
### Create new bulb
curl -X POST -H "Content-Type: application/json" -d '{"name": "bulb-name"}' http://localhost:3000/lightbulbs

### Get all bulbs
curl http://localhost:3000/lightbulbs

### Get a single bulb
curl http://localhost:3000/lightbulbs/{name}

### Turn on/off bulb
curl -X PUT -H "Content-Type: application/json" -d '{"name": "bulb-name", "status": "on"}' http://localhost:3000/lightbulbs

### Delete bulb
curl -X DELETE -H "Content-Type: application/json" -d '{"name": "bulb-name"}' http://localhost:3000/lightbulbs

### Delete all bulbs (meant for admin only)
curl -X DELETE http://localhost:3000/lightbulbs/delete-all

## Exercise 
