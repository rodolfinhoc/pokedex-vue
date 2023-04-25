<template>
  <div>
    <header class="p-d-flex p-justify-between p-align-center p-mb-4">
      <h1 class="p-m-0">Pokedex</h1>
      <br>
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <i class="pi pi-search"></i>
        </span>
        <input type="text" v-model="searchTerm" placeholder="Buscar por nome" class="p-inputtext" />
      </div>
    </header>
    <div class="grid">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="sm:col-12 md:col-6 lg:col-4 xl:col-4">
        <div class="p-card">
          <div class="p-card-body">
            <img :src="pokemon.image" alt="Imagem do pokemon" />
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
import { defineComponent } from 'vue';
import PokemonService from '@/services/PokemonService';

export default defineComponent({
  name: 'PokemonList',

  data() {
    return {
      pokemons: [] as any[],
      searchTerm: '',
    };
  },

  async created() {
    const pokemonService = new PokemonService();
    const response = await pokemonService.getAllPokemon();
    this.pokemons = response.map((pokemon: any) => ({
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`,
      id: pokemon.url.split('/')[6]
    }));
  },

  computed: {
    filteredPokemons(): any[] {
      return this.pokemons.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
});

</script>

<style scoped>
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

</style>
