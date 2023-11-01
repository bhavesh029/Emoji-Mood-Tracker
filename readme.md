# Emoji-Mood-Tracker

##Prerequisite
```
Docker should be installed
node should be installed
```

##Getting Started
```
npm i 
create .env in root folder
copy test.env content inside .env
npm run setup-docker
```
## Setup Project
### Environmental setup
1. Add database url in `.env` file, the file should be present at the root
```sh
DATABASE_URL="postgres://bhavesh:bhavesh@localhost:6432/postgres?schema=emoji_tracker_app"
```

## API build & deployment

---
### Build All Routes
```sh
npm run build-routes
```


#### Start emoji-tracker Service
```sh
npm run start-server
```


## Links
Open API: 

`
emoji-tracker:` http://localhost:3334/emoji-trackers/docs`
`

`
server:` {baseurl}/docs`
`

<br>