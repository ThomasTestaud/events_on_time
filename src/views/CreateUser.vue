  <template>
    <div class="view">
      <LogoTitle :msg="pageName"></LogoTitle>
      <p>{{ errors }}</p>
      <label for="">Username</label><br>
      <input type="text" v-model="username"><br>
      <label for="">Password</label><br>
      <input type="password" v-model="password"><br>
      <label for="">Confirm Password</label><br>
      <input type="password" v-model="confirmPassword"><br>
      <button  class="hover-3" @click="verifyPassword">Create account</button><br>
      <router-link to="/connect">I have an account</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import LogoTitle from '../components/LogoTitleComponent.vue' 
  
  export default {
    name: 'CreateUser',

    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        errors: "",
        pageName: "Create account"
      };
    },
    components: {
      LogoTitle
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
        
        //axios.post('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=user', requestBody) // DEV
        axios.post('https://api-events-on-time.thomastestaud.com/index.php?route=user', requestBody) // PROD
        .then(response => {

          if(response.data.auth){
            const token = response.data.token;
            localStorage.setItem("token", token); // Save the JWT token in local storage
            this.$router.push({ path: `/` });
          }else{
            this.errors = "This username already exist.";
          }

        })
        .catch(error => {
          console.log(error);
        });
      },
      
    }
  
  }
  </script>

  <style scoped>
    .view {
      padding-top: 80px;
      background-image: url('../assets/endless2.svg');
      height: 100%;
    }
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