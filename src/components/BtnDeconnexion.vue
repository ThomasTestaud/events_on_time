<template>
        <button @click="deconnect"  class="btn-deconnexion">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
        </button>
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

    svg {
        height: 1.8rem;
    }

    button {
        border: 0px solid red;
        padding: 0rem;
        margin: 0rem 0rem;
    }
    
</style>