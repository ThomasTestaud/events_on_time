<template>
    <div class="btn-deconnexion">
        <button @click="deconnect" class="hover-2">Deconexion</button>
    </div>
</template>

<script>
    export default {

        name: 'BtnDeconnexion',
  
        methods: {

            deconnect() {
            localStorage.setItem("token", null);
            this.$router.push({ path: `/connect/` });
          },
        }
    }
</script>


<style scoped>
    .btn-deconnexion {
        z-index: 2;
    }
</style>