<template>
	<div></div>
</template>

<script>
export default {
	name: 'refresh',
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$router.replace(to.query.redirect || from.path)
		})
	}
}
</script>