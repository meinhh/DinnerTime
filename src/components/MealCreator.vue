<template>
	<div id="meal-info">
		<md-dialog md-open-from="#add-button" md-close-to="#add-button" :ref="this.dialogName">
			<md-dialog-title>Add Meal</md-dialog-title>
			<md-dialog-content>
				<form>
					<md-input-container :class="{'md-input-invalid': isNameError}">
						<label>Name</label>
						<md-input required v-model="name"></md-input>
					</md-input-container>
					<md-input-container>
						<label>Icon Url</label>
						<md-input v-model="iconUrl"></md-input>
					</md-input-container>
					<md-input-container>
						<label>Information</label>
						<md-input v-model="info"></md-input>
					</md-input-container>
					<datepicker v-model="date" name="mealDate"></datepicker>
				</form>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary" @click="closeDialog()">Close</md-button>
				<md-button class="md-primary" @click="add()">Add</md-button>
			</md-dialog-actions>
		</md-dialog>
		<md-button class="md-icon-button" id="add-button" @click="openDialog('meal-creator-dialog')">
			<md-icon>add</md-icon>
		</md-button>
	</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import db from '@/firebase'

export default {
	name: 'meal-creator',
	components: {
		Datepicker
	},
	data: () => {
		return {
			dialogName: 'meal-creator-dialog',
			isNameError: false,
			name: null,
			iconUrl: null,
			info: null,
			date: new Date()
		}
	},
	firebase: {
		meals: db.ref('meals')
	},
	methods: {
		openDialog() {
			this.$refs[this.dialogName].open()
		},
		closeDialog() {
			this.$refs[this.dialogName].close()
		},
		add() {
			if (!this.name || this.name === '') {
				this.isNameError = true
				return
			}

			if (this.date < new Date()) {
				return
			}

			this.$firebaseRefs.meals.push({
				name: this.name,
				img: this.iconUrl,
				info: this.info,
				date: this.date.getTime()
			})

			this.closeDialog()
		}
	}
}
</script>