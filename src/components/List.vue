<template>
    
        <h2>xxc</h2>
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
        axios.get('http://localhost:3000/MVC_PHP/API_Event_On_Time/index.php?route=graphs&userId=1')
        .then(response => {
          this.listData = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      }
      
    }
  
  }
  </script>