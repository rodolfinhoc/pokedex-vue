<template>
  <div class="card md:flex md:justify-content-center">
      <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
          <template #item="slotProps">
              <img :src="images[0].back_default" :alt="slotProps.item.alt" style="width: 100%" />
          </template>
          <template #thumbnail="slotProps">
              <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
          </template>
      </Galleria>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, inject, ref, toRaw } from 'vue';
  
  export default defineComponent({
    name: 'DetalhesComponent',
    props: {
    },
    setup(){
      const dialogRef = inject('dialogRef') as any;
      const pokemonDetalhes = toRaw(dialogRef.value.data);
      const images = ref<any[]>([]);
      images.value.push(pokemonDetalhes.sprites);
      const responsiveOptions = ref([
          {
              breakpoint: '991px',
              numVisible: 4
          },
          {
              breakpoint: '767px',
              numVisible: 3
          },
          {
              breakpoint: '575px',
              numVisible: 1
          }
      ]);
      console.log(pokemonDetalhes);
      return {
        pokemonDetalhes,
        responsiveOptions,
        images
      }
    },
  });
  </script>
  
  <style scoped lang="scss">
  </style>

  