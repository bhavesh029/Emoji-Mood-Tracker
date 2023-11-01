# Emoji-Mood-Tracker

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



### emoji-tracker
#### Build emoji-trackers Spec & Routes | Start emoji-tracker Service
```sh
npm run build-start-emoji-tracker
```

#### Build emoji-trackers Spec & Routes
```sh
npm run build-emoji-tracker-routes
```

#### Start emoji-tracker Service
```sh
npm run start-emoji-tracker
```

#### Migrate Database
```sh
sh scripts/deploy/database/migrate-db.sh
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