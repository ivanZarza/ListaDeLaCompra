<script setup>
import ServicioIngredientes from '../servicios/servicioIngredientes'

const service = new ServicioIngredientes()
const ingredientes = service.ingredientes
service.cargarIngredientes()

</script>

<template>

  <div class="about">
    <div class="wrapper">
      <div>
        <h1>Ingredientes</h1>
        <p>En esta sección podrás ver todos los ingredientes que tenemos disponibles para ti.</p>
          <div class="card" v-for="ingrediente in ingredientes" :key="ingrediente.id" >
            <h3>{{ ingrediente.name }}</h3>
          </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

