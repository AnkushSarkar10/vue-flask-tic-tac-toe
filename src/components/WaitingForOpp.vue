<template>
  <h3>Waiting for opponent . . .</h3>
  <img src="https://media.giphy.com/media/Db7KR3SLgRUVfqKp0V/giphy.gif" />
</template>

<script>
export default {

}
</script>

<style scoped>

h3 {
  font-size: 4vh;
  margin-bottom: 3vh;
}

img {
  transform: scale(0.9);
}

@media screen and (max-device-width: 480px) {
  img {
    transform: scale(0.55);
    position: relative;
    right: 60px;
  }
}

</style>