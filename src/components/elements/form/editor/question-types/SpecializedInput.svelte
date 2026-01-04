<script>
  export let question;

  const configs = {
    DATE: {
      icon: "fa-calendar-alt",
      placeholder: "Pick a date...",
      label: "Date Picker",
    },
    TIME: {
      icon: "fa-clock",
      placeholder: "Pick a time...",
      label: "Time Picker",
    },
    EMAIL: {
      icon: "fa-envelope",
      placeholder: "example@email.com",
      label: "Email Validation",
    },
  };

  $: config = configs[question.type] || {
    icon: "fa-font",
    placeholder: "Short answer text...",
    label: "Input",
  };
</script>

<div
  class="flex items-center gap-3 p-4 bg-gray-50/50 border border-dashed border-gray-200 rounded-xl"
>
  <div
    class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-500 shadow-sm"
  >
    <i class="fas {config.icon}"></i>
  </div>

  <div class="flex-1">
    <p
      class="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1"
    >
      {config.label}
    </p>
    <div class="text-gray-400 italic text-sm">
      {config.placeholder}
    </div>
  </div>
</div>
