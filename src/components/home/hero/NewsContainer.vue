<template>
  <div class="news-wrap">
    <div class="clip-wrapper">
      <h1>D.I.E</h1>
      <p> New clip out now</p>
      <iframe
        width="560"
        height="315"
        :src="youtubeSrc"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="clip-wrapper">
      <h1>Tuned In</h1>
      <p>Our Latest Radio Talk</p>
      <iframe
        width="560"
        height="315"
        :src="radioTalk"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewsContainer",
  data() {
    return {
      youtubeSrc: 'https://www.youtube.com/embed/tQdbFHny1LM',
      radioTalk: 'https://www.youtube.com/embed/2Zz61ZLJRfg?start=15'
    };
  }
}
</script>
<style scoped>
.news-wrap {
  width: 100%;
  margin: auto;
  padding: 20px 60px;
  box-sizing: border-box;
  background-color: black;
  color: white; /* Assuming you want a light text on a dark background */
  text-align: center; /* Centers the content including h1 */
  position: relative;
  z-index: 5;
}

h1 {
  margin: 24px 0;
  font-weight: 700;
}

iframe {
  width: 100%;
  max-width: 800px; /* Responsive width */
  height: 500px; /* Adjust height accordingly */
  margin: 36px 0; /* Space between the h1 and the video */
}
</style>
