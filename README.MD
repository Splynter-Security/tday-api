# Kong
Kong acts as API gateway. 
Ports: 
- 8444: admin UI
- 8443: proxy/gateway

# Pre-configuration (admin only)
## Auth0
https://dev-7czk4wp46c5wdc6b.us.auth0.com/.well-known/openid-configuration

## Set up KONG
docker compose --profile database up

```
curl -o dev-7czk4wp46c5wdc6b.pem https://dev-7czk4wp46c5wdc6b.us.auth0.com/pem
openssl x509 -pubkey -noout -in dev-7czk4wp46c5wdc6b.pem > pubkey.pem
curl -i -X POST https://kong.portasecura.com:8444/consumers \
  --data "username=jwtconsumer" \
  --data "custom_id=jwtconsumer"
curl -i -X POST https://kong.portasecura.com:8444/jwtconsumer/jwt \
  -F "algorithm=RS256" \
  -F "rsa_public_key=@./pubkey.pem" \
  -F "key=https://dev-7czk4wp46c5wdc6b.auth0.com/" # the `iss` field
```

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
