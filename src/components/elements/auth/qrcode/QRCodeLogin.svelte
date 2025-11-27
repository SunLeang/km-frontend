<script>
	import ExtensionFill from '$components/icons/Extension/ExtensionFill.svelte';
	import QrCode from '$lib/qrcode/index.svelte';  
	// export let loginMethod = 'qr';
</script>

<div class=" h-full w-full flex justify-center">
	<div class=" w-[300px] h-full relative">
		<div
			class=" absolute -top-8 left-0 right-0 p-2 w-14 h-14 mx-auto text-gray-700 bg-white rounded-full"
		>
			<ExtensionFill />
		</div>
		<div class=" p-6 rounded-xl bg-gray-200">
			<!-- <img
				class=" rounded-lg w-full h-full"
				src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code-1024x1024.jpg"
				alt=""
			/> -->
			<!-- svelte-ignore missing-declaration -->
			<div class="flex justify-center p-3 rounded-lg w-full h-full" >
				<QrCode size="203" value="ravitasdasdasdasdasdasdasdsadadasdasdasd" />
			</div>
	
			<div class=" text-gray-600 text-lg text-center pt-4">
				KRADASS Extension
			</div>
		</div>
	</div>
</div>

<div class=" ">
	<div class=" pt-12 leading-10 font-medium text-2xl text-gray-600">
		Scan Form Your Mobile Kradas App
	</div>
	<ul class=" list-decimal leading-8 pl-12 text-gray-500 text-left">
		<li class=" tracking-wide">Open KTalk on your phone</li>
		<li class=" tracking-wide">Go to setting > Device > Scan QR Code</li>
		<li class=" tracking-wide">Scan this image to login</li>
	</ul>
</div>
