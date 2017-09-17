import Firebase from 'firebase'
const firebaseApp = Firebase.initializeApp({
	apiKey: 'AIzaSyA6XH7WwcuX0eRBkVnnmaBqTpZRn3kOLdU',
	authDomain: 'la-vie-boheme.firebaseapp.com',
	databaseURL: 'https://la-vie-boheme.firebaseio.com',
	projectId: 'la-vie-boheme',
	storageBucket: '',
	messagingSenderId: '989171956124'
})
const db = firebaseApp.database()
export default db
