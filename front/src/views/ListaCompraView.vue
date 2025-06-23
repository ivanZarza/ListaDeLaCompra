<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import html2pdf from "html2pdf.js";

const recetasRecuperadas = ref([]);
const recetaSeleccionada = ref(recetasRecuperadas.value[0]);
const indiceActual = ref(0);
const compraAgregada = ref([]);
const elementoAgregado = ref({
  nombre: "",
});

const generarPDFRef = ref(null);

const router = useRouter();
recuperarRecetas();

function recuperarRecetas() {
  recetasRecuperadas.value = JSON.parse(
    localStorage.getItem("recetas") || "[]"
  );
  seleccionarRecetaPorIndice();
  console.log(recetasRecuperadas.value);
}

function seleccionarReceta(receta) {
  recetaSeleccionada.value = receta;
}

function seleccionarRecetaPorIndice() {
  if (recetasRecuperadas.value.length > 0) {
    recetaSeleccionada.value = recetasRecuperadas.value[indiceActual.value];
  } else {
    recetaSeleccionada.value = null;
    window.alert(
      "No hay recetas guardadas, por favor crea una receta en la zona de RECETAS"
    );
    router.push({ name: "recetas" });
  }
}

function siguienteReceta() {
  if (indiceActual.value < recetasRecuperadas.value.length - 1) {
    indiceActual.value++;
    seleccionarRecetaPorIndice();
  }
}

function recetaAnterior() {
  if (indiceActual.value > 0) {
    indiceActual.value--;
    seleccionarRecetaPorIndice();
  }
}

function borrarReceta() {
  const recetasFiltradas = recetasRecuperadas.value.filter(
    (receta) => receta.nombre !== recetaSeleccionada.value.nombre
  );
  if (recetasFiltradas.length === 0) {
    localStorage.removeItem("recetas"); // Elimina la entrada si el array está vacío
  } else {
    localStorage.setItem("recetas", JSON.stringify(recetasFiltradas)); // Guarda el array filtrado si no está vacío
  }
  recuperarRecetas();
  recetaSeleccionada.value = null;
}

function borrarTodasLasRecetas() {
  localStorage.removeItem("recetas");
  recuperarRecetas();
  recetaSeleccionada.value = null;
  router.push({ name: "recetas" });
}

//explica que hace la funcion extraerIngredientes y la ejecuta con las recetas recuperadas del localStorage
//extrae los ingredientes de las recetas y los guarda en un array de objetos con la cantidad total de cada ingrediente
//con la cantidad total de cada ingrediente que se necesita para todas las recetas

function extraerIngredientes(recetas) {
  const ingredientesMap = {};

  recetas.forEach((receta) => {
    ["principal", "acompañamiento", "condimentos"].forEach((seccion) => {
      if (receta[seccion]) {
        receta[seccion].forEach((ingrediente) => {
          const clave = ingrediente.nombre;
          if (!ingredientesMap[clave]) {
            ingredientesMap[clave] = {
              nombre: ingrediente.nombre,
              cantidad: ingrediente.cantidad,
              tipo: ingrediente.tipo,
              principal: ingrediente.principal,
              acompañamiento: ingrediente.acompañamiento,
              condimento: ingrediente.condimento,
            };
          } else {
            ingredientesMap[clave].cantidad += ingrediente.cantidad;
          }
        });
      }
    });
  });

  const ingredientesTotales = Object.values(ingredientesMap);
  return ingredientesTotales;
}

const todosLosIngredientes = extraerIngredientes(recetasRecuperadas.value);

function agregarAListaDeCompra() {
  compraAgregada.value.push({ ...elementoAgregado.value });
  elementoAgregado.value = {
    nombre: "",
    cantidad: 0,
  };
}

function borraRCompraAgregada() {
  compraAgregada.value = [];
}

const generarPDF = () => {
  const options = {
    margin: 1,
    filename: "lista-de-compras.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  if (generarPDFRef.value) {
    html2pdf().set(options).from(generarPDFRef.value).save();
  }
};
</script>

