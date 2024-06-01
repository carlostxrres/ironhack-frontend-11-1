<script setup>
import { onMounted } from "vue"
import { useCountryStore } from "../stores/countryStore.js"

const countryStore = useCountryStore()
onMounted(async () => {
  await countryStore.getCountries()
})

const getTo = (alpha3Code) => `/list/${alpha3Code}`
const getImgSrc = (alpha2Code) =>
  `https://flagpedia.net/data/flags/icon/72x54/${alpha2Code.toLowerCase()}.png`
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-5" style="max-height: 90vh; overflow: scroll">
        <div class="list-group" v-if="countryStore.countries.length > 0">
          <RouterLink
            v-for="country in countryStore.countries"
            :key="country.alpha2Code"
            :to="getTo(country.alpha3Code)"
            class="list-group-item list-group-item-action"
          >
            <img :src="getImgSrc(country.alpha2Code)" />
            <p>{{ country.name.common }}</p>
          </RouterLink>
        </div>
        <div v-else>
          <p>Loading list of countries...</p>
        </div>
      </div>
      <div class="col-7">
        <router-view />
      </div>
    </div>
  </div>
</template>
