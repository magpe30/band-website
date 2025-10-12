<template>
  <div>
    <section
      class="hero-section"
      :style="{ backgroundImage: 'url(' + heroImage + ')' }"
    >
      <div class="hero-filter">
        <div class="hero-text">
          <h1>Band</h1>
          <p style="margin-top: 24px">
            Hailing from the vibrant music scene of Wrocław, Poland, Undead
            Phoenix is a thrash/heavy metal band that's reigniting the spirit of
            rock 'n' roll. At the core of our music is a simple, yet powerful
            message: heavy metal is synonymous with pure, unadulterated fun.
          </p>
        </div>
      </div>
    </section>

    <!-- Grid Section -->
    <section class="grid-section">
      <div class="container grid-container">
        <div class="row">
          <div class="col image-col">
            <ImageContainer
              activeType="local"
              source="home/vocal_portrait.jpg"
              :w="150"
              :h="300"
            />
          </div>
          <div class="col text-col">
            <p>
              <strong>Martin Haze</strong> (vocals, electric guitar) – He loves
              Big 4 of Thrash and Iron Maiden, though he proudly admits that he
              listens to Glam all the time(he loves Steel Panther). He believes
              that a good metal song isn't complete without a guitar solo
              (Machine Head's "Imperium" is the exception that proves the rule).
              the rule). Guitar idols: Dimebag Darrell, Andy James.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col text-col">
            <p>
              <strong>Bart Steel</strong> (electric guitar) - a die-hard Judas
              Priest fan – he knows every riff and solo by heart and plays them
              every chance he gets when a guitar is in his hands. One look at
              him and it's clear who his guitar idol is. He loves classic
              British rock and heavy metal, but recently he is deeply into 80s
              American glam playing constantly Dokken and Ratt.
            </p>
          </div>
          <div class="col image-col">
            <ImageContainer
              activeType="local"
              source="home/guitar_portrait.jpg"
              :w="100"
              :h="200"
            />
          </div>
        </div>
        <div class="row">
          <div class="col image-col">
            <ImageContainer
              activeType="local"
              source="home/drums_portrait.jpg"
              :w="100"
              :h="200"
            />
          </div>
          <div class="col text-col">
            <p>
              <strong>Magnum Marty</strong> (drums) - our latest gem. Deeply
              rooted in progressive metal, his presence has elevated our skills
              and playing style to a new level. He's a huge fan of Death and was
              involved in the black metal scene for many years. However, as soon
              as he started playing with Undead Phoenix, he found a girlfriend.
              Coincidence? I don't think so!
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col text-col">
            <p>
              Paul Long Dee (bass guitar) - a bassist who always seems to have a
              beautiful girl by his side. No one knows why, but the answer might
              lie in his nickname. A lover of melodic death metal – he's the one
              focused on infusing Undead Phoenix's music with as much
              "kick-ass-ness" as possible.
            </p>
          </div>
          <div class="col image-col">
            <ImageContainer
              activeType="local"
              source="home/bass_portrait.jpg"
              :w="50"
              :h="100"
              class="drum-picture-padding"
            />
          </div>
        </div>
      </div>
    </section>
    <MainFooter />
  </div>
</template>
<script>
import heroImage from "@/assets/img/home/about_us_section.jpg";
import ImageContainer from "@/components/general/styleComponents/ImageContainer.vue";
import MainFooter from "@/components/header/MainFooter.vue";

export default {
  name: "AboutUs",
  data() {
    return {
      heroImage,
    };
  },
  components: {
    ImageContainer,
    MainFooter,
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

.row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  max-height: 660px;
}

.row.reverse {
  flex-direction: row-reverse;
}

.col {
  flex: 1;
}

.image-col {
  width: 100%;
  height: auto;
  max-height: 800px;
  overflow: hidden;
}

.text-col {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  color: white;
}

@media (max-width: 768px) {
  .hero-text,
  .container {
    padding: 20px; /* Adjusts padding to ensure usability on mobile */
  }

  h1 {
    font-size: 36px;
  }

  .row {
    flex-direction: column;
  }

  .image-col, .text-col {
    order: -1; /* Images above text */
  }

  .text-col {
    order: 1;
  }
}
</style>
