<template>
  <div class="custom-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "custom-item",
};
</script>

<style>
.custom-item {
  flex-shrink: 0;
  width: 100%;
}
</style>