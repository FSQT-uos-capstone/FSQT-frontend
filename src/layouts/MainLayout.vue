<template>
  <q-layout class="MainLayout" view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="Footer row">
      <q-toolbar class="Toolbar justify-around">
        <q-btn
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-home-outline"
        />
        <q-btn
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-search-outline"
        />
        <q-btn
          unelevated
          rounded
          :ripple="false"
          icon="eva-plus-outline"
          class="col-2 PostButton"
        />
        <q-btn
          flat
          round
          :ripple="false"
          color="black"
          icon="img:icons/cil-cat.svg"
        />
        <q-btn
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-message-circle-outline"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  beforeCreate() {
    const isAuthenticated = false;
    if (!isAuthenticated) this.$router.push({ path: "/gate" });
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  }
};
</script>

<style lang="scss">
.MainLayout {
  .Footer {
    background-color: #ffffff;
    color: #000000;
    height: 8vh;
    border-top: 1px solid #cccccc;
  }
  .Toolbar {
    height: 100%;
    .PostButton {
      background: linear-gradient(#ff00d6, #ff4d00);
      color: #ffffff;
    }
  }
}
</style>
