<script setup>
import ExplicacionRecetas from "../components/ExplicacionRecetas.vue";
import PrimerPaso from "../components/PrimerPaso.vue";
import PasosIngredientes from "../components/PasosIngredientes.vue";
import QuintoPaso from "../components/QuintoPaso.vue";
import PanelIngredientes from "../components/PanelIngredientes.vue";
import ResumenReceta from "../components/ResumenReceta.vue";
import VentanaToast from "../components/VentanaToast.vue";
import IndicePasos from "../components/IndicePasos.vue";
import {
  cantidadPrincipal,
  cantidadAcompañamiento,
  cantidadCondimento,
  dividirPorCantidadDeIngredientes,
} from "./../helpers/cantidades.helper";
import { ref, nextTick, watch } from "vue";

const numeroDePersonas = ref(1);
const principal = ref([]);
const acompanamiento = ref([]);
const condimentos = ref([]);
const descripcion = ref("");
const nombreReceta = ref("");
const explicacion = ref(true);

const div1 = ref(null);
const div2 = ref(null);
const div3 = ref(null);
const div4 = ref(null);
const div5 = ref(null);

const divActivo = ref(0);

const panelIngredientesRef = ref(null);

const mostrarPanelIngredientes = ref(false);
const mostrarResumen = ref(false);

const mensajeToast = ref("");
const verToast = ref(false);

function mostrarToast(mensaje) {
  mensajeToast.value = mensaje;
  verToast.value = true;
  setTimeout(() => {
    verToast.value = false;
  }, 2000);
}

function actualizarNumeroDePersonas(numero) {
  numeroDePersonas.value = numero;
}

function ActualizarDescripcion(texto) {
  descripcion.value = texto;
  console.log(descripcion.value);
}

function actualizarNombreReceta(nombre) {
  nombreReceta.value = nombre;
}

function llamarLimpiarPanel() {
  if (panelIngredientesRef.value) {
    panelIngredientesRef.value.limpiarPanel();
  }
}

const currentStep = ref(null);
const availableSteps = ref(0);
const pasosEl = ref(null);

watch(currentStep, (value) => {
  console.log("currentStep", {value, pasosEl}, pasosEl?.value.children[value - 1]);

  nextTick(() => {
    pasosEl?.value.children[value - 1]?.scrollIntoView({
      behavior: "smooth", block: "center"
    })
    llamarLimpiarPanel()
  });
});

const divMap = {
  1: div1,
  2: div2,
  3: div3,
  4: div4,
  5: div5,
};

function mostrarDiv (numero) {
  currentStep.value = numero;
  if (numero > availableSteps.value) {
    availableSteps.value = numero;
  }

  divActivo.value = numero;

  if (numero === 1) {
    explicacion.value = false;
  }

  const div = divMap[numero];
  if (div) {
    div.value = true;
    nextTick(() => {
      mostrarPanelIngredientes.value = true;
      // div.value.scrollIntoView({ behavior: "smooth", block: "center" });
      llamarLimpiarPanel();
    });
  }

  if (numero === 5) {
    mostrarPanelIngredientes.value = true;
  }
}

function agregarIngrediente(ingrediente) {
  if (divActivo.value === 1) {
  }

  if (divActivo.value === 2) {
    principal.value.push(
      cantidadPrincipal(ingrediente, numeroDePersonas.value)
    );
  }

  if (divActivo.value === 3) {
    acompanamiento.value.push(
      cantidadAcompañamiento(ingrediente, numeroDePersonas.value)
    );
  }

  if (divActivo.value === 4) {
    condimentos.value.push(
      cantidadCondimento(ingrediente, numeroDePersonas.value)
    );
  }

  if (divActivo.value === 5) {
    return;
  }
}

function resultado() {
  principal.value = dividirPorCantidadDeIngredientes(principal.value);
  acompanamiento.value = dividirPorCantidadDeIngredientes(acompanamiento.value);
  condimentos.value = dividirPorCantidadDeIngredientes(condimentos.value);
  nextTick(() => {
    mostrarPanelIngredientes.value = false;
    mostrarResumen.value = true;
  });
}

function agregarReceta() {
  let recetas = JSON.parse(localStorage.getItem("recetas")) || [];

  recetas.push({
    nombre: nombreReceta.value,
    numeroDePersonas: numeroDePersonas,
    principal: principal.value,
    acompanamiento: acompanamiento.value,
    condimentos: condimentos.value,
    descripcion: descripcion.value,
  });

  localStorage.setItem(`recetas`, JSON.stringify(recetas));
  mostrarToast("Receta añadida a la lista de la compra");
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}
</script>

