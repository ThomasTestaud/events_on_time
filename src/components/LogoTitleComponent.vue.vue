<template>
  <div :class="logoTitleClasses">
    <svg id="logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
    <h1>Events_on_Time</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'LogoTitle',
  props: {
    msg: String,
    size: String
  },
  computed: {
    logoTitleClasses() {
      return {
        'logo-title': true,
        'small': this.size === 'small',
      };
    },
  },
}
</script>


<style scoped>
  .logo-title {
    position: relative;
    z-index: 1;
    
  }

  .small {
    font-size: 10px;
  }

  svg {
    height: 8em;
    color: rgba(255, 0, 0, 0.871);
    position: absolute;
    top: -3em;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 0;
  }

  h1 {
    position: relative;
    z-index: 1;
    margin-bottom: 0px;
  }
  p {
    margin-top: 0px;
    position: relative;
    top: -0.5rem;
  }
</style>
