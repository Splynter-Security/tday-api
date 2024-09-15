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
## Start API
Only place to change URLs is in frontend/index.html
docker-compose up --build

# Lightbulb Exercise documentation
## API Overview
Copy paste lightbulb-openapi.json in https://editor.swagger.io/
This Openapi file shows the documentation for the non-secured API. 

Two additional endpoints are available, one for basic auth and one for JWT auth:
- lightbulbs-basic
- lightbulbs-apikey
- lightbulbs-jwt

For example, instead of calling https://api.portasecura.com/lightbulbs you should now call https://api.portasecura.com/lightbulbs-apikey

## Credentials
- non-secure version: no credentials needed
- API key: aXvETfcWu3iWKicHYnCNviEuokQaMrWn
- basic auth: student:student
- JWT auth: use the Postman collection, a request has been prepared using which you can get a token (you are free to register with any email address, there is no mail verification check)

## Endpoints:
- API: https://api.portasecura.com
- Dashboard (admin-only): https://apidashboard.portasecura.com

# Exercises
## Exercise 1
- Copy paste lightbulb-openapi.json in https://editor.swagger.io/
- Create a lightbulb with your name
- Turn on the lightbulb

## Exercise 2
Same exercise as exercise 1, but now use the lightbulbs-apikey path. 

## Exercise 3
Same exercise as exercise 1, but now use the lightbulbs-basic path. Working credentials are 'student:student'. 
Can you delete lightbulbs created as a student via the non-secured lightbulbs API?

## Exercise 4
Same exercise as exercise 1, but now use the lightbulbs-jwt path. This api is secured using JWT tokens that are issued by Auth0. To help you get a token, use the "Authenticate" request that is available in the Helper folder of the Postman collection. You can simply hit 'Get new acess token' to get one!
