<script>
  export let shown;
</script>

{#if shown}
  <div class=" wrapper fixed left-0 top-0 right-0 bottom-0 bg-gray-300/50 z-50">
    <slot />
  </div>
{/if}

<style>
  .wrapper {
    backdrop-filter: blur(1px);
  }
</style>
