<template>
  <q-page class="column flex PageDiscoverIndex">
    <vuescroll
      :ops="ops"
      class="column Diaries"
      @refresh-start="handleRS"
      @refresh-before-deactivate="handleRBD"
    >
      <div class="child-element Title">
        고양이 일기장
      </div>
      <div v-if="!loaded">
        <DiarySkeleton style="padding-top: 20px"></DiarySkeleton>
      </div>
      <div v-else>
        <Diary
          v-for="diary in diaries"
          style="padding-top: 20px"
          :key="diary.id"
          :id="diary.id"
          :cat="diary.cat"
          :user="diary.user"
          :profile="diary.profile"
          :date="diary.date"
          :dayOfTheWeek="diary.dayOfTheWeek"
          :photoUrl="diary.photoURL"
          :diaryContent="diary.content"
          :emotions="diary.emotions"
        ></Diary>
      </div>
    </vuescroll>
    <div style="height: 12vh"></div>
    <q-space></q-space>
  </q-page>
</template>

<script>
import Diary from "../components/Diary";
import DiarySkeleton from "src/components/DiarySkeleton.vue";
import vuescroll from "vuescroll";
import { mapGetters } from "vuex";

export default {
  name: "PageIndex",
  components: {
    Diary,
    vuescroll,
    DiarySkeleton
  },
  computed: {
    ...mapGetters({
      diaries: "diary/list"
    })
  },
  async mounted() {
    await this.refreshDiaryList();
  },
  data() {
    return {
      loaded: false,
      ops: {
        vuescroll: {
          mode: "slide",
          pullRefresh: {
            enable: true,
            tips: {
              deactive: "당겨서 새로 불러오기",
              active: "놓아서 새로 불러오기",
              start: "새로 불러오는 중...",
              beforeDeactive: "새로 불러오기 성공!"
            }
          },
          pushLoad: {
            enable: true,
            auto: true,
            autoLoadDistance: 10,
            tips: {
              deactive: "당겨서 불러오기",
              active: "놓아서 불러오기",
              start: "불러오는 중...",
              beforeDeactive: "불러오기 성공!"
            }
          }
        },
        bar: {
          disable: true
        },
        scrollPanel: {
          scrollingY: true,
          speed: 800,
          easing: "easeInOutQuad",
          verticalNativeBarPos: "right"
        }
      }
    };
  },
  methods: {
    async refreshDiaryList() {
      this.loaded = false;
      try {
        await this.$store.dispatch("diary/getListDefault");
        this.loaded = true;
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭고양이 일기장 가져오기 실패",
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
          .onOk(() => {
            this.$router.push("/gate");
          })
          .onDismiss(() => {
            this.$router.push("/gate");
          });
      }
    },
    async handleRS(vsInstance, refreshDom, done) {
      const vm = this;
      await this.refreshDiaryList();
      done();
    },
    handleRBD(vm, loadDom, done) {
      setTimeout(() => {
        done();
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.PageDiscoverIndex {
  min-height: 92vh;
  height: 92vh;
  max-height: 92vh;
  overflow-y: hidden;
  .Toolbar {
    padding: 0;
  }
  .Title {
    color: #000000;
    font-size: 2.27rem;
    font-weight: medium;
  }
  .Diaries {
    display: block;
    overflow-y: auto;
    min-width: calc(100vw - 40px);
    max-width: calc(100vw - 40px);
    width: calc(100vw - 40px);
    min-height: 100%;
    height: 100%;
    max-height: 100%;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
