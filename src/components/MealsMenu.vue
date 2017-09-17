<template>
	<div id="meals-menu">
		<div v-if="meals.length === 0">
			<img src="../assets/logo.png">
			<h1>FOOOOOOOOD</h1>
			<h4>בנתיים אף אחד לא הוסיף ארוחה. מירב רעבה ):</h4>
		</div>
		<div v-else>
			<v-list two-line class="fixed">
				<v-list-tile :to="`/meal/${meal['.key']}`" avatar v-for="meal in meals" :key="meal[ '.key']" v-if="meal.date> (new Date()).getTime()">
					<v-list-tile-avatar>
						<img v-if="meal.img" :src="meal.img">
						<img v-else src="../assets/logo.png">
					</v-list-tile-avatar>
					<v-list-tile-content>
						<v-list-tile-title>{{ meal.name }}</v-list-tile-title>
						<v-list-tile-sub-title class="grey--text text--darken-4">{{ meal.date | date }}</v-list-tile-sub-title>
						<v-list-tile-sub-title>{{ meal.info }}</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</div>
	</div>
</template>

<script>
import db from '@/firebase'
import moment from 'moment'

export default {
	name: 'meals-menu',
	firebase: {
		meals: db.ref('meals')
	},
	filters: {
		date: (value) => {
			if (value) {
				return moment(value).format('DD/MM/YYYY HH:mm')
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fixed {
	overflow: scroll;
}
</style>