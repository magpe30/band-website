<template>
  <div>
    <section
      class="hero-section"
      :style="{ backgroundImage: 'url(' + heroImage + ')' }"
    >
      <div class="hero-filter">
        <div class="hero-text">
          <h1>Photos</h1>
          <p style="margin-top: 24px">
            Our concerts are more than just performances; they're a reminder of
            the euphoria that rock 'n' roll can bring to life. Despite tackling
            heavy themes in our songs, such as drug addiction, failed
            relationships, self-hatred, and encounters with dangerous women, our
            music never loses sight of its primary goal - to entertain and
            invigorate. These themes are woven into our music, not to dwell on
            the darkness, but to highlight the power of rock music to transcend,
            transform, and provide an escape.
          </p>
        </div>
      </div>
    </section>

    <!-- Grid Section -->
    <section class="grid-section">
      <div class="container grid-container">
        <div
          v-for="(photo, index) in galleryPhotos"
          :key="index"
          class="gallery-photo"
          @click="openLightbox(index)"
        >
          <ImageContainer
            activeType="local"
            :source="photo"
            :w="50"
            :h="50"
            :alt="'Photo ' + (index + 1)"
          />
        </div>
      </div>
    </section>
    <div v-if="lightboxOpen" class="lightbox">
      <button @click="prevPhoto" class="nav-button">
        <i class="material-icons-round"> chevron_left </i>
      </button>
      <img
        :src="galleryPhotos[selectedPhotoIndex]"
        :alt="`Photo ${selectedPhotoIndex + 1}`"
        class="lightbox-img"
      />
      <button @click="nextPhoto" class="nav-button">
        <i class="material-icons-round"> chevron_right </i>
      </button>
      <button @click="closeLightbox" class="close-button">
        <i class="material-icons-round">
          <span class="material-symbols-outlined"> close </span>
        </i>
      </button>
    </div>
    <MainFooter />
  </div>
</template>
<script>
import heroImage from "@/assets/img/home/photos_hero_section.jpg";
import photo_1 from "@/assets/img/photoGallery/photo_gallery_1.jpg";
import photo_2 from "@/assets/img/photoGallery/photo_gallery_2.jpg";
import photo_3 from "@/assets/img/photoGallery/photo_gallery_3.jpg";
import photo_4 from "@/assets/img/photoGallery/photo_gallery_4.jpg";
import photo_5 from "@/assets/img/photoGallery/photo_gallery_5.jpg";
import photo_6 from "@/assets/img/photoGallery/photo_gallery_6.jpg";
import photo_7 from "@/assets/img/photoGallery/photo_gallery_7.jpg";
import photo_8 from "@/assets/img/photoGallery/photo_gallery_8.jpg";
import photo_9 from "@/assets/img/photoGallery/photo_gallery_9.jpg";
import photo_10 from "@/assets/img/photoGallery/photo_gallery_10.jpg";
import MainFooter from "@/components/header/MainFooter.vue";
import ImageContainer from "@/components/general/styleComponents/ImageContainer.vue";

export default {
  name: "PhotoAlbum",
  components: {
    MainFooter,
    ImageContainer,
  },
  data() {
    return {
      heroImage,
      galleryPhotos: [
        photo_1,
        photo_2,
        photo_3,
        photo_4,
        photo_5,
        photo_6,
        photo_7,
        photo_8,
        photo_9,
        photo_10,
      ],
      lightboxOpen: false,
      selectedPhotoIndex: 0,
    }
  },
  methods: {
    openLightbox(index) {
      this.lightboxOpen = true;
      this.selectedPhotoIndex = index;
    },
    closeLightbox() {
      this.lightboxOpen = false;
    },
    nextPhoto() {
      this.selectedPhotoIndex = (this.selectedPhotoIndex + 1) % this.galleryPhotos.length;
    },
    prevPhoto() {
      this.selectedPhotoIndex =
        (this.selectedPhotoIndex + this.galleryPhotos.length - 1) %
        this.galleryPhotos.length;
    },
  },
};
</script>

<style scoped>
.hero-section {
  height: 100vh;
  background-size: cover;
  background-position: center;
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

.gallery-photo {
  border: 2px dotted var(--gold);
  padding: 8px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.gallery-photo img {
  width: 100%;
  height: auto;
  display: block;
}

.gallery-photo :deep(img) {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 images per row */
  gap: 20px;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 40px;
  box-sizing: border-box;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}

.nav-button,
.close-button {
  background-color: #808080; /* Grey background */
  opacity: 0.6;
  border-radius: 8px;
  color: white; /* White icon */
  border: none;
  font-size: 24px;
  padding: 10px 10px 2px 10px;
  cursor: pointer;
  margin: 0 10px;
}

.close-button {
  position: absolute;
  top: 50px;
  right: 20px;
}

.nav-button:hover,
.close-button:hover {
  background-color: #a0a0a0; /* Lighter grey on hover */
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Stack images on smaller screens */
  }

  .nav-button {
    font-size: 20px;
    padding: 6px 8px 2px 8px; /* smaller padding */
    margin: 0; /* closer to the image */
  }

  .close-button {
    top: 75px;
  }
}
</style>
