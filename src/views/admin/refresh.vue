<template>
    <div></div>
</template>

<script>
export default {
    name: 'refresh',
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$router.push(to.query.redirect || from.path)
        })
    }
}
</script>