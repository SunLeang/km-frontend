<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let remark;
  export let value;
</script>

<div class="text-left">
  <div for="message" class="py-2">{remark?.name}</div>
  <input
    bind:value
    name="remark"
    type="text"
    class="w-full px-4 py-2 border-2 rounded-lg resize-none text-subtitle focus:outline-none"
    placeholder={remark?.name || ""}
    on:input={() => {
      dispatch("change", { remark, value });
    }}
  />
</div>
