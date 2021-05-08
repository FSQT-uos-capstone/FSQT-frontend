<template>
  <q-layout class="GateLayout" view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="Footer row">
      <q-toolbar class="Toolbar justify-evenly">
        <q-btn
          to="/auth"
          unelevated
          :ripple="false"
          class="LoginButton"
          label="로그인"
        />
        <q-btn
          to="/auth/register/nickname"
          unelevated
          :ripple="false"
          class="RegisterButton"
          label="집사 등록하기"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "GateLayout",
  data() {
    return {};
  },
  methods: {
    /*async signIn(e, go) {
      e.navigate = false;
      this.$store.dispatch("auth/setAuthenticatedAsync", true).then(() => {
        this.$router.go("/");
      });
      // go();
    }*/
  }
};
</script>

<style lang="scss">
.GateLayout {
  .Footer {
    background-color: #ffffff;
    color: #000000;
    height: 10vh;
  }
  .Toolbar {
    height: 100%;
    .LoginButton {
      width: 47.5%;
      height: 65%;
      border: 2px solid #000000;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: bold;
    }
    .RegisterButton {
      width: 47.5%;
      height: 65%;
      border: 2px solid #000000;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: bold;
      background: #000000;
      color: #ffffff;
    }
  }
}
</style>
