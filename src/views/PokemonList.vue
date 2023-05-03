<template>
  <div>
    <header class="p-d-flex p-justify-between p-align-center mb-3">
      <h1 class="mb-3">Pokédex</h1>
      <div class="grid">
        <div class="sm:col-12 md:col-10 lg:col-10 xl:col-10 w-100">
          <InputText type="text" v-model="searchTerm" placeholder="🔍 Buscar por nome ou #id" />
        </div>
        <div class="sm:col-12 md:col-2 lg:col-2 xl:col-2 w-100">
          <Dropdown :options="generationOptions" v-model="selectedGeneration" optionLabel="label"
            @change="fetchPokemons(selectedGeneration.value)" />
        </div>
      </div>
    </header>
    <ProgressBar v-if="isLoading" mode="indeterminate" style="height: 6px; margin: 12px;" />
    <div class="grid" v-if="!isLoading">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="sm:col-12 md:col-6 lg:col-4 xl:col-4">
        <div class="p-card">
          <div class="p-card-header">
            <div class="float-left">
              <SelectButton v-model="pokemon.isShiny" :options="selectOptions" @click="toggleImage(pokemon)"
                aria-labelledby="basic" />
            </div>
            <div class="float-right">
              <Button label="Detalhes" @click="showDetails(pokemon.id)" rounded outlined />
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

  <DynamicDialog/>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import PokemonService from "@/services/PokemonService";
import DetalhesComponent from "@/components/DetalhesComponent.vue";
import { useDialog } from 'primevue/usedialog';

export default defineComponent({
  setup() {
    const pokemons = ref([] as any[]);
    const searchTerm = ref("");
    const isLoading = ref(false);
    const selectedPokemon = ref(null);    
    const dialog = useDialog();
    const generationOptions = [
      { label: "1ª Geração - Kanto", value: 1 },
      { label: "2ª Geração - Johto", value: 2 },
      { label: "3ª Geração - Hoenn", value: 3 },
      { label: "4ª Geração - Sinnoh", value: 4 },
      { label: "5ª Geração - Unova", value: 5 },
      { label: "6ª Geração - Kalos", value: 6 },
      { label: "7ª Geração - Alola", value: 7 },
      { label: "8ª Geração - Galar", value: 8 },
      { label: "9ª Geração - Paldea", value: 9 },
    ];
    const selectedGeneration = ref({ label: "1ª Geração - Kanto", value: 1 });
    const selectOptions = ["Normal", "Shiny"];

    const showDetails = (id: number) => {
      console.log(id);
      // selectedPokemon.value = pokemon;
      // abrir modal aqui
      dialog.open(DetalhesComponent, {
        props: {
          header: 'Detalhes',
          contentClass: 'modal',
          modal: true,
          dismissableMask: true,
          draggable: false,
          maximizable: true,
          style: {
            width: '70vw'
          }
        }
      });
    };

    const loadPokemons = async (generation: number) => {
      const pokemonService = new PokemonService();
      let response;
      switch (generation) {
        case 1: //Kanto
          response = await pokemonService.getAllPokemon(0, 151);
          break;
        case 2: //Johto
          response = await pokemonService.getAllPokemon(151, 100);
          break;
        case 3: //Hoenn
          response = await pokemonService.getAllPokemon(251, 135);
          break;
        case 4: //Sinnoh
          response = await pokemonService.getAllPokemon(386, 107);
          break;
        case 5: //Unova
          response = await pokemonService.getAllPokemon(493, 156);
          break;
        case 6: //Kalos
          response = await pokemonService.getAllPokemon(649, 72);
          break;
        case 7: //Alola
          response = await pokemonService.getAllPokemon(721, 88);
          break;
        case 8: //Galar
          response = await pokemonService.getAllPokemon(809, 96);
          break;
        case 9: //Paldea
          response = await pokemonService.getAllPokemon(905, 1008);
          break;
        default: //Default
          response = await pokemonService.getAllPokemon(0, 151);
          break;
      }
      pokemons.value = [];
      for (const pokemon of response) {
        const id = pokemon.url.split("/")[6];
        pokemons.value.push({
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          image_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,
          isShiny: "Normal",
          id,
        });
      }
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };

    const fetchPokemons = async (generation: number) => {
      isLoading.value = true;
      await loadPokemons(generation);
    };

    const toggleImage = (pokemon: any) => {
      if (pokemon.isShiny === "Shiny") {
        pokemon.image = pokemon.image_shiny;
      } else {
        pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
      }
    };

    const filteredPokemons = computed(() => {
      const search = ref(searchTerm.value.toLowerCase());
      if (search.value.includes("#")) {
        return pokemons.value.filter((pokemon: any) => {
          if (search.value.includes("#") && search.value.split("").length > 1) {
            return (
              pokemon.id.toLowerCase() ==
              search.value.replace("#", "").toLowerCase()
            );
          }
          return true;
        });
      } else {
        return pokemons.value.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(search.value.toLowerCase())
        );
      }
    });

    onMounted(() => {
      isLoading.value = true
      loadPokemons(selectedGeneration.value.value)
        .then(() => isLoading.value = false)
    })
    return {
      isLoading,
      searchTerm,
      selectedPokemon,
      generationOptions,
      selectedGeneration,
      selectOptions,
      fetchPokemons,
      toggleImage,
      showDetails,
      filteredPokemons
    };
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
