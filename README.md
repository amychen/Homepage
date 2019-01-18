# An interactive homepage startup built with P5.js

### Weather API
The weather forecast is provided through [openweathermap.org's](https://home.openweathermap.org/users/sign_up) API. To get your own weather forecast, create a `auth_token.js` file in the current directory.Create an account on openweathermap.org and find your api key when you sign in. In the `auth_token.js` file, add 

```const auth_token="&appid={enter your api key};"```

### Running as your homepage
To run as your own home startup page on Google Chrome, go to settings and under Appearance, go to 'Show home button' and under New Tab page, change it to the location of the `index.html` page and save. 

### Issues
Every time a new tab is opened, the browser will ask for geolocation permission again.
