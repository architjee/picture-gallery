<template>
  <div class="d-navbar bg-base-100">
    <div class="d-navbar-start">
      <div class="d-dropdown">
        <div tabindex="0" role="button" class="d-btn d-btn-ghost lg:hidden text-xl">
          <i class="i-heroicons-bars-3"></i>
        </div>
        <ul tabindex="0" class="d-menu d-menu-sm d-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <StaticRoutes></StaticRoutes>
        </ul>
      </div>
      <a class="d-btn d-btn-ghost text-xl">Arch</a>
    </div>
    <div class="d-navbar-center hidden lg:flex">
      <ul class="d-menu d-menu-horizontal px-1">
        <StaticRoutes></StaticRoutes>
      </ul>
    </div>
    <ThemeSwitcherButton class="d-navbar-end" />
  </div>
</template>

<script lang="ts" setup>
import StaticRoutes from '@/components/StaticRoutes.vue';
import ThemeSwitcherButton from '@/components/ThemeSwitcherButton.vue'

</script>

<style scoped></style>