<template>
  <q-page class="column Profile">
    <div class="column" style="width: 100vw">
      <div class="flex justify-center">
        <q-avatar
          size="6rem"
          color="deep-orange"
          text-color="white"
          class="q-my-md"
          >{{ catTarget ? catTarget.name[0] : "" }}</q-avatar
        >
      </div>
      <div class="text-h5 text-center text-weight-bold">
        {{ catTarget ? catTarget.name : "" }}
      </div>
      <div class="flex justify-evenly q-my-md">
        <q-btn unelevated :ripple="false" class="FollowButton" label="모시기" />
      </div>
      <div class="flex justify-evenly wrap q-mx-sm">
        <q-img
          v-for="diary in diaries"
          src="https://placeimg.com/500/300/nature"
          width="45%"
          class="q-mb-md"
          :ratio="1"
          :key="diary.id"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PageCatsProfile",
  props: {
    catId: {
      type: String,
      default: "-1"
    }
  },
  computed: {
    ...mapGetters({
      catTarget: "cat/target"
    })
  },
  async mounted() {
    try {
      await this.$store.dispatch("cat/getTarget", this.catId);
    } catch (e) {
      console.error(e);
      this.$q
        .dialog({
          title: "😭고양이 조회 실패",
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
      diaries: [
        {
          id: 0,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 1,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 2,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 3,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 4,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 5,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 6,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 7,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 8,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 9,
          photoUrl: "https://placeimg.com/500/500/animals"
        },
        {
          id: 10,
          photoUrl: "https://placeimg.com/500/500/animals"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.Profile {
  .Avatar {
    font-size: 12px;
  }
  .Badge {
    text-align: center;
    font-weight: bold;
    background: linear-gradient(#ff00d6, #ff4d00);
    border-radius: 6px;
  }
  .FollowButton {
    width: 90%;
    height: 65%;
    border: 2px solid #000000;
    border-radius: 6px;
    font-weight: bold;
    background: #000000;
    color: #ffffff;
  }
}
</style>
