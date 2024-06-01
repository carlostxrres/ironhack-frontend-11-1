import { ref } from "vue"
import { defineStore } from "pinia"

export const useCountryStore = defineStore("contryStore", () => {
  const countries = ref([])
  const selectedCountry = ref(null)

  const API_URL = "https://ih-countries-api.herokuapp.com/countries/"

  const getCountries = async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    const sortedData = data.toSorted((a, b) =>
      a.name.common.localeCompare(b.name.common)
    )
    countries.value = sortedData
  }

  const getCountry = async (alpha3Code) => {
    const response = await fetch(`${API_URL}${alpha3Code}`)
    const data = await response.json()
    selectedCountry.value = data
  }

  return { countries, getCountries, selectedCountry, getCountry }
})
