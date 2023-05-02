import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export default class PokemonService {
  async getAllPokemon(offset?: number, limit?: number): Promise<any[]> {
    const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.data.results;
  }

  async getPokemonByID(id: number): Promise<any[]> {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    return response.data;
  }
}
