<template>
  <div class="py-1 bg-primary">
    <div class="flex justify-between items-center container mx-auto text-xs text-white ">
      <div class="flex items-center">
        <span class="material-symbols-outlined default-style-icon text-xl leading-tight">phone</span>
        <span class="ms-2">+84 989 382 xxx</span>
      </div>
      <div>
        Get 50% Off on selected Item | Shop now
      </div>
      <div class="flex items-center">
        <span class="material-symbols-outlined default-style-icon text-xl leading-tight">home</span>
        <div class="ms-1 h-full">Ha Noi, Vietnam.</div>
      </div>
    </div>
  </div>
  <Header />
  <div class="container mx-auto p-4">
    <slot />
  </div>
</template>