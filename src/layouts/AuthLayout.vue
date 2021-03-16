<template>
  <q-layout class="AuthLayout" view="hHh lpR fFf">
    <q-toolbar class="Toolbar">
      <q-btn v-go-back flat round color="black" icon="west" />
    </q-toolbar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.AuthLayout {
  background: #ffffff;
  .Toolbar {
    padding: 0;
  }
}
</style>
