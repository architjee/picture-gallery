<template>
  <div class="d-navbar bg-base-100">
    <div class="d-navbar-start">
      <div class="d-dropdown">
        <div tabindex="0" role="button" class="d-btn d-btn-ghost lg:hidden text-xl">
          <i class="i-heroicons-bars-3"></i>
        </div>
        <ul tabindex="0" class="d-menu d-menu-sm d-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <a class="d-btn d-btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="d-navbar-center hidden lg:flex">
      <ul class="d-menu d-menu-horizontal px-1">
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <ThemeSwitcherButton class="d-navbar-end" />
  </div>
</template>

<script lang="ts" setup>
import ThemeSwitcherButton from '@/components/ThemeSwitcherButton.vue'
// something
</script>

<style scoped></style>