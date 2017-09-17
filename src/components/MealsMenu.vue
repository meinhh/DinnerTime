<template>
	<div id="meals-menu">

		<md-toolbar>
			<div class="md-toolbar-container">
				<h2 class="md-title">MEALS</h2>
				<meal-creator class="align-right" />
			</div>
		</md-toolbar>

		<div v-if="meals.length === 0">
			<img src="../assets/logo.png">
			<h1>FOOOOOOOOD</h1>
			<h4>בנתיים אף אחד לא הוסיף ארוחה. מירב רעבה ):</h4>
		</div>

		<div v-else>
			<md-list class="meals-menu custom-list md-triple-line">
				<md-list-item v-for=" meal in meals " :key="meal[ '.key'] " v-if="meal.date> (new Date()).getTime()">
					<router-link :to="`/meal/${meal['.key']}`">
						<md-avatar>
							<img v-if="meal.img" :src="meal.img">
							<img v-else src="../assets/logo.png">
						</md-avatar>
						<div class="md-list-text-container">
							<span>{{meal.name}}</span>
							<span>{{meal.date | date}}</span>
							<span>{{meal.info}}</span>
						</div>
					</router-link>
				</md-list-item>
			</md-list>
		</div>
	</div>
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
				return moment(value).format('DD/MM/YYYY hh:mm')
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