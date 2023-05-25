  <template>
    <p>{{ errors }}</p>
    <label for="">Username</label><br>
    <input type="text" v-model="username"><br>
    <label for="">Password</label><br>
    <input type="password" v-model="password"><br>
    <label for="">Confirm Password</label><br>
    <input type="password" v-model="confirmPassword"><br>
    <button  class="hover-3" @click="verifyPassword">Create account</button><br>
    <router-link to="/connect">I have an account</router-link>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateUser',

    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        errors: ""
      };
    },
  
    methods: {

      verifyPassword() {
        
        if(this.password === this.confirmPassword){
          this.createAccount();
        }else{
          this.errors = "Please make sure both passwords are the same.";
        }
        
      },

      
      createAccount() {

        const requestBody = {
            userName: this.username,
            userPassword: this.password
        };

        axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=user', requestBody) // DEV
        // axios.post('https://api-events-on-time.thomastestaud.com/index.php?route=user', requestBody) // PROD
        .then(response => {
          
          localStorage.getItem("userId"));

          localStorage.setItem("userId", response.data.userId);

            //console.log(response.data.userId);
            const token = response.data.token; // Assuming the API response includes a 'token' field
            localStorage.setItem("token", token); // Save the JWT token in local storage

            //console.log(token);
            this.$router.push({ path: `/` });
        })
        .catch(error => {
          console.log(error);
        });
      },
      
    }
  
  }
  </script>

  <style scoped>
    input {
      margin-bottom: 2rem;
    }
    
    label {
      font-size: 1.5rem;
    }

    button {
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }
  </style>