<script>
  export let active = false;
</script>

<div
  class="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 transition-all {active
    ? 'ring-1 ring-teal-500 shadow-md'
    : ''}"
>
  {#if active}
    <div class="h-2 w-full bg-[#4db6ac] rounded-t-xl"></div>
  {/if}
  <div class="p-6">
    <slot />
  </div>
</div>
