# A simple discord.js bot template using typescript

## How to install

Clone the repository in your computer using:
```
git clone https://github.com/Luisin13/Discord.js-TS-Boilerplate.git
```
Install required dependencies with: 
```
yarn install
```
Setup `.env` following the `.env.example`, if you need help follow the [Discord.js guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
```properties
BOT_TOKEN=NOT.A.REAL.TOKEN
TEST_GUILD_ID=12345678901234567890
BOT_CLIENT_ID=1234567890123456789
BOT_PREFIX=!
```
And after setting up the `.env` you can finally start the development environment with
```
yarn start
```
To compile to javascript use
```
tsc
```
And to run the javascript version use
```
node .
```