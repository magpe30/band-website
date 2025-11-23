<template>
  <div>
    <div class="hero-wrapper">
      <img
        :src="heroImage"
        alt="Hero Image"
        class="main-photo"
        loading="lazy"
      />
      <img :src="logoBlack" alt="Band Logo" class="band-logo" loading="lazy" />
    </div>
    <div class="links">
      <a
        v-for="item in socialMedia"
        :key="item.name"
        :href="item.siteUrl"
        target="_blank"
        class="social-icon"
        :class="{ 'youtube-icon': item.name === 'youtube' }"
      >
        <component :is="item.componentLogo"></component>
      </a>
    </div>
  </div>
</template>

<script>
import heroImage from "../../../assets/img/home/hero_section_img.jpg";
import logoBlack from "../../../assets/img/media/logo.png";
import Youtube from "@/components/general/icons/logos/Youtube.vue";
import Facebook from "@/components/general/icons/logos/Facebook.vue";
import Spotify from "@/components/general/icons/logos/Spotify.vue";
import Instagram from "@/components/general/icons/logos/Instagram.vue";
import Gmail from "@/components/general/icons/logos/Gmail.vue";

export default {
  name: "HomeHero",
  components: {
    Youtube,
    Facebook,
    Spotify,
    Instagram,
    Gmail,
  },
  data() {
    return {
      heroImage,
      logoBlack,
      socialMedia: [
        {
          name: "youtube",
          componentLogo: Youtube,
          siteUrl: "https://www.youtube.com/@undeadphoenixband",
        },
        {
          name: "instagram",
          componentLogo: Instagram,
          siteUrl: "https://www.instagram.com/undeadphoenixband",
        },
        {
          name: "spotify",
          componentLogo: Spotify,
          siteUrl:
            "https://open.spotify.com/artist/4YmBhrdeJByfwoI4uinMrC?si=_SfmphrQRX-cNn_iHOP17Q",
        },
        {
          name: "facebook",
          componentLogo: Facebook,
          siteUrl: "https://www.facebook.com/undeadphoenixband",
        },
        {
          name: "mail",
          componentLogo: Gmail,
          siteUrl: "undeadphoenixband@gmail.com",
        },
      ],
    };
  },
};
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
}

.main-photo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the area without being stretched */
  object-position: center 10%;
  filter: grayscale(100%);
}

.links {
  background: var(--gold);
  color: black;
  margin-top: 50vh; /* Ensure the links appear below the hero */
  z-index: 10;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 18px 0;
  gap: 24px;
}

.social-icon {
  text-decoration: none;
}

.social-icon ::v-deep svg {
  width: 40px;
  height: 40px;
}

.youtube-icon svg {
  width: 44px;
  height: 44px;
}

.social-icon:hover {
  color: white;
}

.band-logo {
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  width: 250px;
  transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
  .band-logo {
    width: 100px;
    top: 25%;
  }

  .main-photo {
    height: 50%;
  }

  .links {
    margin-top: 0;
  }
}
</style>
