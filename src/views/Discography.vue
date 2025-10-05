<template>
  <div>
    <section class="hero-section" :style="{ backgroundImage: 'url(' + heroImage + ')' }">
      <div class="hero-filter">
        <div class="hero-text">
          <h1>Music</h1>
          <p style="margin-top: 24px">
            In an era where the essence of rock seems to be fading, both in Poland and globally, we strive to
            bring back the exhilarating joy that defines this genre. Our journey in music is deeply rooted in old-
            school heavy metal, a style that has been our companion since our earliest forays into music. This rich
            legacy is evident in our sound, which is both a homage to the classics and a fresh take on the genre.
          </p>
        </div>
      </div>
    </section>

    <!-- Grid Section -->
    <section class="grid-section">
      <div class="container grid-container">
        <div v-for="video in videos" :key="video.id" class="video-row">
          <h2>{{ video.title }}</h2>
          <iframe
            width="560"
            height="315"
            :src="'https://www.youtube.com/embed/' + video.id"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
    <MainFooter />
  </div>
</template>
<script>
import heroImage from '../assets/img/home/music_hero.jpg';
//import GenImage from "@/components/general/styleComponents/GenImage.vue";
import MainFooter from "@/components/header/MainFooter.vue";

export default {
  name: "Discography",
  components: {
    MainFooter,
    //GenImage
  },
  data() {
    return {
      heroImage,
      videos: [
        {
          title: "D.I.E",
          id: "tQdbFHny1LM"
        },
        {
          title: "Bulldozer",
          id: "_csdVpwetFo"
        },
        {
          title: "Seek & destroy(cover)",
          id: "yzLzQQE_gSg"
        },
        {
          title: "Undead Phoenix for Steel Panther's Opener",
          id: "Mp8VkNlkPeI?start=11"
        }
      ]
    }
  },
};
</script>

<style scoped>
.hero-section {
  height: 100vh;
  background-size: cover;
  background-position: center 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 50px;
  font-weight: 700;
}

.hero-filter {
  width: 100%; /* Ensures hero filter spans full width */
  height: 100%; /* Full height */
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.hero-text {
  width: 100%;
  max-width: 660px; /* Keeps the text well constrained */
  text-align: center;
}

.container {
  max-width: 1500px; /* Maximum width for the container within grid-section */
  width: 100%; /* Ensures it expands to the full width of its parent */
  margin: auto; /* Centers the container */
  padding: 20px 60px; /* Symmetrical padding */
  box-sizing: border-box; /* Ensures padding is included in the width */
}

.grid-container {
  display: grid;
  gap: 20px;
}

.video-row {
  margin: 36px;
  color: white;
  text-align: center; /* Center the video and title */
}

.video-row h2 {
  font-weight: 700;
  margin-bottom: 24px;
}

iframe {
  width: 100%; /* Responsive width */
  max-width: 560px; /* Maximum size of the video */
  height: 315px; /* Fixed height */
  border: none; /* Remove border */
}
</style>
