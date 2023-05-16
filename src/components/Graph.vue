<template>
  <h2>Graph Name</h2>
  <GraphComponent/>
  <button>Add point</button>
</template>

<script>
import GraphComponent from './GraphComponent.vue' 

export default {
  name: 'GraphVue',
  components: {
      GraphComponent
  }
}
</script>