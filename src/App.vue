<template>
  <router-view />
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.card {
  max-width: 800px;
  min-height: 280px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 500px) {
    min-width: 500px;
  }
}
.view {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.link {
  color: black;
  margin-top: 1rem;
}
</style>
