<script>
	import Extension from '$components/icons/Extension/ExtensionFill.svelte';
	import { signIn } from '$providers/actions/kauth';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	let dispatch = createEventDispatcher();

   let email = '';
	let password = '';
	let errMsg = '';
	let phone = '';

	let loginMethod = 'phone';
	let countryCode = '+855';

	const countryCodes = [
		{ code: '+855', label: '+855 (KH)' },
		{ code: '+1', label: '+1 (US)' },
		{ code: '+91', label: '+91 (IN)' },
		{ code: '+44', label: '+44 (UK)' },
		// Add more country code options as needed
	];
   
   const onSignIn = async () => {
		try {
			await signIn.load({ email, password });
			dispatch('success');
		} catch (err) {
			errMsg = err.message;
			password = '';
		}
	};
</script>

<div class=" bg-gray-200 relative p-5 rounded-lg">
   <div
      class=" absolute -top-8 left-0 right-0 p-2 w-14 h-14 mx-auto text-gray-700 bg-white rounded-full"
   >
      <Extension />
   </div>
   <div
      class=" leading-10 font-medium text-2xl text-gray-600 text-center py-4"
   >
      KRADASS Extension
   </div>
   <div class=" w-[420px] rounded-lg bg-white">
      <div class=" flex pt-4 justify-center">
         <div class=" flex p-1 bg-gray-200 rounded-full">
            <div class="flex items-center">
               <div
                  on:click={() => {
                     loginMethod = 'phone';
                  }}
                  class=" cursor-pointer transform duration-300 py-2 px-6 rounded-full {loginMethod ===
                  'phone'
                     ? ' text-white bg-blue-600'
                     : ' text-gray-500'}"
                  for="phoneNumber"
               >
                  Phone
               </div>
               <div
                  on:click={() => {
                     loginMethod = 'email';
                  }}
                  class=" cursor-pointer transition-colors duration-200 py-2 px-6 rounded-full {loginMethod ===
                  'email'
                     ? ' text-white bg-blue-600'
                     : ' text-gray-500'}"
                  for="email"
               >
                  Email
               </div>
            </div>
         </div>
      </div>

      <div class="">
         <form on:submit|preventDefault={onSignIn} method="post">
            <div class="flex flex-col p-14 space-y-5">
               {#if loginMethod === 'email'}
                  <div class=" space-y-2">
                     <label for="">Email/username</label>
                     <div>
                        <input
                           bind:value={email}
                           name="email"
                           type="text"
                           class="transition duration-100 ease-in-out bg-gray-100 border text-gray-600 border-gray-200 rounded-lg h-12 w-full focus:outline-none focus:ring-2 focus:ring-pink-200 px-2"
                           placeholder="អ៊ីម៉ែល ឫឈ្មោះ"
                        />
                     </div>
                  </div>
               {/if}

               {#if loginMethod === 'phone'}
                  <div class=" space-y-2">
                     <label for="">Phone number</label>
                     <div class=" flex">
                        <div class=" pr-2">
                           <select
                              class="transition duration-100 ease-in-out bg-gray-100 border text-gray-600 border-gray-200 rounded-lg h-12 w-auto focus:outline-none focus:ring-2 focus:ring-pink-200 px-2 appearance-none py-2 leading-tight"
                              bind:value={countryCode}
                           >
                              {#each countryCodes as { code, label }}
                                 <option value={code}>{label}</option>
                              {/each}
                           </select>
                        </div>
                        <input
                           bind:value={phone}
                           name="phone"
                           type="phone"
                           class="transition duration-100 ease-in-out bg-gray-100 border text-gray-600 border-gray-200 rounded-lg h-12 w-full focus:outline-none focus:ring-2 focus:ring-pink-200 px-2"
                           placeholder="លេខទូរស័ព្ទ"
                        />
                     </div>
                  </div>
               {/if}
               <div class=" space-y-2">
                  <label for="">Password</label>
                  <input
                     bind:value={password}
                     name="password"
                     type="password"
                     class="transition duration-100 ease-in-out bg-gray-100 border text-gray-600 border-gray-200 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-pink-200 px-2"
                     placeholder="កូដសម្ងាត់"
                  />
               </div>
               {#if errMsg}
                  <div
                     in:fade
                     class=" flex flex-col py-1 rounded-lg m-auto px-2"
                  >
                     <p
                        class="truncate w-60 text-sm self-center text-yellow-600 text-center"
                     >
                        {errMsg}
                     </p>
                  </div>
               {/if}
               <div class="flex flex-col pt-5">
                  <button
                     type="submit"
                     class="transition duration-100 ease-in-out hover:bg-blue-800 w-full mx-auto bg-blue-600 h-12 py-2 font-bold text-white rounded-full"
                     >Login</button
                  >
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
