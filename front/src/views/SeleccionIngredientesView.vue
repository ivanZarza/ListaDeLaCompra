<script setup>
import { ref, watch } from 'vue'
import ServicioIngredientes from '../servicios/servicioIngredientes'
import BuscadorIngredientes from '../components/BuscadorIngredientes.vue'
import PanelSeleccionar from '../components/PanelSeleccionar.vue'


const palabra = ref('')
const clase = ref('')
const service = new ServicioIngredientes()
const pagina = ref(1)



/* const emits = defineEmits(['ingredienteSeleccionado']) */

/* defineExpose({
  limpiarPanel
}) */



function buscar(evento) {
  palabra.value = evento.palabra
  clase.value = evento.clase
  service.cargarIngredientes({ nombre: palabra.value, tipo: clase.value, pagina: pagina.value })
} 

const clasesDeIngredientes = service.tipos
service.cargarTipos()

const ingredientes = service.ingredientes
service.cargarIngredientes()


/* function lanzarBusqueda() {
  pagina.value = 1
  buscar()
} */

const paginaSiguiente = () => {
  if (ingredientes.value.length >= 20) {
    pagina.value++;
    buscar();
  }
}

const paginaAnterior = () => {
  if (pagina.value > 1) {
    pagina.value--;
    buscar()
  }
}

/* function cambiarSeleccion(ingrediente) {
  if (!ingrediente.seleccionado) {
    ingrediente.seleccionado = true;
    emits('ingredienteSeleccionado', ingrediente);
    console.log(ingrediente);
  }
} */

/* watch(tipoBusqueda, () => {
  buscar()
}) 
 */
/* function limpiarPanel() {
  ingredientes.value.forEach(ingrediente => {
    ingrediente.seleccionado = false
    nombre.value = ''
    tipo.value = ''
    pagina.value = 1
  })
  buscar()
} */

</script>

<template>

<BuscadorIngredientes :clasesDeIngredientes="clasesDeIngredientes" @elementosBusqueda="buscar" />

  <PanelSeleccionar :ingredientes="ingredientes"  @paginaSiguiente="paginaSiguiente"
    @paginaAnterior="paginaAnterior"  />


</template>