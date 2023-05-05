<template>
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
      console.log(pokemonDetalhes);
      return {
        pokemonDetalhes
      }
    },
  });
  </script>
  
  <style scoped lang="scss">
  </style>

  