<template>
  <div class="main-footer-wrapper">
    <div class="footer-container"> <!-- This new container will center everything -->
      <Logo :width="returnLogoWidth" :white="true"/>
      <div class="links-container">
        <div class="site-links">
          <ul class="links-list">
            <li v-for="(link, index) in siteLinks" :key="index">
              <a :href="link.siteUrl">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        <div class="social-links">
          <div class="social-wrapper">
            <a v-for="item in socialMedia"
              :key="item.name"
              :href="item.siteUrl"
              target="_blank" 
              class="social-icon"
            >
              <component :is="item.componentLogo"></component>
            </a>
          </div>
        </div>
      </div>
      <div class="terms-wrapper">
        <p>2024 UNDEAD PHOENIX © - All rights reserved.</p>
        <p style="font-size: 10px">Designed & Developed by 
          <a 
            href="https://github.com/magpe30" 
            target="_blank"
          >
            mag30
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "@/components/general/styleComponents/Logo.vue";
import Youtube from "@/components/general/icons/logos/Youtube.vue";
import Facebook from "@/components/general/icons/logos/Facebook.vue";
import Spotify from "@/components/general/icons/logos/Spotify.vue";
import Instagram from "@/components/general/icons/logos/Instagram.vue";
import Gmail from "@/components/general/icons/logos/Gmail.vue";

export default {
  name: "MainFooter",
  components: {
    Logo,
    Youtube,
    Facebook,
    Spotify,
    Instagram,
    Gmail,
  },
  data() {
    return {
      siteLinks: [
        { name: "Music", siteUrl: "/discography" },
        { name: "Photos", siteUrl: "/photo-album" },
        { name: "About us", siteUrl: "/about-us" },
      ],
      socialMedia: [
        { name: "youtube", componentLogo: Youtube, siteUrl: "https://www.youtube.com/@undeadphoenixband" },
        { name: "instagram", componentLogo: Instagram, siteUrl: "https://www.instagram.com/undeadphoenixband" },
        { name: "spotify", componentLogo: Spotify, siteUrl: "https://open.spotify.com/artist/4YmBhrdeJByfwoI4uinMrC?si=_SfmphrQRX-cNn_iHOP17Q" },
        { name: "facebook", componentLogo: Facebook, siteUrl: "https://www.facebook.com/undeadphoenixband" },
        { name: "mail", componentLogo: Gmail, siteUrl: "undeadphoenixband@gmail.com" },
      ] 
    }
  },
  computed: {
    ...mapGetters([
      "window"
    ]),
    returnLogoWidth() {
      return this.isMobile ? 60 : 70;
    },
    isMobile(){
      return this.window.windowWidth <= 860
    }
  },
}
</script>
<style scoped>
.main-footer-wrapper {
  color: white;
  z-index: 5;
  position: relative;
  padding: 30px 60px;
  height: auto; /* Adjusted for dynamic content */
  background: black;
  box-shadow: 0 10px 15px 5px rgba(0, 0, 0, 0.15);
  display: flex; /* Aligns the footer container to the center */
  justify-content: center; /* Centers the footer container horizontally */
}

.footer-container {
  max-width: 1500px; /* Maximum width of the container */
  width: 100%; /* Ensures it expands to the full width of the wrapper */
}

/* Remaining styles are unchanged */
.links-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-footer {
  width: 70px;
  height: auto;
  margin: 0 !important;
  padding-top: 20px;
}

.links-list {
  display: flex;
  gap: 24px;
  align-items: center;
  color: var(--gold);
  font-size: 20px; /* Ensured original font size is maintained */
  font-size: 13px; /* Seems to be a typo, but keeping your last choice */
  margin: 24px 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  transition: color 0.3s ease;
}

li a:hover {
  color: white;
}

.social-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-icon {
  color: var(--gold);
}

.terms-wrapper {
  padding-bottom: 24px;
  font-size: 13px;
}

@media (max-width: 880px) {
  .main-footer-wrapper {
    padding: 30px 60px;
  }
}

@media (max-width: 715px) {
  .links-container {
    display: block;
  }

  .social-wrapper {
    margin: 12px 0;
  }

  .main-footer-wrapper {
    padding: 30px;
  }

  .terms-wrapper {
    text-align: center;
    margin-top: 20px;
    font-size: 11px;
  }
}
</style>
