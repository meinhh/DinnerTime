<template>
	<div id="meal">
		{{meal}}
	</div>
</template>

<script>
import db from '@/firebase'

export default {
	name: 'meal',
	props: {
		id: {
			type: String,
			required: true
		}
	},
	created() {
		this.$bindAsObject('meal', db.ref('meals').child(this.id))
	}
}
</script>