<template>
  <div class="recetas-usuario-view">
    <div class="indice">
      <IndicePasos
        :divsDisponibles="availableSteps"
        :divActivo="currentStep"
        @mostrarDiv="mostrarDiv"
      />
    </div>

    <div class="explicacion" v-if="explicacion">
      <ExplicacionRecetas @mostrarDiv="mostrarDiv" />
    </div>

    <div class="contenedor">
      <div class="pasos" ref="pasosEl">
        <div
          :class="['p1', { active: divActivo === 1 }]"
          v-if="availableSteps >= 1"
          @click="mostrarDiv(1)"
        >
          <PrimerPaso
            :numeroDePersonas="numeroDePersonas"
            @mostrarDiv="mostrarDiv"
            @cantidadDePersonas="actualizarNumeroDePersonas"
          />
        </div>

        <div
          :class="['p2', { active: divActivo === 2 }]"
          v-if="availableSteps >= 2"
          @click="mostrarDiv(2)"
        >
          <PasosIngredientes
            :ingredientes="principal"
            :anterior="1"
            :siguiente="3"
            :titulo="'PASO 2'"
            :informacion="'Elige el ingrediente principal'"
            @mostrarDiv="mostrarDiv"
          />
        </div>

        <div
          :class="['p3', { active: divActivo === 3 }]"
          v-if="availableSteps >= 3"
          @click="mostrarDiv(3)"
        >
          <PasosIngredientes
            :ingredientes="acompanamiento"
            :anterior="2"
            :siguiente="4"
            :titulo="'PASO 3'"
            :informacion="'Elige el acompañamiento'"
            @mostrarDiv="mostrarDiv"
          />
        </div>

        <div
          :class="['p4', { active: divActivo === 4 }]"
          v-if="availableSteps >= 4"
          @click="mostrarDiv(4)"
        >
          <PasosIngredientes
            :ingredientes="condimentos"
            :anterior="3"
            :siguiente="5"
            :titulo="'PASO 4'"
            :informacion="'Elige los condimentos'"
            @mostrarDiv="mostrarDiv"
          />
        </div>

        <div
          :class="['p5', { active: divActivo === 5 }]"
          v-if="availableSteps >= 5"
          @click="mostrarDiv(5)"
        >
          <QuintoPaso
            @textoDescripcion="ActualizarDescripcion"
            @mostrarDiv="mostrarDiv"
            @resultado="resultado"
          />
        </div>
      </div>

      <div v-if="currentStep >= 1 && currentStep < 5">
        <div class="panel">
          <PanelIngredientes
            @ingredienteSeleccionado="agregarIngrediente"
            ref="panelIngredientesRef"
          />
        </div>
      </div>
      <div class="resumen" v-else-if="currentStep >= 5">
        <ResumenReceta
          :numeroDePersonas="numeroDePersonas"
          :principal="principal"
          :acompanamiento="acompanamiento"
          :condimentos="condimentos"
          :descripcion="descripcion"
          @agregarReceta="agregarReceta"
          @actualizarNombreReceta="actualizarNombreReceta"
        />
      </div>
      

      
    </div>
  </div>
  <div>
    <VentanaToast :verToast="verToast" :mensajeToast="mensajeToast" />
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.indice {
  margin: none;
  position: sticky;
  top: 0;
  right: 0;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.recetas-usuario-view {
  width: 100%;
  text-align: center;
  background-color: var(--color-borde);
}

.contenedor {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.explicaciom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
}

.explicacion h2 {
  margin: 50px;
}

.pasos {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 400px;
}

.p1,
.p2,
.p3,
.p4,
.p5 {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
  min-height: 100px;
  margin: 10px;
  gap: 10px;
  background-color: var(--color-amarillo);
  cursor: pointer;
  overflow: hidden;
  border: 1px solid var(--color-azul-oscuro);
/*   max-height: 150px; /* Altura cuando no está activo */
} 


.numero-personas input {
  width: 80px;
  height: 80px;
  margin: 10px;
  padding: 5px;
  border-radius: 20px;
  border: 1px solid #cccccc;
  background-color: rgb(217, 243, 252);
  text-align: center;
  font-size: 2.5rem;
}

.panel {
  position: fixed;
  top: 20%;
  right: 10%;
/*   width: 50%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-amarillo);
  border: 1px solid var(--color-azul-oscuro);
  border-radius: 20px;
  padding:20px;
  gap: 10px;
  margin: 20px;
}

.resumen {
  position: sticky;
  top: 15%;
  right: 8%;
  width: 40%;
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
  background-color: var(--color-amarillo);
  border-radius: 20px;
  border: 1px solid var(--color-azul-oscuro);
  margin-bottom: 150px;
}

.active {
  border: var(--color-verde) 2px solid;
  box-shadow:  0px 0px 3px;
  width: 50%;
  min-height: 300px;
}

</style>