<template>
  <div class="pagRecetas">
    <div v-for="receta in recetasRecuperadas" :key="receta.nombre">
      <button @click="seleccionarReceta(receta)">{{ receta.nombre }}</button>
    </div>
  </div>

  <div v-if="recetaSeleccionada" class="container">
    <div class="resumen">

      <div class="pag">
        <button @click="recetaAnterior">RECETA ANTERIOR</button>
        <button @click="siguienteReceta">SIGUIENTE RECETA</button>
      </div>

      <div class="datosRecetas">
        <div class="cabezeraResumen">
        <h1>Receta: {{ recetaSeleccionada.nombre }}</h1>
        <h2>
          Para {{ recetaSeleccionada.numeroDePersonas }}
          {{
            recetaSeleccionada.numeroDePersonas === 1 ? "persona" : "personas"
          }}
        </h2>
      </div>

      <div class="pasosResumen">
        <h2>Principal</h2>
        <div class="listaIngredientes">
          <ol>
            <li
              v-for="ingrediente in recetaSeleccionada.principal"
              :key="ingrediente.id"
            >
              {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
            </li>
          </ol>
        </div>
      </div>
      <div class="pasosResumen">
        <h2>Acompañamiento</h2>
        <div class="listaIngredientes">
          <ol>
            <li
              v-for="ingrediente in recetaSeleccionada.acompanamiento"
              :key="ingrediente.id"
            >
              {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
            </li>
          </ol>
        </div>
      </div>

      <div class="pasosResumen">
        <h2>Condimentos</h2>
        <div class="listaIngredientes">
          <ol>
            <li
              v-for="ingrediente in recetaSeleccionada.condimentos"
              :key="ingrediente.id"
            >
              {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
            </li>
          </ol>
        </div>
      </div>
      
      <div class="pieResumen">
        <h2><strong>Descripción:</strong></h2>
        <pre class="descripcionFinal">{{ recetaSeleccionada.descripcion }}</pre>
      </div>
    </div>

      <div class="borrar">
        <button @click="borrarReceta">BORRAR RECETA SELECCIONADA</button>
        <button @click="borrarTodasLasRecetas">BORRAR TODAS LAS RECETAS</button>
      </div>
    </div>

    <div class="listaFinal">
      <div class="PDF" ref="generarPDFRef">
        <h2>
          Estas son las cantidades de ingredientes que tienes que comprar para
          las recetas que has creado:
        </h2>
        <div class="ingredientesFinales">
          <ul>
            <li
              v-for="ingrediente in todosLosIngredientes"
              :key="ingrediente.nombre"
            >
              {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
            </li>
          </ul>
        </div>

        <div v-if="compraAgregada.length > 0" class="compraAñadida">
          <h2>Estos son los productos que añadiste</h2>
          <div class="ingredientesAñadidos">
            <ul>
              <li v-for="producto in compraAgregada" :key="producto.nombre">
                {{ producto.nombre }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="compraAñadida">
        <h2>Puedes agregar productos a la lista de la compra</h2>
        <div class="agregarCompra">
          <input
            type="text"
            v-model="elementoAgregado.nombre"
            placeholder="Nombre del producto"
          />
          <button @click="agregarAListaDeCompra">
            Agregar a la lista de la compra
          </button>
          <button @click="borraRCompraAgregada">BORRAR COMPRA AGREGADA</button>
        </div>
      </div>

      <div class="btnPdf">
        <button @click="generarPDF">Generar PDF</button>
      </div>
    </div>
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

.pagRecetas {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.pagRecetas button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: rgb(109, 211, 177);
  cursor: pointer;
  padding: 10px;
  margin: 10px;
}

.pagRecetas button:hover {
  background-color: rgb(163, 255, 224);
}

.container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-around;
}

.resumen {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(109, 211, 177);
  border-radius: 20px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  font-size: 0.9rem;
  margin: 20px;
  gap: 10px;
}

.resumen .pag {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
}

.resumen .pag button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #79dd82;
  cursor: pointer;
}

.resumen .pag button:hover {
  background-color: #a3ffaa;
}

.borrar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
}

.borrar button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fa5b5b;
  cursor: pointer;
}

.borrar button:hover {
  background-color: #ffc6c6;
  color: red;
}

.listaFinal {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  border: 1px solid black;
  padding: 20px;
  font-size: 0.9rem;
  margin: 20px auto;
  gap: 10px;
  background-color: rgb(45, 162, 167);
  text-align: center;
}

.PDF {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.ingredientesFinales {
  width: 100%;
  border-radius: 20px;
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
  font-size: 0.9rem;
  gap: 10px;
  background-color: rgb(129, 172, 173);
  overflow: auto;
  column-width: 200px;
  column-gap: 20px;
}

.ingredientesFinales ul {
  list-style-type: none;
}

.ingredientesFinales li {
  font-size: 1rem;
  padding: 3px;
}

.compraAñadida {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.ingredientesAñadidos {
  width: 100%;
  border-radius: 20px;
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
  font-size: 0.9rem;
  gap: 10px;
  background-color: rgb(129, 172, 173);
  overflow: auto;
  column-width: 200px;
  column-gap: 20px;
}

.ingredientesAñadidos ul {
  list-style-type: none;
}

.ingredientesAñadidos li {
  font-size: 1rem;
  padding: 3px;
}

.agregarCompra {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.agregarCompra input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: rgb(191, 248, 165);
}

.agregarCompra button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: rgb(134, 228, 230);
  cursor: pointer;
}

.agregarCompra button:hover {
  color: white;
  background-color: rgb(33, 119, 121);
}

.btnPdf {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 10px;
}

.btnPdf button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: rgb(248, 242, 190);
  cursor: pointer;
}
</style>
