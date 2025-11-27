<script>
	import Cancel from '$components/icons/Cancel/Cancel.svelte';
	let studentId = '';
	let cardName = 'Group A';
	let ids = [
		{ id: 'e20230001' },
		{ id: 'e20230002' },
		{ id: 'e20230003' },
		{ id: 'e20230004' },
		{ id: 'e20230005' },
		{ id: 'e20230006' },
	];
</script>

<div class="flex flex-col w-full h-full space-y-3">
	<div class="flex flex-grow w-full h-full py-2 space-x-8">
		<div class="flex flex-grow-0 space-x-2">
			<input type="checkbox" class="w-6 h-6 border-subtitle-2" />
			<div>Remark 1</div>
		</div>
		<div class="flex flex-col flex-grow">
			<div class="flex-grow-0 space-y-4">
				<div class="w-full space-y-2">
					<div class="text-sm">Name (ex. id, email, phone, etc)</div>
					<div class="w-full border-2 rounded-md border-background-1">
						<input
							type="text"
							id="default-search"
							bind:value={studentId}
							class="w-full p-2 px-4 text-base rounded-full outline-none text-subtitle dark:placeholder-gray-400"
							placeholder="Student ID"
						/>
					</div>
				</div>

				<div class="flex items-center space-x-3">
					<input type="checkbox" class="w-5 h-5" />
					<div class="text-sm">
						Required (User must complete this field to join)
					</div>
				</div>
			</div>

			<div class="flex flex-col flex-grow pt-4 space-y-2">
				<div class="flex-grow-0 text-sm">
					Validation (This input must match the following records)
				</div>
				<div
					class="flex flex-col flex-grow p-2 space-y-2 border rounded-md border-subtitle-2"
				>
					<div class="flex justify-end flex-grow-0 space-x-2 text-sm">
						<div class="px-2 py-1 text-white rounded-lg bg-subtitle">
							+ Insert
						</div>
						<div class="px-2 py-1 text-white rounded-lg bg-primary-4">
							Clear all
						</div>
					</div>
					<div class="relative flex-grow overflow-y-auto">
						<div class="absolute inset-0 space-y-2">
							{#each ids as id}
								<div class="flex items-center pr-3 space-x-2">
									<div class="flex-grow px-2 py-2 bg-background-1">
										{id.id}
									</div>
									<div
										class="flex-grow-0 cursor-pointer text-primary-4 hover:text-primary-3"
									>
										<Cancel />
									</div>
								</div>
							{/each}
						</div>
					</div>
					<!-- <div class=" h-[500px] flex-grow overflow-y-auto">
						<div class="space-y-2 ">
							{#each ids as id}
								<div class="flex items-center pr-3 space-x-2">
									<div class="flex-grow px-2 py-2 bg-background-1">
										{id.id}
									</div>
									<div
										class="flex-grow-0 cursor-pointer text-primary-4 hover:text-primary-3"
									>
										<Cancel />
									</div>
								</div>
							{/each}
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
	<div class="flex justify-end flex-grow-0">
		<div
			class="w-32 py-2 text-center text-white rounded-md shadow cursor-pointer hover:bg-tertiary-2 bg-tertiary-3"
		>
			Save change
		</div>
	</div>
</div>
