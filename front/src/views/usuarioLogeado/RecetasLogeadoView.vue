<script setup>
import PanelIngredientesLogeado from '../../components/PanelIngredientesLogeado.vue'
import VentanaToast from '../../components/VentanaToast.vue'
import { cantidadPrincipal, cantidadAcompañamiento, cantidadCondimento, dividirPorCantidadDeIngredientes } from './../../helpers/cantidades.helper'
import { ref, nextTick } from 'vue'


const nombreReceta = ref('')
const numeroDePersonas = ref(1)
const principal = ref([])
const acompanamiento = ref([])
const condimentos = ref([])
const descripcion = ref('')

const mostrarDiv2 = ref(false)
const mostrarDiv3 = ref(false)
const mostrarDiv4 = ref(false)
const mostrarDiv5 = ref(false)

const div2 = ref(null)
const div3 = ref(null)
const div4 = ref(null)
const div5 = ref(null)

const divActivo = ref(1)

const panelIngredientesLogeadoRef = ref(null)

const mostrarPanelIngredientesLogeado = ref(false)
const mostrarResumen = ref(false)

const verToast = ref(false);
const mensajeToast = ref('¡Receta agragada a la lista de la compra!');

function mostrarToast() {
  verToast.value = true;
  setTimeout(() => {
    verToast.value = false
    window.location.reload()
  }, 2000)

}

function llamarLimpiarPanel() {
  if (panelIngredientesLogeadoRef.value) {
    panelIngredientesLogeadoRef.value.limpiarPanel()
  }
}

