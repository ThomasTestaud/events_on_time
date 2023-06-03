<template>
    <div class="header">
        <BtnDeconnexion></BtnDeconnexion>
        <LogoTitle class="logo-title" :msg="logoProp" :size="logoSize"></LogoTitle>
    </div>
</template>

<script>
    import LogoTitle from '../components/LogoTitleComponent.vue' 
    import BtnDeconnexion from '../components/BtnDeconnexion.vue'
    export default {
        name: 'HeaderComponent',
        data() {
            return {
                logoProp: "All graphs",
                logoSize: "small"
            }
        },
        components: {
            LogoTitle,
            BtnDeconnexion
        },
    }
</script>


<style scoped>
    .header {
      position: sticky;
      top: 0rem;
      z-index: 3;
      background: rgb(255,255,255);
      background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 72%);
      padding: 0.5rem;
    }

    .btn-deconnexion {
        position: absolute;
        left: 0.1rem;
        top: 1.4rem;
    }
</style>
