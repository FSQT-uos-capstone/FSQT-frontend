<template>
  <div class="Diary">
    <div class="row Top">
      <div class="col Info flex justify-left align-center">
        <q-item class="q-px-none q-mx-none">
          <q-item-section side>
            <q-avatar
              color="grey"
              text-color="white"
              icon="eva-calendar-outline"
            >
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-left">
            <q-item-label class="text-weight-bold">2021년 4월 2일</q-item-label>
            <q-item-label class="text-weight-bold">수요일</q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="col User">
        <q-item class="q-px-none q-mx-none" :to="`/users/profile/${user.id}`">
          <q-item-section>
            <q-item-label class="text-weight-bold text-right">
              {{ profile.nickname }}
            </q-item-label>
            <q-item-label class="text-weight-bold Caption text-right">{{
              user.email
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-avatar
              v-if="!profile.profile_img_url"
              color="grey"
              text-color="white"
            >
              {{ profile.nickname[0] }}
              <!--<img :src="cat.profileUrl" />-->
            </q-avatar>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-img :src="photoUrl" :ratio="1" style="width: 100%" />
      </div>
    </div>
    <div class="flex justify-center">
      <div class="Content">
        {{ diaryContent ? diaryContent.replace(".", "\n") : "" }}
      </div>
    </div>
    <div class="row">
      <div class="col flex justify-start">
        <q-btn
          :ripple="false"
          flat
          unelevated
          :icon="
            emotions.find(x => x.user_id === authUserId && x.emotion === 1)
              ? 'eva-heart'
              : 'eva-heart-outline'
          "
          :color="
            emotions.find(x => x.user_id === authUserId && x.emotion === 1)
              ? 'red'
              : 'black'
          "
          :label="emotions.filter(x => x.emotion === 1).length"
          @click="setEmotion(id, 'like')"
        />
      </div>
      <div class="col flex justify-center">
        <q-btn
          :ripple="false"
          flat
          unelevated
          :icon="
            emotions.find(x => x.user_id === authUserId && x.emotion === 2)
              ? 'eva-gift'
              : 'eva-gift-outline'
          "
          :color="
            emotions.find(x => x.user_id === authUserId && x.emotion === 2)
              ? 'yellow'
              : 'black'
          "
          :label="emotions.filter(x => x.emotion === 2).length"
          @click="setEmotion(id, 'happy')"
        />
      </div>
      <div class="col flex justify-end">
        <q-btn
          :ripple="false"
          flat
          unelevated
          :icon="
            emotions.find(x => x.user_id === authUserId && x.emotion === 3)
              ? 'eva-umbrella'
              : 'eva-umbrella-outline'
          "
          :color="
            emotions.find(x => x.user_id === authUserId && x.emotion === 3)
              ? 'blue'
              : 'black'
          "
          :label="emotions.filter(x => x.emotion === 3).length"
          @click="setEmotion(id, 'sad')"
        />
      </div>
      <!--
      <div class="col flex justify-end">
        <q-btn
          :ripple="false"
          unelevated
          icon-right="eva-message-square-outline"
          :label="comment"
        />
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Diary",
  props: {
    id: Number,
    cat: Object,
    user: Object,
    profile: Object,
    date: String,
    dayOfTheWeek: String,
    photoUrl: String,
    diaryContent: String,
    emotions: Array
  },
  computed: {
    ...mapGetters({
      authUserId: "auth/userId"
    })
  },
  data() {
    return {};
  },
  methods: {
    async setEmotion(diaryId, status) {
      try {
        await this.$store.dispatch("diary/setEmotionOnDiary", {
          diaryId: diaryId,
          status: status,
          userId: this.$store.getters["auth/userId"]
        });
      } catch (e) {
        console.error(e);
        this.$q.notify({
          type: "negative",
          message: `현재 일기장에 감정 표현을 할 수 없습니다.`
        });
      }
    }
  }
};
</script>

<style lang="scss">
.Diary {
  .Top {
    .Cat {
      font-size: 12px;
      .Badge {
        width: 90%;
        margin-right: 10%;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(#ff00d6, #ff4d00);
        border-radius: 6px;
      }
      .Caption {
        color: grey;
      }
    }
    .Info {
      font-size: 12px;
    }
    .User {
      font-size: 12px;
      .Badge {
        width: 90%;
        margin-left: 10%;
        text-align: center;
        font-weight: bold;
        background: black;
        border-radius: 6px;
      }
      .Caption {
        color: grey;
      }
    }
  }
  .Content {
    font-family: "NanumMyeongjo-Regular";
    text-align: center;
    font-size: 1.25rem;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: scroll;
    white-space: pre-wrap;
  }
}
</style>
