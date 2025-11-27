<script>
  export let color = 'rgb(255, 166, 106)';
  export let size = 20;
</script>

<div class="lds-dual-ring" style={`--size:${size}px; --color: ${color}`} />

<style>
  .lds-dual-ring {
    display: inline-block;
    width: var(--size, 20px);
    height: var(--size, 20px);
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: var(--size, 20px);
    height: var(--size, 20px);
    margin: 1px;
    border-radius: 50%;
    border: 3px solid rgb(250, 240, 150);
    border-color: var(--color, rgb(255, 166, 106)) transparent var(--color, rgb(255, 166, 106)) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
