<template>
  <div class="Diary">
    <div class="row Top">
      <div class="col Cat">
        <q-badge class="Badge flex flex-center">
          서열 #1위 주인
        </q-badge>
        <q-item class="q-px-none q-mx-none" :to="`/cats/profile/${cat.id}`">
          <q-item-section side>
            <q-avatar>
              <img :src="cat.profileUrl" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ cat.name }}</q-item-label>
            <q-item-label caption class="Caption">{{
              cat.location
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="col column Info">
        <div class="col text-weight-bold text-center">
          {{ date }}
        </div>
        <div class="col text-center">날씨 - {{ weather }}</div>
        <div class="col text-center">기분 - {{ mood }}</div>
      </div>
      <div class="col User">
        <q-badge class="Badge flex flex-center">
          입덕부정 예비집사
        </q-badge>
        <q-item class="q-px-none q-mx-none" :to="`/users/profile/${user.id}`">
          <q-item-section>
            <q-item-label class="text-weight-bold text-right">{{
              user.name
            }}</q-item-label>
            <q-item-label caption class="Caption text-right">{{
              user.id
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-avatar>
              <img :src="user.profileUrl" />
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
    <div class="row">
      <div class="col Content">{{ diaryContent }}</div>
    </div>
    <div class="row">
      <div class="col flex justify-start">
        <q-btn
          :ripple="false"
          unelevated
          icon="eva-heart-outline"
          :label="likes"
        />
      </div>
      <div class="col flex justify-end">
        <q-btn
          :ripple="false"
          unelevated
          icon-right="eva-message-square-outline"
          :label="comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Diary",
  props: {
    cat: Object,
    user: Object,
    date: String,
    weather: String,
    mood: String,
    photoUrl: String,
    diaryContent: String,
    likes: Number,
    comment: Number
  },
  data() {
    return {};
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
        font-size: 10px;
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
        font-size: 10px;
      }
    }
  }
  .Content {
    white-space: pre;
    font-family: "NanumMyeongjo-Regular";
    text-align: center;
    font-size: 1.25rem;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .Bottom {
    .Like {
    }
    .Comment {
    }
  }
}
</style>
