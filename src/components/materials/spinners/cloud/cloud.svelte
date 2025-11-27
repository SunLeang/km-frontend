<script>
</script>

<div class=" relative w-[60px] h-[30px]">
  <div class="icon-animate2 absolute top-2" style="z-index: 1;">
    <div class="cloud" style="--scale: 0.12; --background: #ebebeb" />
  </div>
  <div class="icon-animate  absolute top-2">
    <div class="cloud" style="--scale: 0.1; --background: #c9c9c9" />
  </div>
</div>
<style>
	.cloud {
		width: calc(var(--scale, 1) * 350px);
		height: calc(var(--scale, 1) * 120px);
		background: var(--background, #ebebeb);
		box-shadow: calc(var(--scale, 1) * 8px) calc(var(--scale, 1) * 8px)
			rgba(0, 0, 0, 0.137);
		border-radius: calc(var(--scale, 1) * 100px);
	}
	.cloud::after,
	.cloud::before {
		content: "";
		position: relative;
		display: inline-block;
		background: inherit;
		border-radius: inherit;
	}
	.cloud::after {
		width: calc(var(--scale, 1) * 100px);
		height: calc(var(--scale, 1) * 100px);
		top: calc(var(--scale, 1) * -120px);
		left: calc(var(--scale, 1) * -100px);
	}
	.cloud::before {
		width: calc(var(--scale, 1) * 180px);
		height: calc(var(--scale, 1) * 180px);
		top: calc(var(--scale, 1) * -70px);
		left: calc(var(--scale, 1) * 130px);
	}

	.icon-animate {
		animation-name: xone;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	.icon-animate2 {
		animation-name: xtwo;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}

	@keyframes xone {
		0% {
			transform: translate(50%, 0);
		}
		25% {
			transform: translate(35%, 0);
		}
		100% {
			transform: translate(0%, 0);
		}
	}

	@keyframes xtwo {
		0% {
			transform: translate(0, 0);
		}
		75% {
			transform: translate(40%, 0);
		}
		100% {
			transform: translate(50%, 0);
		}
	}
</style>
