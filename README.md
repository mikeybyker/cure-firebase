# Cure Firebase

An [Angular](https://www.angularjs.org/) 1.5 app with a [Firebase](https://firebase.google.com/) backend. View and rate albums/releases by The Cure. These are from my collection - CDs only. I used [Music Collector](http://www.collectorz.com/music/) to scan my CDs and export the data, with a little massaging to get a Firebase friendly denormalized state.
One day I might get round to adding my vinyl etc. too - though that would take a long, long time. I have lots :-)

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

###### Add your [Firebase](https://firebase.google.com/) config to the firebaseConfig constant in app/index.firebase.txt and rename index.firebase.js

### Version
0.1.0

Mike