# Cure Firebase

[![Build Status](https://travis-ci.org/mikeybyker/cure-firebase.svg?branch=master)](https://travis-ci.org/mikeybyker/cure-firebase)

An [Angular](https://www.angularjs.org/) 1.5 app with a [Firebase](https://firebase.google.com/) backend. View and rate albums/releases by The Cure. These are from my collection - CDs only. I used [Music Collector](http://www.collectorz.com/music/) to scan my CDs and export the data, with a little massaging to get a Firebase friendly denormalized state.
One day I might get round to adding my vinyl etc. too - though that would take a long, long time. I have lots :-)

### Continuous Integration
This project follows a continuous integration process - from [Github](https://github.com/) to [Travis](https://travis-ci.org) to [Firebase](https://firebase.google.com) hosting. Each push to the repo runs unit-tests, and (assuming a pass) deploys to the live site.

[View live](https://cure.firebaseapp.com/)

### Requirements
  - npm
  - gulp
  - bower

### Installation
```javascript
npm install && bower install
```

### Run
```javascript
gulp serve
```
### Build
```javascript
gulp build
```

###### Add your [Firebase](https://firebase.google.com/) config to index.html

### Version
0.5.0

Mike