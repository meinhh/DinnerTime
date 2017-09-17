<template>
	<div id="app">
		<v-app toolbar footer>
			<v-toolbar class="indigo" dark fixed>
				<v-btn icon to="/">
					<v-icon>home</v-icon>
				</v-btn>
				<v-toolbar-title>Shenhar Meals</v-toolbar-title>
				<v-spacer></v-spacer>
				<user></user>
				<meal-creator/>
			</v-toolbar>
			<main>
				<v-container fluid>
					<router-view></router-view>
				</v-container>
			</main>
			<v-footer class="indigo">
				<span class="white--text">© meinhh 2017</span>
			</v-footer>

		</v-app>
	</div>
</template>

<script>
import MealCreator from '@/components/MealCreator'
import User from '@/components/User'
import firebase from 'firebase'

export default {
	name: 'app',
	components: {
		MealCreator,
		User
	},
	data: () => {
		return {
			user: undefined
		}
	},
	beforeCreate: function() {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				this.user = user
			} else {
				this.user = undefined
			}
		}.bind(this))
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>