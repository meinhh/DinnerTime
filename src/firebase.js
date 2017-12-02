import Firebase from 'firebase'
const firebaseApp = Firebase.initializeApp({
	apiKey: 'someapikey',
	authDomain: 'la-vie-boheme.firebaseapp.com',
	databaseURL: 'https://la-vie-boheme.firebaseio.com',
	projectId: 'la-vie-boheme',
	storageBucket: '',
	messagingSenderId: 'something'
})
const db = firebaseApp.database()
export default db
