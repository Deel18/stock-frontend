# Stock-trading Front-end

### Setup

Run the by first installing it

```npm install```

Then start the app

```npm start```


### Project

For the front-end part of my project I chose to work with the framework React. React is a bare bones framework/library which enables you to pick and choose what you wish to put into your application, this way you can minimize bloat. The idea behind React is to work with components, turning different pieces of the UI into smaller components which then interact with one another. Overall, I have found React to be easy to get started working with and it helps you debloat your application. The various minor components of my app are connected to the API in order to retrieve data for the user. By making different calls I am able to combine the data in to different views to better present it for the user. At the moment the login is built around using JWT-token to verify users, which makes it easy to store in localstorage and pass around where needed. The user obtains the token by verifying themselves against the API.

The app is setup to be simple, as the user you can login/logout, access your profile and the stock market. From the profile you can add balance to your account and see an overview of your portfolio. You can then go to the stock market to invest in some stocks. The stock market uses Chart.js to display the stock prices in real time. I chose Chart.js as it is a rather well known and easy to use technology, making it easy to setup and debug if there are any issues. They also provide excellent documentation, making it a solid choice. For the graph I opted to separate it into smaller components, essentially creating a component which holds the graph and another component which would handle the buying/selling part of the stocks. These components are connected to a microservice which simulates stock prices by emitting the prices every 5 seconds. Then from the frontend I connect it to the graph and show all data being sent with timestamps. I think the combination works quite well, eventhough I feel like I could have styled my graph a bit better.
