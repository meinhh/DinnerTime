import Vue from 'vue'
import Router from 'vue-router'
import MealsMenu from '@/components/MealsMenu'
import Meal from '@/components/Meal'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'MealsMenu',
			component: MealsMenu
		},
		{
			path: '/meal/:id',
			name: 'meal',
			props: true,
			component: Meal
		}
	]
})
