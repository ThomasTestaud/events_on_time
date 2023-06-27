  <template>
    <div class="view">
      <HeaderComponent class="logo-title"></HeaderComponent>
      <router-link class="new-graph" to="/new-graph">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </router-link>
      <ul v-if="listData.length > 0">
        <li class="hover-3" v-for="graph in listData" :key="graph.id"  @click="goToGraph(graph.id)">
          <h2>{{ graph.name }}</h2>
          <p>Total number of events: {{ graph.events }}</p> 
          <p>From {{ calculateDates(graph.first_event) }} to {{ calculateDates(graph.last_event) }} at {{ calculateTime(graph.last_event) }}</p>
        </li>
      </ul>
      <template v-else>
        <LoaderComponent></LoaderComponent>
      </template>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import HeaderComponent from '../components/HeaderComponent.vue' 
  import LoaderComponent from '../components/LoaderComponent.vue' 
  
  export default {
    name: 'ListPage',
  
    data() {
      return {
        listData: [],
        userId: null,
        requestStatus: "Loading...",
        logoProp: "All graphs",
        logoSize: "small"
      }
    },

    components: {
      HeaderComponent,
      LoaderComponent
    },
  
    mounted() {
      this.getUserId();
      this.ajaxRequest();
    },
  
    methods: {

      calculateDates(timeStamp) {
        return new Date(timeStamp * 1000).toLocaleDateString('en-GB');
      },

      calculateTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      },
      
      ajaxRequest() {

        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        //axios.get(`http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=list`, config) //DEV
        axios.get(`https://api-events-on-time.thomastestaud.com/index.php?route=list`, config) //PROD
        .then(response => {
          this.listData = response.data;
          this.requestStatus = "No list has been found for this user..."
        })
        .catch(
          
          error => {
          console.log(error);
          this.$router.push({ path: `/connect/` });
        });
      },

      goToGraph(graphId) {
        this.$router.push({ path: `/graph/${graphId}` });
      },

      getUserId() {
        if(localStorage.getItem('token') === null){
          this.$router.push({ path: `/connect/` });
        }
      }

      
    }
  
  }
  </script>

  <style scoped>
    .view {
      background-image: url('../assets/endless2.svg');
      height: 100%;
    }

    .new-graph {
      text-decoration: none;
      color: inherit;
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0rem;
      position: fixed;
      opacity: 1;
      bottom: 1rem;
      right: 1rem;
      z-index: 1;
      box-shadow: 1px 1px 7px;
      background-color: white;
      transition: transform 0.4s;
    }

    .new-graph:hover {
      transform: scale(1.2);
    }


    .new-graph svg {
      height: 3rem;
      color: inherit;
      transition: transform 0.4s;
    }

    .new-graph svg:hover {
      transform: rotate(-0.25turn);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      position: relative;
      top: 0rem;
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
      
    }

    li h2 {
      font-weight: bold;
      font-size: 1.5rem;
    }

    #request-status {
      position: relative;
      top: 2rem;
    }
  </style>