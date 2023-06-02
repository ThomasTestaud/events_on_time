<template>
    <div class="header">
        <LogoTitle class="logo-title" :msg="logoProp" :size="logoSize"></LogoTitle>
    </div>
</template>

<script>
    import LogoTitle from '../components/LogoTitleComponent.vue' 
    export default {
        name: 'HeaderComponent',
        data() {
            return {
                logoProp: "All graphs",
                logoSize: "small"
            }
        },
        components: {
            LogoTitle
        },
    }
</script>


<style scoped>

</style>
