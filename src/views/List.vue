  <template>
    <button id="deconnect" @click="deconnect" class="hover-2">Deconexion</button>
    <router-link class="new-graph hover-1" to="/new-graph">Create New Graph</router-link>
    <ul v-if="listData.length > 0">
        <li class="hover-3" v-for="graph in listData" :key="graph.id"  @click="goToGraph(graph.id)">
            {{ graph.name }}
        </li>
    </ul>
    <template v-else>
      <p id="request-status">{{ requestStatus }}</p>
    </template>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ListPage',
  
    data() {
      return {
        listData: [],
        userId: null,
        requestStatus: "Loading..."
      }
    },
  
    mounted() {
      this.getUserId();
      this.ajaxRequest();
    },
  
    methods: {
      
      ajaxRequest() {

        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('token');
        //console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios.get(`http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=list`, config) //DEV
        //axios.get(`https://api-events-on-time.thomastestaud.com/index.php?route=list&userId=${this.userId}`, config) //PROD
        .then(response => {
          this.listData = response.data;
          this.requestStatus = "No list has been found for this user..."
          
          //console.log(response.data);
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
        localStorage.setItem("token", null);
        this.$router.push({ path: `/connect/` });
      },

      getUserId() {
        if(localStorage.getItem("userId") === null){
          this.$router.push({ path: `/connect/` });
        }else{
          this.userId = localStorage.getItem("userId");
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
      
    }

    .new-graph {
      text-decoration: none;
      color: inherit;
      border: 1px solid black;
      border-radius: 2rem;
      padding: 1rem;
      position: relative;
      top: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      position: relative;
      top: 2.5rem;
      max-width: 1000px;
      margin: auto;
      margin-bottom: 4rem;
    }

    li {
      cursor: pointer;
      border: 1px solid black;
      border-radius: 3px;
      padding: 1rem;
      margin: 1rem;
      font-weight: bold;
      font-size: 1.5rem;
    }

    #request-status {
      position: relative;
      top: 2rem;
    }
  </style>