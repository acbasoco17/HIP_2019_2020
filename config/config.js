/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					}
				],
				maximumEntries: 3
			}
		},
		{
			module: "compliments",
			position: "bottom_left"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "New York",
				locationID: "5128581",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "e6f75ace7f92efa4d9e412e65d7d7bb3" // API Key
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "New York",
				locationID: "5128581",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "e6f75ace7f92efa4d9e412e65d7d7bb3" // API Key
			}
		},
		{
			module: "newsfeed",
			position: "top",
			config: {
				feeds: [
					{
						title: "Northrop News",
						url: "http://news.northropgrumman.com/rss.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		{
		module: 'MMM-PushBulletNotifications',
		header: 'Notifications',
		position: 'top_center',	// This can be any of the regions.
		config: {
			// See 'Configuration options' for more information.
			accessToken: "o.bzToNHGXJcPuJxBFROdPz3qjSY0BmH97", //PushBullet API Access Token
			endToEndPassword: null,
			numberOfNotifications: 1,
			filterTargetDeviceName: "",
			showPushesSentToAllDevices: true,
			onlyAllowCommandsFromSourceDevices: [],
			fetchLimitPushBullet: 50,
			showPushes: true,
			showPushesOnLoad: true,
			showDismissedPushes: true,
			showMirroredNotifications: true,
			onlyShowLastNotificationFromApplication: true,
			showIndividualNotifications: false,
			showSMS: false,
			showMessage: true,
			showIcons: false,
			showDateTime: false,
			localesDateTime: 'nl-NL',
			playSoundOnNotificationReceived: true,
			soundFile: 'modules/MMM-PushBulletNotifications/sounds/new-message.mp3',
			maxMsgCharacters: 200,
			maxHeaderCharacters: 0,
			showModuleIfNoNotifications: true,
			noNotificationsMessage: "No new notifications",
			debugMode: false,
		}
	}
	]


};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
var firebase = require("firebase");
var PushBullet = require('pushbullet');
var pusher = new PushBullet('o.weOLHHAQhbwZNGf0Y3qoEhzAGOG31eJl');
//Try o.xqjXIFfEF9khpBVy6nKM7D28rxJbohZP if it doesn't work

var date;
var time;
var name;

function sentence() {
  const config = {
    apiKey: "AIzaSyCBYsN7VD4yYAQy-6lK5ug1GLZE63uZxyo",
    authDomain: "magic-mirror-305401.firebaseapp.com",
    databaseURL: "https://magic-mirror-305401-default-rtdb.firebaseio.com",
    projectId: "magic-mirror-305401",
    storageBucket: "magic-mirror-305401.appspot.com",
    messagingSenderId: "128949355841",
    appId: "1:128949355841:web:2ceaf3b302657ee0664dc0",
    measurementId: "G-ZETY1KJ0V4"
  };
  firebase.initializeApp(config);
  var dbRefObject = firebase.database().ref().child("Log").limitToLast(1);

	dbRefObject.on("value", function(querySnapshot) {
    querySnapshot.forEach(function(query){
      var values = query.val();
      date = values["Date"];
      time = values["Time"];
      name = values["User"];
      message = "This bathroom was last cleaned on " + date + " at " + time + " by " + name + "."
    })
    console.log(message);
		pusher.note('ujws89697LgsjEzrQ8czAG', 'New Note', message, function(error, response) {});
  });
};

sentence();
