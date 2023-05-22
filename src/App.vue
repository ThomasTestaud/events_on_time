<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>

:root {
    --main-color: #2c3e50;
    --main-red: #f06f6f;
    --main-green: #6dcd78;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-color);
  margin-top: 80px;
}

.nav {
  text-decoration: none;
  color: inherit;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: 1px solid black;
  padding: 0.3rem 0.7rem;;
  border-radius: 2rem;
}

.hover-1,
.hover-2,
.hover-3 {
  transition: color 0.5s, background-color 0.5s, border 0.5s;
}

.hover-1:hover {
  background-color: var(--main-color);
  color: white !important;
  border: 1px solid var(--main-color);
}

.hover-2:hover {
  background-color: var(--main-red);
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0);
}

.hover-3:hover {
  background-color: var(--main-green);
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0);
}

button {
  border: 1px solid var(--main-color);
  border-radius: 1rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  background-color: inherit;
}

</style>
