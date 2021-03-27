<template>
  <q-page class="flex flex-center">
    <div style="width: 100vw">
      <Diary
        v-for="content in contents"
        :key="content.id"
        :cat="content.cat"
        :user="content.user"
        :date="content.date"
        :weather="content.weather"
        :mood="content.mood"
        :photoUrl="content.photoUrl"
        :diaryContent="content.diaryContent"
        :likes="content.likes"
        :comment="content.comment"
      ></Diary>
    </div>
  </q-page>
</template>

<script>
import Diary from "../components/Diary";

export default {
  name: "PageIndex",
  components: {
    Diary
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
          date: "2021년 4월 2일 뭔요일",
          weather: "☁︎",
          mood: "😎",
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
