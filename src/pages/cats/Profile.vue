<template>
  <q-page class="column Profile">
    <div class="column" style="width: 100vw">
      <div class="flex justify-center">
        <q-avatar
          size="6rem"
          color="deep-orange"
          text-color="white"
          class="q-my-md"
          >냥</q-avatar
        >
      </div>
      <div class="text-h5 text-center text-weight-bold">시냥이{{ catId }}</div>
      <div class="flex justify-center">
        <q-badge class="Badge flex flex-center">
          서열 #1위 주인
        </q-badge>
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
export default {
  name: "PageCatsProfile",
  props: {
    catId: {
      type: String,
      default: ""
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
