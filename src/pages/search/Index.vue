<template>
  <q-page class="column flex Search">
    <div class="column" style="width: 100vw">
      <div class="Title">
        일기장 찾기
      </div>
      <div class="List items-start justify-between content-start q-px-md">
        <q-input
          outlined
          square
          @keyup.prevent="handleSearch"
          v-bind:value="search"
          color="black"
          class="InputSearch"
          placeholder="해시태그"
          @loading="searching"
        >
          <template v-slot:prepend>
            <q-icon name="eva-search-outline" />
          </template>
        </q-input>
        <q-dialog
          v-model="showSelectedDiary"
          transition-show="scale"
          transition-hide="scale"
          @before-hide="unselectDiary"
        >
          <q-card
            style="padding: 10px; min-width: calc(100vw - 40px); max-width: calc(100vw - 40px); width: calc(100vw - 40px)"
          >
            <Diary
              v-if="selectedDiary.id === -1"
              :id="selectedDiary.id"
              :cat="selectedDiary.cat"
              :user="selectedDiary.user"
              :profile="selectedDiary.profile"
              :date="selectedDiary.date"
              :dayOfTheWeek="selectedDiary.dayOfTheWeek"
              :photoUrl="selectedDiary.photoURL"
              :diaryContent="selectedDiary.content"
              :emotions="selectedDiary.emotions"
              :tags="selectedDiary.tags"
            ></Diary>
            <Diary
              v-else
              :id="diaries[selectedDiary.idx].id"
              :cat="diaries[selectedDiary.idx].cat"
              :user="diaries[selectedDiary.idx].user"
              :profile="diaries[selectedDiary.idx].profile"
              :date="diaries[selectedDiary.idx].date"
              :dayOfTheWeek="diaries[selectedDiary.idx].dayOfTheWeek"
              :photoUrl="diaries[selectedDiary.idx].photoURL"
              :diaryContent="diaries[selectedDiary.idx].content"
              :emotions="diaries[selectedDiary.idx].emotions"
              :tags="diaries[selectedDiary.idx].tags"
            ></Diary>
          </q-card>
        </q-dialog>
        <div
          v-if="diaries.length === 0 || !search || search === ''"
          class="row"
        >
          <q-chip v-for="(tag, idx) in tags" :key="idx">
            {{ tag }}
          </q-chip>
        </div>
        <div v-else>
          <q-img
            v-for="(diary, idx) in diaries"
            :src="diary.photoURL"
            width="45%"
            class="q-mb-md"
            :ratio="1"
            :key="diary.id"
            @click="selectDiary(diary, idx)"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { DebounceMixin } from "../../mixins/debounce";
import { mapGetters } from "vuex";
import Diary from "../../components/Diary";

export default {
  name: "PageSearchIndex",
  computed: {
    ...mapGetters({
      diaries: "diary/list"
    })
  },
  components: {
    Diary
  },
  mixins: [DebounceMixin],
  async mounted() {
    this.$store.commit("diary/setList", []);
  },
  data() {
    return {
      tags: ["건공이", "인문이", "조아", "익명"],
      showSelectedDiary: false,
      search: null,
      searching: false,
      loaded: false,
      selectedDiary: {
        index: -1,
        id: -1,
        user: {
          id: -1,
          email: "",
          date_joined: ""
        },
        profile: {
          id: -1,
          user: -1,
          nickname: "",
          profile_img_url: null
        },
        content: null,
        tags: "",
        photoURL: null,
        emotions: [],
        created: "",
        date: "",
        dayOfTheWeek: "",
        tags: []
      }
    };
  },
  methods: {
    selectDiary(diary, idx) {
      Object.assign(this.selectedDiary, diary);
      this.selectedDiary.idx = idx;
      this.showSelectedDiary = true;
    },
    unselectDiary() {
      Object.assign(this.selectedDiary, {
        idx: -1,
        id: -1,
        user: {
          id: -1,
          email: "",
          date_joined: ""
        },
        profile: {
          id: -1,
          user: -1,
          nickname: "",
          profile_img_url: null
        },
        content: null,
        tags: "",
        photoURL: null,
        emotions: [],
        created: ""
      });
      this.showSelectedDiary = false;
    },
    handleSearch($event) {
      this.debounce(async () => {
        this.search = $event.target.value;
        if (this.search === "" || !this.search) {
          this.searching = false;
          return;
        }
        try {
          await this.$store.dispatch("diary/getListSpecificTag", this.search);
          this.searching = true;
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
        } finally {
          this.searching = false;
        }
      }, 800);
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
    padding-bottom: 10px;
  }
  .List {
    width: 100%;
    min-height: 65.5vh;
    height: 65.5vh;
    overflow-y: auto;
    margin-top: 20px;
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
