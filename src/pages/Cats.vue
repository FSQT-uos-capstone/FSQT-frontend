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
      <div v-for="cat in cats" :key="cat.id">
        <q-item>
          <q-item-section avatar>
            <q-avatar class="Profile">
              <img :src="cat.profile" :alt="cat.name" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ cat.name }}</q-item-label>
            <q-item-label caption lines="1">{{ cat.profile }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: "PageCats",
  data() {
    return {
      cats: [
        {
          id: 0,
          name: "시냥이1",
          profile: "https://randomuser.me/api/portraits/thumb/men/17.jpg"
        },
        {
          id: 0,
          name: "시냥이2",
          profile: "https://randomuser.me/api/portraits/thumb/men/18.jpg"
        },
        {
          id: 0,
          name: "시냥이3",
          profile: "https://randomuser.me/api/portraits/thumb/men/19.jpg"
        },
        {
          id: 0,
          name: "시냥이4",
          profile: "https://randomuser.me/api/portraits/thumb/men/20.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.Cats {
  .Header {
    background-color: #ffffff;
    color: #000000;
    height: 6vh;
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
