<template>
  <div>
    <header class="p-d-flex p-justify-between p-align-center mb-3">
      <h1 class="mb-3">Pokédex</h1>
      <div class="grid">
        <div class="sm:col-12 md:col-10 lg:col-10 xl:col-10 w-100">
          <InputText type="text" v-model="searchTerm" placeholder="🔍 Buscar por nome ou #id" />
        </div>
        <div class="sm:col-12 md:col-2 lg:col-2 xl:col-2 w-100">
          <Dropdown :options="generationOptions" v-model="selectedGeneration" optionLabel="label" @change="fetchPokemons(selectedGeneration.value)" />
        </div>
      </div>
    </header>
    <ProgressBar v-if="isLoading" mode="indeterminate" style="height: 6px; margin: 12px;"/>
    <div class="grid" v-if="!isLoading">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="sm:col-12 md:col-6 lg:col-4 xl:col-4">
        <div class="p-card">
          <div class="p-card-header">
            <div class="float-left">
              <SelectButton v-model="pokemon.isShiny" :options="selectOptions" @click="toggleImage(pokemon)" aria-labelledby="basic" />
            </div>
            <div class="float-right">
              <Button label="Detalhes" rounded outlined />
            </div>
          </div>
          <div class="p-card-body">
            <Image :src="pokemon.image" alt="Imagem do pokemon" width="250" preview />
          </div>
          <div class="p-card-footer">
            {{ pokemon.name }} #{{ pokemon.id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PokemonService from "@/services/PokemonService";

export default defineComponent({
  name: "PokemonList",

  data() {
    return {
      pokemons: [] as any[],
      searchTerm: "",
      isLoading: true,
      selectedPokemon: null,
      generationOptions: [
        { label: "1ª Geração - Kanto", value: 1 },
        { label: "2ª Geração - Johto", value: 2 },
        { label: "3ª Geração - Hoenn", value: 3 },
        { label: "4ª Geração - Sinnoh", value: 4 },
        { label: "5ª Geração - Unova", value: 5 },
        { label: "6ª Geração - Kalos", value: 6 },
        { label: "7ª Geração - Alola", value: 7 },
        { label: "8ª Geração - Galar", value: 8 },
        { label: "9ª Geração - Paldea", value: 9 },
      ],
      selectedGeneration: { label: "1ª Geração - Kanto", value: 1 },
      selectOptions: ["Normal", "Shiny"],
    };
  },
  methods: {
    showDetails(id: any) {
      console.log(id);
      // this.selectedPokemon = pokemon;
      // abrir modal aqui
    },
    async loadPokemons(generation: number) {
      const pokemonService = new PokemonService();
      const response = await pokemonService.getPokemonByGeneration(generation);

      const pokemons = [];
      for (const pokemon of response) {
        const id = pokemon.url.split("/")[6];
        const details = await pokemonService.getPokemonByID(id);
        pokemons.push({
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          image_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,
          isShiny: "Normal",
          id,
          details,
        });
      }
      this.pokemons = pokemons;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    async fetchPokemons(generation: number) {
      this.isLoading = true;
      this.loadPokemons(generation);
    },
    toggleImage(pokemon: any) {
      if (pokemon.isShiny === "Shiny") {
        pokemon.image = pokemon.image_shiny;
      } else {
        pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
      }
    },
  },

  async created() {
    await this.loadPokemons(1);
  },

  computed: {
    filteredPokemons(): any[] {
      const search = this.searchTerm.toLowerCase();
      if (search.includes("#")) {
        return this.pokemons.filter((pokemon: any) => {
          if (search.includes("#") && search.split("").length > 1) {
            return (
              pokemon.id.toLowerCase() == search.replace("#", "").toLowerCase()
            );
          }
          return true;
        });
      } else {
        return this.pokemons.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    },
  },
});
</script>

<style scoped lang="scss">
@media only screen and (max-width: 600px) {
  .sm\:col-12,
  .md\:col-6,
  .lg\:col-4,
  .xl\:col-4 {
    width: 100%;
    margin-right: 0;
    margin: 8px;
  }
}

header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
}

h1 {
  margin: 0;
}
.p-grid {
  margin-top: 2rem;
}
.p-card {
  border-radius: 10px;
}

.p-card-body {
  text-align: center;
}
.p-card-body img {
  width: 50%;
  height: auto;
}
.p-card-footer {
  font-weight: bold;
  text-align: center;
  height: 3rem;
  font-size: 20px;
}
.p-card-footer::first-letter {
  text-transform: uppercase;
}
.p-inputtext,
.p-dropdown {
  width: 100% !important;
}
.p-togglebutton.p-button {
  margin: 10px;
}
.float-left {
  float: left;
  margin: 12px;
}
.float-right {
  float: right;
  margin: 12px;
}
</style>
