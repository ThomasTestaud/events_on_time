  <template>
    <label for="">Username</label><br>
    <input type="text"><br>
    <label for="">Password</label><br>
    <input type="password"><br>
    <button @click="connect">Connexion</button><br>
    <router-link class="link" to="/create-account">Create a new account</router-link>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ConnectView',

  
    mounted() {
      
    },
  
    methods: {
      
      connect() {
        this.$router.push({ path: `/list/` });
      },

      ajaxRequest() {
        axios.get('')
        .then(response => {
          this.listData = response.data;
          //console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      }
      
    }
  
  }
  </script>

  <style scoped>
    
  </style>