<template>
  <q-page class="column flex Search">
    <q-space />
    <div class="row Title">
      고양이 찾기
    </div>
    <q-space />
    <div class="row q-px-md q-pb-sm">
      <q-input
        outlined
        square
        @keyup.prevent="handleSearch"
        v-bind:value="search"
        color="black"
        class="InputSearch"
        placeholder="고양이 이름"
      ></q-input>
    </div>
    <div class="List row items-start justify-between content-start q-px-md">
      <q-card class="Card q-my-sm" v-for="cat in filteredCats" :key="cat.id">
        <q-img src="https://cataas.com/cat?type=sq">
          <div
            class="text-h5 absolute-center text-weight-bold text-center"
            style="width: 70%; min-width: 70%; max-width: 70%"
          >
            {{ cat.name }}
          </div>
        </q-img>
      </q-card>
    </div>
    <q-space />
  </q-page>
</template>

<script>
import { DebounceMixin } from "../../mixins/debounce";
import { mapGetters } from "vuex";

export default {
  name: "PageSearchIndex",
  computed: {
    ...mapGetters({
      cats: "cat/list"
    }),
    filteredCats() {
      return this.cats.filter(cat => {
        if (!this.search) return true;
        else return cat.name.includes(this.search);
      });
    }
  },
  mixins: [DebounceMixin],
  async mounted() {
    this.loaded = false;
    try {
      await this.$store.dispatch("cat/getList");
      this.loaded = true;
    } catch (e) {
      console.error(e);
      this.$q
        .dialog({
          title: "😭고양이 목록 가져오기 실패",
          message: "고양이의 심술처럼 오류가 발생했습니다.",
          ok: {
            label: "확인",
            unelevated: true,
            color: "black",
            dark: true
          },
          cancel: false,
          persistent: true
        })
        .onOk(() => {})
        .onDismiss(() => {});
    }
  },
  data() {
    return {
      search: null,
      loaded: false
    };
  },
  methods: {
    handleSearch($event) {
      this.debounce(() => {
        this.search = $event.target.value;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.Search {
  overflow-y: hidden;
  .Title {
    color: #000000;
    font-size: 2.27rem;
    font-weight: medium;
    padding-left: 20px;
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
    min-height: 65.5vh;
    height: 65.5vh;
    max-height: 65.5vh;
    overflow-y: scroll;
    .Card {
      min-width: 44vw;
      width: 44vw;
      max-width: 44vw;
      min-height: 44vw;
      height: 44vw;
      max-width: 44vw;
    }
    .Profile {
      width: 10vw;
      height: 10vw;
    }
  }
}
</style>
