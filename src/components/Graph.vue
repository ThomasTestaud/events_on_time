<template>
  <template v-if="graphData.length > 0">
    <h2>{{ graphTitle }}</h2>
      <GraphComponent :graphData="graphData" />
      <button>Add point</button>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
</template>

<script>
import GraphComponent from './GraphComponent.vue' 
import axios from 'axios';

export default {
  name: 'GraphVue',

  data() {
    return {
      graphData: [],
      graphTitle: "",
    }
  },

  components: {
      GraphComponent
  },

  mounted() {
    this.ajaxRequest();
  },

  methods: {
    
    ajaxRequest() {
      const graphId = this.$route.params.id; // Get the graph ID from the route
      axios.get(`http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=graph&graphId=${graphId}`)
      .then(response => {
        this.graphData = response.data;
        this.graphTitle = response.data[0].graphName;
        //console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
    
  }

}
</script>