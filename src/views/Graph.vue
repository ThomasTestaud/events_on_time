<template>
  <div class="view">
    <router-link class="nav hover-1" to="/">Back</router-link>
    <template v-if="Object.keys(graphData).length > 0">
      <h2>{{ graphTitle }}</h2>
        <GraphComponent :graphData="graphData" :key="componentKey"/>
      </template>
      <template v-else>
        <p>This graph has no data...</p>
      </template>
      <button id="add-event" class="hover-3" @click="addPoint()">Add event</button>
  </div>
</template>

<script>
import GraphComponent from '../components/GraphComponent.vue' 
import axios from 'axios';

export default {
  name: 'GraphVue',

  data() {
    return {
      graphData: [],
      graphTitle: "",
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
      this.$router.push({ path: `/` });
    },

    reloadComponent() {
      this.componentKey += 1;
    },

    addPoint() {
      const graphId = this.$route.params.id; // Get the graph ID from the route

      const requestBody = {
        graphId: graphId
      };
      
      const token = localStorage.getItem('token');
      const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

      //axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=event', requestBody, config) // DEV
      axios.post('https://api-events-on-time.thomastestaud.com/index.php?route=event', requestBody, config) //PROD
        .then(response => {
          this.graphData = response.data;
          //this.graphTitle = response.data['graphData']['graphName'];
          this.graphTitle = response.data[0]['graphName'];
          //console.log(response.data);
          this.reloadComponent();
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    ajaxRequest() {
      const token = localStorage.getItem('token');
      const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      const graphId = this.$route.params.id; // Get the graph ID from the route
      //axios.get(`http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=graph&graphId=${graphId}`, config) // DEV
      axios.get(`https://api-events-on-time.thomastestaud.com/index.php?route=graph&graphId=${graphId}`, config) // PROD
      .then(response => {
        this.graphData = response.data;
        //this.graphTitle = response.data['graphData']['graphName'];
        this.graphTitle = response.data[0]['graphName'];
        //console.log(response.data['eventsArrays']);
        //console.log(this.graphData['eventsArrays']);
      })
      .catch(error => {
        console.log(error);
      });
    },
    
  }

}
</script>
<style scoped>
  .view {
    padding-top: 80px;
    background-color: white;
    /*height: 100%;*/
    /*box-sizing: border-box;*/
  }

  #add-event {
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 2rem;
  }

</style>