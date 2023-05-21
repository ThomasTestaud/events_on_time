  <template>
    <p>{{ errors }}</p>
    <label for="">Username</label><br>
    <input type="text" v-model="username"><br>
    <label for="">Password</label><br>
    <input type="password" v-model="password"><br>
    <button @click="connect">Connexion</button><br>
    <router-link class="link" to="/create-account">Create a new account</router-link>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ConnectView',

    data() {
      return {
        username: "",
        password: "",
        errors: ""
      };
    },
  
    methods: {

      connect() {
        const requestBody = {
            userName: this.username,
            userPassword: this.password
        };

        //axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=connect', requestBody) //DEV
        axios.post('https://api-events-on-time.thomastestaud.com/index.php?route=connect', requestBody) //PROD
        .then(response => {
          
          if(response.data === false){
            this.errors = "Username or password incorrect."
          }else{
            localStorage.setItem("userId", response.data.id);
            this.$router.push({ path: `/list/` });
          }

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