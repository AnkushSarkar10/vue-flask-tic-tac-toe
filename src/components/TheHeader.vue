<template>
  <div class="main-header">
    <h1>TIC TAC TOE</h1>
    <!-- <h4>({{ $store.state.connectionStr }})</h4> -->
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.main-header {
  display: flex;
  width: 100%;
  justify-content: center;
}

h1 {
  font-size: 6em;
  background: -webkit-linear-gradient(60deg, #03DAC6, #673AB7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media screen and (max-device-width: 510px) {
  h1 {
    font-size: 3em;
  }
}

</style>