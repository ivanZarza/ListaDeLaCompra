<script setup>

defineEmits(['mostrarDiv'])

</script>

<template>
  <h1>CREA TU RECETA</h1>
      <div >
        <h2>En este apartado podrás crear tus propias recetas, siguiendo los pasos que se te indican a continuación.
        </h2>
        <h2>Primero, introduce el número de personas para las que quieres hacer la receta.</h2>
        <h2>Después, elige el ingrediente principal, el acompañamiento y los condimentos.</h2>
        <h2>Finalmente, escribe una descripción de la receta y si quieres, compártela con la comunidad.</h2>
        <button class="btn" @click="$emit('mostrarDiv',1)">¿Empezamos?</button>
      </div>
</template>

<style scoped>
  h1{
    text-align: center;
    font-size: 2em;
    margin-top: 2em;
  }
  h2{
    font-size: 1.5em;
    margin-top: 1em;
  }

  .btn{
  font-size: 1.2rem;
}


</style>