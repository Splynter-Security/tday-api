# Exercise 1
Use https://api.portasecura.com/lightbulbs for this exercise
## Exercise 1.1
- Copy paste lightbulb-openapi.json in https://editor.swagger.io/
- Create a lightbulb with your name using Postman (you could also make calls from the swagger.io editor, but for the sake of the exercise, we ask you to use Postman)
- Turn on the lightbulb
## Exercise 1.2
- Try to turn off the lightbulb of your neighbour. 
- Try to delete the lightbulb of your neighbour. 
  
# Exercise 2
Use https://api.portasecura.com/lightbulbs-apikey for this exercise. This API is secured using the API Key `aXvETfcWu3iWKicHYnCNviEuokQaMrWn`. You need to add this in a HTTP header called 'apikey': `apikey: <the api key>`
## Exercise 2.1
- Create a lightbulb with your name using Postman
- Turn on the lightbulb
## Exercise 2.2
- Try to turn off the lightbulb of your neighbour pretending you do not know the API key.
- But, you do know the API key! Try to turn off and delete the lightbulb of your neighbour. 
- How would you design the API so that API key protection would be sufficiently secure for this scenario? Explain. 

# Exercise 3 (optional - may be skipped in favor of exercise 4)
## Exercise 3.1
- Create a lightbulb with your name using Postman
- Turn on the lightbulb
## Exercise 3.2
- Try to turn off the lightbulb of your neighbour. 
- Try to delete the lightbulb of your neighbour. 
- Can you delete lightbulbs created as a student via the non-secured lightbulbs API?

# Exercise 4
Use https://api.portasecura.com/lightbulbs-jwt for this exercise.
This api is secured using JWT tokens that are issued by Auth0. To help you get a token, use the "Authenticate" request that is available in the Helper folder of the Postman collection (TDAY.postman_collection.json). You can simply hit 'Get new acess token' to get one! Once you have one, you have to send this token in the HTTP Authorization header: `Authorization: Bearer <your jwt>`
## Exercise 4.1
- Create a lightbulb with your name using Postman
- Turn on the lightbulb
## Exercise 4.2
- Try to turn off the lightbulb of your neighbour. 
- Try to delete the lightbulb of your neighbour. 
- Does it still work? Why (not)?