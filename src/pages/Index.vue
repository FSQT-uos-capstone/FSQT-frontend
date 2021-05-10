<template>
  <q-page class="column flex PageDiscoverIndex">
    <q-space />
    <div class="row Title">
      고양이 일기장
    </div>
    <q-space />
    <div class="row Diaries">
      <carousel
        :paginationEnabled="false"
        :perPage="1"
        :scrollPerPage="true"
        style="max-width: 100vw"
      >
        <slide v-if="!loaded" style="max-width: 100vw; width: 100vw;">
          <DiarySkeleton></DiarySkeleton>
        </slide>
        <slide
          v-else
          v-for="diary in diaries"
          :key="diary.id"
          style="max-width: 100vw; width: 100vw;"
        >
          <Diary
            :cat="diary.cat"
            :user="diary.user"
            :date="diary.date"
            :dayOfTheWeek="diary.dayOfTheWeek"
            :photoUrl="diary.photoURL"
            :diaryContent="diary.content"
            :emotions="diary.emotions"
          ></Diary>
        </slide>
      </carousel>
    </div>
  </q-page>
</template>

<script>
import Diary from "../components/Diary";
import DiarySkeleton from "src/components/DiarySkeleton.vue";
import { Carousel, Slide } from "vue-carousel";
import { mapGetters } from "vuex";

export default {
  name: "PageIndex",
  components: {
    Diary,
    Carousel,
    Slide,
    DiarySkeleton
  },
  computed: {
    ...mapGetters({
      diaries: "diary/list"
    })
  },
  async mounted() {
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
  data() {
    return {
      loaded: false,
      ops: {
        vuescroll: {
          mode: "slide",
          pullRefresh: {
            enable: false,
            tips: {
              deactive: "Pull to Refresh",
              active: "Release to Refresh",
              start: "Refreshing...",
              beforeDeactive: "Refresh Successfully!"
            }
          }
        }
      },
      contents: [
        {
          id: 0,
          cat: {
            id: 0,
            name: "시냥이1",
            profileUrl: "https://cdn.quasar.dev/img/avatar2.jpg",
            location: "시립대 정문"
          },
          user: {
            id: 0,
            name: "시냥집사1",
            profileUrl: "https://cdn.quasar.dev/img/avatar4.jpg"
          },
          date: "2021년 4월 2일",
          dayOfTheWeek: "뭔요일",
          photoUrl: "https://placeimg.com/1000/1000/any",
          diaryContent:
            "난 차가운 도시의 고양이...\n오늘도 밥을 먹는다.\n오늘은 사료 맛이 괜찮구만.",
          likes: 114,
          comment: 35
        },
        {
          id: 1,
          cat: {
            id: 0,
            name: "시냥이1",
            profileUrl: "https://cdn.quasar.dev/img/avatar2.jpg",
            location: "시립대 정문"
          },
          user: {
            id: 0,
            name: "시냥집사1",
            profileUrl: "https://cdn.quasar.dev/img/avatar4.jpg"
          },
          date: "2021년 4월 2일",
          dayOfTheWeek: "뭔요일",
          photoUrl: "https://placeimg.com/1000/1000/any",
          diaryContent:
            "난 차가운 도시의 고양이...\n오늘도 밥을 먹는다.\n오늘은 사료 맛이 괜찮구만.",
          likes: 114,
          comment: 35
        },
        {
          id: 2,
          cat: {
            id: 0,
            name: "시냥이1",
            profileUrl: "https://cdn.quasar.dev/img/avatar2.jpg",
            location: "시립대 정문"
          },
          user: {
            id: 0,
            name: "시냥집사1",
            profileUrl: "https://cdn.quasar.dev/img/avatar4.jpg"
          },
          date: "2021년 4월 2일",
          dayOfTheWeek: "뭔요일",
          photoUrl: "https://placeimg.com/1000/1000/any",
          diaryContent:
            "난 차가운 도시의 고양이...\n오늘도 밥을 먹는다.\n오늘은 사료 맛이 괜찮구만.",
          likes: 114,
          comment: 35
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.PageDiscoverIndex {
  .Toolbar {
    padding: 0;
  }
  .Title {
    color: #000000;
    font-size: 2.27rem;
    font-weight: medium;
    padding-left: 20px;
  }
  .Diaries {
    max-width: 100vw;
    width: 100vw;
    min-height: 73.5vh;
    height: 73.5vh;
    max-height: 73.5vh;
  }
}
</style>
