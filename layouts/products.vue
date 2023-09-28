<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">KiShop products</NuxtLink>
      </nav>
    </header>
    <div>
      <slot />
    </div>
    <footer>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/products">Products</NuxtLink></li>
      </ul>
    </footer>
  </div>
</template>