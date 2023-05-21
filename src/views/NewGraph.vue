<template>
    <router-link to="/list">Back</router-link>
    <h1>New Graph</h1>
    <label for="">Graph Name</label><br>
    <input type="text" v-model="graphName"><br>
    <button @click="ajaxRequest">Create</button>
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

        // axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=graph&userId='+ localStorage.getItem("userId"), requestBody) // DEV
        axios.post('https://api-events-on-time.thomastestaud.com/index.php?route=graph&userId='+ localStorage.getItem("userId"), requestBody) // PROD
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