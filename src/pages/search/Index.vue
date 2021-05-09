<template>
  <q-page class="column flex Search">
    <q-space />
    <div class="row Title q-px-md q-py-lg">
      고양이 찾기
    </div>
    <q-space />
    <div class="row q-px-md q-pb-sm">
      <q-input
        outlined
        square
        v-model="search"
        debounce="500"
        color="black"
        class="InputSearch"
        placeholder="고양이 이름"
      ></q-input>
    </div>
    <div class="List row items-start flex-center">
      <q-card
        class="Card"
        v-for="cat in cats"
        :key="cat.id"
        style="margin: 4px;"
      >
        <q-img :src="cat.profile">
          <div
            class="text-h5 absolute-center text-weight-bold text-center"
            style="width: 70%; min-width: 70%; max-width: 70%"
          >
            {{ cat.name }}
          </div>
        </q-img>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageSearchIndex",
  data() {
    return {
      search: null,
      cats: [
        {
          id: 0,
          name: "시냥이1",
          profile: "https://randomuser.me/api/portraits/thumb/men/17.jpg"
        },
        {
          id: 1,
          name: "시냥이2",
          profile: "https://randomuser.me/api/portraits/thumb/men/18.jpg"
        },
        {
          id: 2,
          name: "시냥이3",
          profile: "https://randomuser.me/api/portraits/thumb/men/19.jpg"
        },
        {
          id: 3,
          name: "시냥이4",
          profile: "https://randomuser.me/api/portraits/thumb/men/20.jpg"
        },
        {
          id: 4,
          name: "시냥이5",
          profile: "https://randomuser.me/api/portraits/thumb/men/21.jpg"
        },
        {
          id: 5,
          name: "시냥이6",
          profile: "https://randomuser.me/api/portraits/thumb/men/22.jpg"
        },
        {
          id: 6,
          name: "시냥이7",
          profile: "https://randomuser.me/api/portraits/thumb/men/23.jpg"
        },
        {
          id: 7,
          name: "시냥이8",
          profile: "https://randomuser.me/api/portraits/thumb/men/24.jpg"
        },
        {
          id: 8,
          name: "시냥이9",
          profile: "https://randomuser.me/api/portraits/thumb/men/25.jpg"
        },
        {
          id: 9,
          name: "시냥이10",
          profile: "https://randomuser.me/api/portraits/thumb/men/26.jpg"
        },
        {
          id: 10,
          name: "시냥이11",
          profile: "https://randomuser.me/api/portraits/thumb/men/27.jpg"
        },
        {
          id: 11,
          name: "시냥이12",
          profile: "https://randomuser.me/api/portraits/thumb/men/28.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.Search {
  .Title {
    color: #000000;
    font-size: 2.27rem;
    font-weight: medium;
  }
  .InputSearch {
    min-width: 100%;
    max-width: 100%;
    .q-field__control::before {
      border: 2px solid #000000;
    }
  }
  .List {
    width: 100%;
    .Card {
      min-width: 45vw;
      width: 45vw;
      max-width: 45vw;
      min-height: 45vw;
      height: 45vw;
      max-width: 45vw;
    }
    .Profile {
      width: 10vh;
      height: 10vh;
    }
  }
}
</style>
