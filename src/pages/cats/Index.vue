<template>
  <q-page class="flex Cats">
    <q-header class="Header">
      <q-toolbar class="Toolbar text-center">
        <q-toolbar-title class="text-subtitle1 text-weight-bold">
          모시는 고양님들
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-list class="List">
      <div v-for="cat in chatCats" :key="cat.id">
        <q-item :to="{ path: `/cats/chat/${cat.id}` }">
          <q-item-section avatar>
            <q-avatar class="Profile">
              <img :src="cat.profile" :alt="cat.name" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ cat.name }}</q-item-label>
            <q-item-label caption lines="2">{{ cat.desc }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageCatsIndex",
  computed: {
    ...mapGetters({
      chatCats: "cat/listChat"
    })
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.Cats {
  .Header {
    background-color: #ffffff;
    color: #000000;
    border-bottom: 1px solid #cccccc;
    .Toolbar {
      height: 100%;
    }
  }
  .List {
    width: 100%;
    .Profile {
      width: 10vh;
      height: 10vh;
    }
  }
}
</style>
