<template>
	<v-app id="meals-menu" toolbar>
		<v-toolbar class="indigo" dark fixed>
			<v-toolbar-title>Meals</v-toolbar-title>
			<v-spacer></v-spacer>
			<meal-creator/>
		</v-toolbar>
		<main>
			<v-container fluid>
				<div v-if="meals.length === 0">
					<img src="../assets/logo.png">
					<h1>FOOOOOOOOD</h1>
					<h4>בנתיים אף אחד לא הוסיף ארוחה. מירב רעבה ):</h4>
				</div>
				<div v-else>
					<v-list two-line>
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
			</v-container>
		</main>
	</v-app>
</template>

<script>
import db from '@/firebase'
import MealCreator from '@/components/MealCreator'
import moment from 'moment'

export default {
	name: 'meals-menu',
	components: {
		MealCreator
	},
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
#meals-menu {
	overflow: hidden;
}

.align-right {
	margin-left: auto;
}
</style>