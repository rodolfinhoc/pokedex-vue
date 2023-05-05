<template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </template>
  
  <script lang="ts">
  import { defineComponent, inject, toRaw } from 'vue';
  
  export default defineComponent({
    name: 'DetalhesComponent',
    props: {
    },
    setup(){
      const dialogRef = inject('dialogRef') as any;
      const pokemonDetalhes = toRaw(dialogRef.value.data);
      return {
        pokemonDetalhes
      }
    },
  });
  </script>
  
  <style scoped lang="scss">
  </style>

  