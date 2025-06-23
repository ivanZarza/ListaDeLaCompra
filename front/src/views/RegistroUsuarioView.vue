<script setup>
import { ref } from 'vue'
import CrearUsuario from '@/components/CrearUsuario.vue'
import VentanaToast from '@/components/VentanaToast.vue'
import { servicioRegistro } from '../servicios/servicioRegistro'

const mensajeToast = ref('')
const verToast = ref(false)

async function registrar({nombre, apellidos, contraseña,contraseña2}) {
  if(contraseña !== contraseña2 ||!nombre || !apellidos || !contraseña || !contraseña2) {
    mensajeToast.value = 'Las contraseñas no coinciden, o faltan datos'
    mostrarToast()
    return
  }
  try {
    await servicioRegistro.registrarUsuario({
    nombre,
    apellidos,
    contraseña,
  })
  mensajeToast.value = 'Usuario registrado correctamente'
  mostrarToast()
  
} catch (error) {
  console.error(error)
  mensajeToast.value = error.message
  mostrarToast()
}}

function mostrarToast() {
  verToast.value = true
  setTimeout(() => {
    verToast.value = false
  }, 2000)
}

</script>

<template>

  <CrearUsuario @crearUsuario="registrar" />

  <VentanaToast :mensajeToast="mensajeToast" :verToast="verToast" />

</template>

