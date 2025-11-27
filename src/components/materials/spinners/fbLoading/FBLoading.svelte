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
    display: inline-block;
    position: relative;
    height: 30px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 2px;
    width: 8px;
    background: var(--bg, #fff);
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 0px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 13px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 26px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 0px;
      height: 32px;
    }
    50%,
    100% {
      top: 8px;
      height: 16px;
    }
  }
</style>
