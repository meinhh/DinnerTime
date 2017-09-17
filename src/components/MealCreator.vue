<template>
	<div id="meal-info">
		<v-btn icon @click="open">
			<v-icon>add</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" persistent width="50%">
			<v-card>
				<v-card-title>
					<span class="headline">Add Meal</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-form v-model="valid" ref="form">
							<v-layout wrap>
								<div v-if="!user">Log in to add a meal</div>
								<v-flex xs-12 v-else>
									<v-text-field v-model="name" :rules="[(v) => !!v || 'Name is required']" label="Name" hint="name of the event" required></v-text-field>
									<v-menu lazy :close-on-content-click="false" v-model="dateMenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
										<v-text-field slot="activator" label="Date" v-model="date" prepend-icon="event"></v-text-field>
										<v-date-picker v-model="date" :allowed-dates="isDateAllowed" no-title scrollable>
										</v-date-picker>
									</v-menu>
									<v-menu lazy :close-on-content-click="false" v-model="timeMenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
										<v-text-field slot="activator" label="Time" v-model="time" prepend-icon="event"></v-text-field>
										<v-time-picker v-model="time" format="24h" no-title scrollable>
										</v-time-picker>
									</v-menu>
									<v-text-field v-model="info" label="Information"></v-text-field>
									<v-text-field v-model="iconUrl" label="Icon Url"></v-text-field>
								</v-flex>
							</v-layout>
						</v-form>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn class="indigo--text darken-1" flat @click.native="close">Close</v-btn>
					<v-btn class="indigo--text darken-1" flat @click.native="add">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import db from '@/firebase'
import moment from 'moment'
import firebase from 'firebase'

export default {
	name: 'meal-creator',
	data: () => {
		return {
			user: undefined,
			valid: false,
			dialog: false,
			name: null,
			iconUrl: null,
			info: null,
			dateMenu: false,
			date: null,
			timeMenu: false,
			time: null,
			isDateAllowed: (date) => date.getTime() > moment().startOf('day')
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
	},
	firebase: {
		meals: db.ref('meals')
	},
	methods: {
		open() {
			this.dialog = true
		},
		close() {
			this.dialog = false
		},
		add() {
			if (!this.$refs.form.validate()) {
				return
			}

			const fullDate = new Date(`${this.date} ${this.time}`).getTime()

			this.$firebaseRefs.meals.push({
				name: this.name,
				img: this.iconUrl,
				info: this.info,
				date: fullDate,
				creator: this.user.uid
			})

			this.close()
		}
	}
}
</script>

<style scope>

</style>