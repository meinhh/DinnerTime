<template>
	<div id="user">
		<div v-if="user">
			<button @click="signOut">Sign Out</button>
			<v-avatar size="36px" slot="activator">
				<img :src="user.photoURL">
			</v-avatar>
		</div>
		<div v-else>
			<button @click="signIn">Sign in</button>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
	name: 'user',
	data: () => {
		return {
			user: null
		}
	},
	beforeCreate: function() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.user = user
			}
		})
	},
	methods: {
		signIn() {
			const provider = new firebase.auth.GoogleAuthProvider()
			firebase.auth().signInWithRedirect(provider).then((result) => {
				this.user = result.user
			}).catch(err => console.log(err))
		},
		signOut() {
			firebase.auth().signOut().then(() => {
				this.user = null
			}).catch(err => console.log(err))
		}
	}
}
</script>