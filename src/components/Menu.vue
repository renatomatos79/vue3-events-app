<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <ul class="nav justify-content-end">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">Login</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Sobre</a>
    </li>
  </ul>
</template>

<style scoped></style>
