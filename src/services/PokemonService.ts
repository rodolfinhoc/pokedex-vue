import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export default class PokemonService {
  async getAllPokemon(): Promise<any[]> {
    const response = await axios.get(`${API_URL}/pokemon?limit=151`);
    return response.data.results;
  }
}
