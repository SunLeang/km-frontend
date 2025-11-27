<script>
  export let color = "#fff";
</script>

<div class="lds-facebook" style={`--bg:${color}`}>
  <div />
  <div />
  <div />
</div>

<style>
  .lds-facebook {
    position: relative;
    height: 16px;
    width: 25px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 2px;
    width: 5px;
    background: var(--bg, #fff);
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 0px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 8px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 16px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 0px;
      height: 16px;
    }
    50%,
    100% {
      top: 5px;
      height: 8px;
    }
  }
</style>
