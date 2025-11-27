<script>
	import { goto } from '$app/navigation';
	import LoginForm from '$components/elements/auth/login/LoginForm.svelte';
	import QRCodeLogin from '$components/elements/auth/qrcode/QRCodeLogin.svelte';
	let loginMethod = 'qr';
</script>

<div class="h-screen flex justify-center">
	<div class="m-auto">
		<div class="flex flex-col justify-center rounded-tl-lg rounded-tr-lg">
			{#if loginMethod === 'qr'}
				<div class=" w-full h-full text-center">
					<QRCodeLogin />
					<div class=" pt-20">
						<div
							on:click={() => {
								loginMethod = 'phone';
							}}
							class=" cursor-pointer py-3 px-12 hover:bg-gray-200 hover:rounded-lg text-blue-500 hover:underline {loginMethod ===
							'phone'
								? ' text-white bg-blue-600'
								: ' text-whit'}"
							for="phoneNumber"
						>
							Log in with different methods
						</div>
					</div>
				</div>
			{:else}
				<LoginForm
					on:success={() => {
						goto('/dashboard');
					}}
				/>

				<div class=" pt-20 text-center">
					<div
						on:click={() => {
							loginMethod = 'qr';
						}}
						class=" cursor-pointer py-3 px-12 hover:bg-gray-200 hover:rounded-lg text-blue-500 hover:underline {loginMethod ===
						'qr'
							? ' text-white bg-blue-600'
							: ' text-whit'}"
						for="qrCodeValue"
					>
						Log in with QR CODE
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
