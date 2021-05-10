<template>
  <q-page class="column flex PageDiscoverIndex">
    <q-space />
    <div class="row Title">
      고양이 일기장
    </div>
    <q-space />
    <div class="row Content">
      <carousel
        :paginationEnabled="false"
        :perPage="1"
        :scrollPerPage="true"
        style="max-width: 100vw"
      >
        <slide
          v-for="content in contents"
          :key="content.id"
          style="max-width: 100vw; width: 100vw;"
        >
          <Diary
            :cat="content.cat"
            :user="content.user"
            :date="content.date"
            :dayOfTheWeek="content.dayOfTheWeek"
            :photoUrl="content.photoUrl"
            :diaryContent="content.diaryContent"
            :likes="content.likes"
            :comment="content.comment"
          ></Diary>
        </slide>
      </carousel>
    </div>
  </q-page>
</template>

<script>
import Diary from "../components/Diary";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "PageIndex",
  components: {
    Diary,
    Carousel,
    Slide
  },
  data() {
    return {
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
  .Content {
    max-width: 100vw;
    width: 100vw;
  }
}
</style>
