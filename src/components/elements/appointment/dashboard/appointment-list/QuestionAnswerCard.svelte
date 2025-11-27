<script>
    import QuestionMark from "$components/icons/QuestionMark.svelte";

    export let question = "";
    export let answer = "";
</script>

<div class="my-2">
    <div class="flex">
        <div class="w-12 border-t-2 border-l-2 rounded-tl-lg h-[1vw] border-[#004E80]"></div>
        <div class="w-full border-t-2 border-r-2 rounded-tr-lg "></div>
    </div>
    <div class="relative overflow-x-auto sm:rounded-bl-lg border-b-2 border-x-2 border-l-[#004E80] border-b-[#004E80] rounded-bl-lg rounded-br-lg px-[1vw] pb-[1vw] h-fit">
        <div class="border-2 rounded-lg p-2 text-[#004E80] flex items-center"><QuestionMark /> <span class="ml-2">{question}</span></div>
        <div class="px-4 pt-3">{answer}</div>
    </div>
</div>