import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export default class PokemonService {
  async getPokemonByGeneration(generation: number): Promise<any[]> {
  let response;
  switch(generation){
    case 1: //Kanto
      response = await axios.get(`${API_URL}/pokemon?offset=0&limit=151`);
      break;
    case 2: //Johto
      response = await axios.get(`${API_URL}/pokemon?offset=151&limit=100`);
      break;
    case 3: //Hoenn
      response = await axios.get(`${API_URL}/pokemon?offset=251&limit=135`);
      break;
    case 4: //Sinnoh
      response = await axios.get(`${API_URL}/pokemon?offset=386&limit=107`);
      break;
    case 5: //Unova
      response = await axios.get(`${API_URL}/pokemon?offset=493&limit=156`);
      break;
    case 6: //Kalos
      response = await axios.get(`${API_URL}/pokemon?offset=649&limit=72`);
      break;
    case 7: //Alola
      response = await axios.get(`${API_URL}/pokemon?offset=721&limit=88`);
      break;  
    case 8: //Galar
      response = await axios.get(`${API_URL}/pokemon?offset=809&limit=96`);
      break;
    case 9: //Paldea
      response = await axios.get(`${API_URL}/pokemon?offset=905`);
      break;
    default:
      response = await axios.get(`${API_URL}/pokemon?offset=0&limit=151`);
      break;
  }
  return response.data.results;
  }

  async getPokemonByID(id: number): Promise<any[]> {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);
    return response.data;
  }
}