function mostrarSiguienteDiv2() {
  mostrarDiv2.value = true
  mostrarPanelIngredientesLogeado.value = true
  nextTick(() => {
    if (div2.value) {
      div2.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    llamarLimpiarPanel()
  })
}

function mostrarSiguienteDiv3() {
  mostrarDiv3.value = true
  nextTick(() => {
    if (div3.value) {
      div3.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    llamarLimpiarPanel()
  })
}

function mostrarSiguienteDiv4() {
  mostrarDiv4.value = true
  nextTick(() => {
    if (div4.value) {
      div4.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    llamarLimpiarPanel()
  })
}

function mostrarSiguienteDiv5() {
  mostrarDiv5.value = true
  nextTick(() => {
    if (div5.value) {
      div5.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    llamarLimpiarPanel()
  })
}

function agregarIngrediente(ingrediente) {

  if (mostrarDiv2.value && !mostrarDiv3.value) {
    principal.value.push(cantidadPrincipal(ingrediente, numeroDePersonas.value))
  }

  if (mostrarDiv3.value && !mostrarDiv4.value) {
    acompanamiento.value.push(cantidadAcompañamiento(ingrediente, numeroDePersonas.value))
  }

  if (mostrarDiv4.value && !mostrarDiv5.value) {
    condimentos.value.push(cantidadCondimento(ingrediente, numeroDePersonas.value))
  }

  if (mostrarDiv5.value) {
    return
  }
}

function resultado() {
  principal.value = dividirPorCantidadDeIngredientes(principal.value)
  acompanamiento.value = dividirPorCantidadDeIngredientes(acompanamiento.value)
  condimentos.value = dividirPorCantidadDeIngredientes(condimentos.value)
  nextTick(() => {
    mostrarPanelIngredientesLogeado.value = false
    mostrarResumen.value = true
  })
}

function agregarReceta() {
  let recetas = JSON.parse(localStorage.getItem("recetasUsuario")) || [];

  recetas.push({
    nombre: nombreReceta.value,
    numeroDePersonas: numeroDePersonas.value,
    principal: principal.value,
    acompanamiento: acompanamiento.value,
    condimentos: condimentos.value,
    descripcion: descripcion.value
  })

  localStorage.setItem(`recetasUsuario`, JSON.stringify(recetas))

  mostrarToast()
}
</script>

<template>
  <div class="recetas-usuario-view">
    <div>
      <h1>Recetas</h1>
      <h2>Crear receta</h2>
    </div>
    <div class="contenedor">
      <div class="pasos">
        <div class="p1" :class="{ 'active': divActivo.value === 1 }">
          <h2>PASO 1</h2>
          <h3>Ingresa el número de personas</h3>
          <div class="numero-personas">
            <label><span>Número de personas:</span>
              <input type="number" v-model="numeroDePersonas" min="1" />
            </label>
          </div>
          <button @click="mostrarSiguienteDiv2">SIGUIENTE</button>
        </div>
        <div class="p2" :class="{ 'active': divActivo.value === 2 }" v-if="mostrarDiv2" ref="div2">
          <h2>PASO 2</h2>
          <h3>Elige el ingrediente principal</h3>
          <div class="listaIngredientes">
            <ol>
              <li v-for="(ingrediente, i) in principal" :key="i">
                {{ ingrediente.nombre }}
              </li>
            </ol>
          </div>
          <button @click="mostrarSiguienteDiv3">SIGUIENTE</button>
        </div>
        <div class="p3" :class="{ 'active': divActivo.value === 3 }" v-if="mostrarDiv3" ref="div3">
          <h2>PASO 3</h2>
          <h3>Elige el acompañamiento</h3>
          <div class="listaIngredientes">
            <ol>
              <li v-for="ingrediente in acompanamiento" :key="ingrediente.id">
                {{ ingrediente.nombre }}
              </li>
            </ol>
          </div>
          <button @click="mostrarSiguienteDiv4">SIGUIENTE</button>
        </div>
        <div class="p4" :class="{ 'active': divActivo.value === 4 }" v-if="mostrarDiv4" ref="div4">
          <h2>PASO 4</h2>
          <h3>Elige los condimentos para hacer la receta</h3>
          <div class="listaIngredientes">
            <ol>
              <li v-for="ingrediente in condimentos" :key="ingrediente.id">
                {{ ingrediente.nombre }}
              </li>
            </ol>
          </div>
          <button @click="mostrarSiguienteDiv5">SIGUIENTE</button>
        </div>
        <div class="p5" :class="{ 'active': divActivo.value === 5 }" v-if="mostrarDiv5" ref="div5">
          <h2>PASO 5</h2>
          <h3>Finaliza la receta escribiendo una descripcion si es necesario</h3>
          <h3>¿Qué tal si compartes tu receta con la comunidad?</h3>
          <div class="descripcion">
            <textarea v-model="descripcion"></textarea>
            <button @click="resultado">FINALIZAR</button>
          </div>
        </div>
      </div>
      <div v-if="mostrarPanelIngredientesLogeado">
        <div class="panel">
          <PanelIngredientesLogeado 
            @ingredienteSeleccionado= "agregarIngrediente" 
            ref="panelIngredientesLogeadoRef"
            />
        </div>
      </div>
      <div class="resumen" v-if="mostrarResumen">
        <h2>Resumen de la Receta</h2>
        <h3>Para {{ numeroDePersonas }} {{ numeroDePersonas === 1 ? 'persona' : 'personas' }}</h3>
        <h3>Principal</h3>
        <div class="listaIngredientes">
          <ol>
            <li v-for="ingrediente in principal" :key="ingrediente.id">{{ ingrediente.nombre }} - {{ ingrediente.cantidad
              }} Grs</li>
          </ol>
        </div>
        <h3>Acompañamiento</h3>
        <div class="listaIngredientes">
          <ol>
            <li v-for="ingrediente in acompanamiento" :key="ingrediente.id">{{ ingrediente.nombre }} - {{
          ingrediente.cantidad }} Grs</li>
          </ol>
        </div>
        <h3>Condimentos</h3>
        <div class="listaIngredientes">
          <ol>
            <li v-for="ingrediente in condimentos" :key="ingrediente.id">{{ ingrediente.nombre }} - {{
          ingrediente.cantidad }} Grs</li>
          </ol>
        </div>
        <h3><strong>Descripción:</strong></h3>
        <pre class="descripcionFinal">{{ descripcion }}</pre>
        <div class="textoFinal">
          <h3>¿QUIERES PASAR TU RECETA A LA LISTA DE LA COMPRA?</h3>
          <h3>Agrega un nombre a tu receta</h3>
          <input type="text" v-model="nombreReceta" />
          <button @click="agregarReceta()">AGREGAR A LA LISTA DE LA COMPRA</button>
        </div>
      </div>
    </div>
  </div>
  <div class="toast">
  <VentanaToast :verToast="verToast" :mensajeToast="mensajeToast" />
</div>
</template>

<!-- no consigo que se active la clase active en los divs p1, p2, p3, p4 y p5, cuando hago click en los botones SIGUIENTE, el valor de divActivo.value cambia correctamente, pero no se activa la clase active en los divs, ¿qué estoy haciendo mal? -->

<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.recetas-usuario-view {
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background-color: #ffffbe;
}

.contenedor {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.pasos {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.p1,
.p2,
.p3,
.p4,
.p5 {
  height: 80%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20%;
  padding: 30px;
  min-height: 300px;
  margin: 20px;
  gap: 10px;
}

ol {
  width: 100%;
}

li {
  text-align: center;
  text-transform: capitalize;
}

.p1 {
  background-color: lightblue;
}

.numero-personas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.numero-personas label {
  font-size: 1.2rem;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.numero-personas input {
  width: 80px;
  height: 80px;
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: rgb(217, 243, 252);
  text-align: center;
  font-size: 2.5rem;
}

.p2 {
  background-color: lightgreen;
}

.p3 {
  background-color: lightcoral;
}

.p4 {
  background-color: lightsteelblue;
}

.p5 {
  background-color: lightseagreen;
}

.p5 .descripcion {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.p5 .descripcion textarea {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: #ffa9fb;
  margin: 10px;
  resize: none;
  padding: 10px;
  font-size: 1rem;
}

button {
  background-color: rgb(86, 126, 245);
  border: none;
  color: rgb(20, 20, 20);
  padding: 10px 20px;
  text-align: center;
  margin: 10px;
  border-radius: 10px;
  margin-top: auto;
}

button:hover {
  background-color: rgb(0, 26, 102);
  color: white;
}

.panel {
  position: fixed;
  top: 30%;
  right: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.resumen {
  position: fixed;
  top: 40%;
  right: 8%;
  width: 40%;
  max-height: 500px;
  /* Limita la altura máxima del div */
  overflow-y: auto;
  /* Habilita el desplazamiento vertical si el contenido excede la altura máxima */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* Cambiado de center a flex-start para manejar mejor el contenido cuando se desborda */
  gap: 5px;
  padding: 5px;
  background-color: #ffa9fb;
  border-radius: 20%;
  margin-bottom: 150px;
}

.descripcionFinal {
  font-size: 1rem;
  text-align: center;
  white-space: pre-wrap;
}

div.p1.active,
div.p2.active,
div.p3.active,
div.p4.active,
div.p5.active {
  border: rgb(0, 26, 102) 3px solid;
}

.textoFinal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.textoFinal input {
  width: 50%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  color: #63235f;
}

.resumen::-webkit-scrollbar {
  width: 50px; /* Aumenta el ancho para dar espacio al círculo */
}

.resumen::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

.resumen::-webkit-scrollbar-thumb {
  height: 30px; 
  border-radius: 10px; /* Hace el thumb redondeado, pero no perfectamente circular */
  background: #888;
  border: 3px solid #f1f1f1; /* Añade un borde para simular un círculo dentro de un cuadrado */
}

.resumen::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.resumen {
  scrollbar-width: auto; /* "auto" o "thin" */ 
  scrollbar-color: #888 #f1f1f1; /* [Thumb] [Track] */
}


</style>