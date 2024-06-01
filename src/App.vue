<script setup>
import NavBar from "./components/NavBar.vue"
import CountriesList from "./components/CountriesList.vue"
import CountryDetails from "./components/CountryDetails.vue"
</script>

<template>
  <div class="app">
    <div>
      <NavBar />
      <router-view />
    </div>
  </div>
</template>

<style></style>
