<script setup>


defineProps({
  titulo: String,
  informacion: String,
  ingredientes: Array,
  siguiente: Number,
  anterior: Number
})

defineEmits(['mostrarDiv'])

</script>

<template>
  <div>
    <h2>{{ titulo }}</h2>
    <h3>{{ informacion }}</h3>
  </div>
  <div class="pasosIngredientes">
          <div class="listaIngredientes">
            <ol>
              <li v-for="(ingrediente, i) in ingredientes" :key="i">
                {{ ingrediente.nombre }}
              </li>
            </ol>
          </div>
        </div>
          <div class="contenedor-botones">
            <button  class="btn" @click.prevent.stop="$emit('mostrarDiv', anterior)">ANTERIOR</button>
            <button  class="btn" @click.prevent.stop="$emit('mostrarDiv', siguiente)">SIGUIENTE</button>
        </div>
</template>

<style scoped>


h2 {

  text-align: center;
}

h3 {
  margin: 2px;
  text-align: center;
}

.contenedor-botones{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


ol {
  width: 100%;
}

li {
  text-align: center;
  text-transform: capitalize;
}

.btn{
  background-color:#2c3e50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border:none;
  margin: 10px;
}

.btn:hover {
  background-color: rgb(51, 102, 255);
  color: white;
}
</style>
