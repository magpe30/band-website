<template>
  <div class="links-wrapper">
    <ul class="links-list">
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.siteUrl" class="link-route">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Links",
  data() {
    return {
      links: [
        { name: "Music", siteUrl: "/discography" },
        { name: "Photos", siteUrl: "/photo-album" },
        { name: "Band", siteUrl: "/about-us" },
      ],
    };
  },
}
</script>

<style scoped>
.links-list {
  display: flex;
  flex-direction: row; /* Default to horizontal layout */
  gap: 24px;
  align-items: center;
  color: var(--gold);
  font-size: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.link-route {
  position: relative;
  display: inline-block;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-route:hover {
  color: white;
}

.link-route::after {
  content: '';
  position: absolute;
  width: calc(100% + 10px);
  height: 1px;
  background-color: transparent;
  left: -5px;
  bottom: -3px;
  transition: background-color 0.3s ease;
}

.link-route:hover::after {
  background-color: white;
}

@media (max-width: 768px) {
  .links-list {
    flex-direction: column; 
  }
}
</style>
