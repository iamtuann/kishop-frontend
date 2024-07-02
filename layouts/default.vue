<template>
  <div class="px-3 py-1 bg-primary font-sans">
    <div class="flex justify-between items-center container mx-auto text-xs text-white ">
      <div class="flex items-center">
        <span class="material-symbols-outlined default-style-icon text-xl leading-tight">phone</span>
        <span class="ms-2">+84 989 382 xxx</span>
      </div>
      <div class="hidden md:block">
        Get 50% Off on selected Item | Shop now
      </div>
      <div class="flex items-center">
        <span class="material-symbols-outlined default-style-icon text-xl leading-tight">home</span>
        <div class="ms-1 h-full">Ha Noi, Vietnam</div>
      </div>
    </div>
  </div>
  <LayoutHeader />
  <div class="">
    <slot />
  </div>
</template>