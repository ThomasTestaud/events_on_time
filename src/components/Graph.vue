<template>
  <nav @click="goToList()" style="text-align:left;">Back</nav>
  <template v-if="graphData.length > 0">
    <h2>{{ graphTitle }}</h2>
      <GraphComponent :graphData="graphData" :key="componentKey"/>
    </template>
    <template v-else>
      <p>This graph has no data...</p>
    </template>
    <button @click="addPoint()">Add point</button>
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
      graphType: "",
      componentKey: 0,
    }
  },

  components: {
      GraphComponent
  },

  mounted() {
    this.ajaxRequest();
  },

  methods: {

    goToList() {
      this.$router.push({ path: `/list` });
    },

    reloadComponent() {
      this.componentKey += 1;
    },

    addPoint() {
      const graphId = this.$route.params.id; // Get the graph ID from the route
      const graphType = this.graphType; // Set the graph type value

      const requestBody = {
        graphType: graphType,
        graphId: graphId
      };

      axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=new-event', requestBody)
        .then(response => {
          //console.log(response.data);
          this.graphData = response.data;
          this.graphTitle = response.data[0].graphName;
          this.graphType = response.data[0].graphType;
          this.reloadComponent();
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    ajaxRequest() {
      const graphId = this.$route.params.id; // Get the graph ID from the route
      axios.get(`http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=graph&graphId=${graphId}`)
      .then(response => {
        this.graphData = response.data;
        this.graphTitle = response.data[0].graphName;
        this.graphType = response.data[0].graphType;
        //console.log(response.data);
        //console.log(this.graphType);
      })
      .catch(error => {
        console.log(error);
      });
    }
    
  }

}
</script>