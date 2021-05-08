<template>
  <q-layout class="AuthLayout" view="hHh lpR fFf">
    <q-toolbar class="Toolbar">
      <q-btn
        v-if="$q.platform.is.capacitor"
        v-go-back
        flat
        round
        color="black"
        icon="eva-arrow-back-outline"
      />
      <q-btn
        v-else
        @click="$router.back()"
        flat
        round
        color="black"
        icon="eva-arrow-back-outline"
      />
    </q-toolbar>
    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
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
