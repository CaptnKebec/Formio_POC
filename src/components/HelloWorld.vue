
<template>
  <h1>POC formulaires site web</h1>


  <div>

  </div>
</template>


<script setup lang="ts">
  import { inject } from 'vue';
  import { DataService } from "../services/data.service"
  import fs from 'fs';
  const axios: any = inject('local-api');
  const dataService = new DataService.Data();

  let showResult = "";

  function GetFiles() {
    dataService.adminLogin().then(function (response: any) {
      var tokenAdmin = response.headers['x-jwt-token']

      dataService.getDownloadToken(tokenAdmin).then(function (response: any) {



        dataService.getPdf(response).then(function (response: any) {

          fs.writeFileSync('contact_650836ea8d4468f06fe25866.pdf', response.data);
          console.log('PDF file successfully downloaded and saved!');

        })

      })

    });



  }

</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
