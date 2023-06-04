<template>
  <div class="view">
    <router-link class="nav hover-1" to="/">Back</router-link>
    <h1>New Graph</h1>
    <label for="">Graph Name</label><br>
    <input type="text" v-model="graphName"><br>
    <button class="hover-3" @click="ajaxRequest">Create</button>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NewGraph',
  
    data() {
      return {
        graphName: "",
        data: []
      }
    },
  
    mounted() {
    },
  
    methods: {
      
      ajaxRequest() {

        const requestBody = {
            graphName: this.graphName
        };

        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        //axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=graph', requestBody, config) // DEV
        axios.post('https://api-events-on-time.thomastestaud.com/index.php?route=graph', requestBody, config) // PROD
        .then(response => {
            
            //Redirect to the newly created graph
            this.$router.push({ path: `/graph/${response.data}` });
        })
        .catch(error => {
          console.log(error);
        });
      },

      goToGraph(graphId) {
      this.$router.push({ path: `/graph/${graphId}` });
    }
      
    }
  
  }
  </script>

  <style scoped>

  .view {
    margin-top: 100px;
  }

  input {
    margin-bottom: 1rem;
  }

  </style>