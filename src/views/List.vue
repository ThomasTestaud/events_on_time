  <template>
    <button id="deconnect" @click="deconnect">Deconexion</button>
    <router-link class="new-graph" to="/new-graph">Create New Graph</router-link>
    <ul v-if="listData.length > 0">
        <li v-for="graph in listData" :key="graph.id"  @click="goToGraph(graph.id)">
            <h2>{{ graph.name }}</h2>
        </li>
    </ul>
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
        listData: [],
        userId: null
      }
    },
  
    mounted() {
      this.getUserId();
      this.ajaxRequest();
    },
  
    methods: {
      
      ajaxRequest() {
        //axios.get(`http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=list&userId=${this.userId}`) //DEV
        axios.get(`https://api-events-on-time.thomastestaud.com/index.php?route=list&userId=${this.userId}`) //PROD
        .then(response => {
          this.listData = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      },

      goToGraph(graphId) {
        this.$router.push({ path: `/graph/${graphId}` });
      },

      deconnect() {
        localStorage.setItem("userId", null);
        this.$router.push({ path: `/connect/` });
      },

      getUserId() {
        if(localStorage.getItem("userId") === null){
          //console.log('connect');
          this.$router.push({ path: `/connect/` });
        }else{
          this.userId = localStorage.getItem("userId");
          //console.log(this.userId);
        }
      }

      
    }
  
  }
  </script>

  <style scoped>
    #deconnect {
      position: absolute;
      left: 1rem;
      top: 1rem;
    }

    h2 {
      border: 1px solid black;
      border-radius: 3px;
      padding: 1rem;
    }

    .new-graph {
      text-decoration: none;
      color: inherit;
      border: 1px solid black;
      border-radius: 2rem;
      padding: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      position: relative;
      top: 2rem;
    }
  </style>