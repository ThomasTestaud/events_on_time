  <template>
    <router-link class="link" to="/new-graph">New Graph</router-link>
    <template v-if="listData.length > 0">
        <div v-for="graph in listData" :key="graph.id"  @click="goToGraph(graph.id)">
            <h2>{{ graph.name }}</h2>
            <p>{{ graph.type }}</p>
        </div>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ListPage',
  
    data() {
      return {
        listData: []
      }
    },
  
    mounted() {
      this.ajaxRequest();
    },
  
    methods: {
      
      ajaxRequest() {
        axios.get('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=list&userId=1')
        .then(response => {
          this.listData = response.data;
          //console.log(response.data);
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
    
  </style>