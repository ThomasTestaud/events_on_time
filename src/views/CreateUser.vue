  <template>
    <label for="">Username</label><br>
    <input type="text"><br>
    <label for="">Password</label><br>
    <input type="password"><br>
    <label for="">Confirm Password</label><br>
    <input type="password"><br>
    <button @click="createAccount">Create account</button><br>
    <router-link class="link" to="/connect">I have an account</router-link>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateUser',

  
    mounted() {
      this.ajaxRequest();
    },
  
    methods: {
      
      createAccount() {
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