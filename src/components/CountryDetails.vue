<script setup>
import { useRoute } from "vue-router"
import { onMounted, watch } from "vue"
import { useCountryStore } from "../stores/countryStore.js"

const route = useRoute()
const countryStore = useCountryStore()

const getNewCountryData = async () => {
  const { alpha3Code } = route.params
  await countryStore.getCountry(alpha3Code)
  console.log(countryStore.selectedCountry)
}

onMounted(getNewCountryData)
watch(() => route.params.alpha3Code, getNewCountryData)

const getImgSrc = (alpha2Code) =>
  `https://flagsapi.com/${alpha2Code}/flat/64.png`

const getDisplayArea = (area) =>
  area.toLocaleString("en-US", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "short",
  })

//
</script>
<template>
  <section v-if="countryStore.selectedCountry">
    <img
      :src="getImgSrc(countryStore.selectedCountry.alpha2Code)"
      :alt="`Flag of ${countryStore.selectedCountry.name.common}`"
    />
    <h1>{{ countryStore.selectedCountry.name.common }}</h1>
    <table class="table">
      <thead></thead>
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>
            <p
              v-if="
                countryStore.selectedCountry.capital.length > 0 &&
                countryStore.selectedCountry.capital[0].length > 0
              "
            >
              {{ countryStore.selectedCountry.capital.join(", ") }}
            </p>
            <p v-else>No capital</p>
          </td>
        </tr>
        <tr>
          <td>Area</td>
          <td>
            {{ getDisplayArea(countryStore.selectedCountry.area) }}<sup>2</sup>
          </td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul v-if="countryStore.selectedCountry.borders.length > 0">
              <li
                v-for="border in countryStore.selectedCountry.borders"
                :key="border"
              >
                <router-link :to="`/list/${border}`">{{ border }}</router-link>
              </li>
            </ul>
            <p v-else>No countries</p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-else>
    <p>Loading country details...</p>
  </section>
</template>
