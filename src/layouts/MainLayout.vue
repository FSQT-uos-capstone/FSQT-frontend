<template>
  <q-layout class="MainLayout" view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog
      v-model="uploader"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="my-card">
        <q-card-section class="row items-center">
          <q-btn icon="eva-close" flat round dense v-close-popup />
        </q-card-section>
        <q-stepper
          ref="stepper"
          v-model="step"
          vertical
          color="black"
          active-color="pink-13"
          animated
          keep-alive
        >
          <q-step
            :name="1"
            title="고양이 사진 고르기"
            icon="eva-image-outline"
            :done="step > 1"
            color="black"
          >
            <croppa
              v-model="myCroppa"
              placeholder="고잉이 사진을 선택해주세요"
              placeholder-color="#000"
              canvas-color="transparent"
              :show-loading="true"
            ></croppa>

            <q-stepper-navigation>
              <q-btn
                unelevated
                @click="selectFile"
                color="black"
                label="다음"
                :disable="myCroppa.chosenFile === null"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            title="사진 속의 고양이 고르기"
            icon="eva-color-picker-outline"
            :done="step > 2"
            color="black"
          >
            <q-select
              @input="setDiaryFormCat"
              v-bind:value="diaryForm.cat"
              :options="catListSelect"
              stack-label
              color="black"
              behavior="menu"
            >
            </q-select>
            <q-stepper-navigation>
              <q-btn
                outline
                class="q-mr-xs"
                @click="step = 1"
                color="black"
                label="이전"
              />
              <q-btn
                unelevated
                @click="uploadCatPhoto"
                color="black"
                label="업로드"
                :loading="loadingUpload"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="3"
            title="업로드 완료!"
            icon="eva-checkmark-circle-outline"
          >
            집사가 찍어준 사진을 고양이가 보고 일기를 쓰는데 시간이 걸립니다.
            고양이가 일기를 올리면 알려줄게요!

            <q-stepper-navigation>
              <q-btn
                unelevated
                @click="
                  uploader = false;
                  step = 1;
                "
                color="black"
                label="완료"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card>
    </q-dialog>
    <q-footer class="Footer row">
      <q-toolbar class="Toolbar justify-around">
        <q-btn
          to="/"
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-home-outline"
        />
        <q-btn
          to="/search"
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-search-outline"
        />
        <q-btn
          @click="uploader = true"
          unelevated
          rounded
          :ripple="false"
          icon="eva-plus-outline"
          class="col-2 PostButton"
        />
        <q-btn
          to="/cats"
          flat
          round
          :ripple="false"
          color="black"
          icon="img:icons/cil-cat.svg"
        />
        <q-btn
          :to="`/users/profile/${authUserId}`"
          flat
          round
          :ripple="false"
          color="black"
          icon="eva-person-outline"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import "vue-croppa/dist/vue-croppa.css";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters({
      authUserId: "auth/userId",
      catListSelect: "cat/listSelect",
      diaryForm: "diary/form"
    })
  },
  async mounted() {
    try {
      await this.$store.dispatch("cat/getList");
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
      leftDrawerOpen: false,
      uploader: false,
      myCroppa: {},
      step: 1,
      loadingCats: false,
      loadingUpload: false
    };
  },
  methods: {
    setDiaryFormCat(payload) {
      this.$store.commit("diary/setFormCat", payload);
    },
    async selectFile() {
      const blob = await this.myCroppa.promisedBlob("image/png", 0.8);
      let file = new File(
        [blob],
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 18) + ".png",
        { type: "image/png" }
      );
      this.$store.commit("diary/assignForm", { photo: file });
      this.step = 2;
    },
    async uploadCatPhoto() {
      try {
        this.loadingUpload = true;
        await this.$store.dispatch("diary/createDiary");
        this.step = 3;
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭고양이 사진 업로드 실패",
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
        this.loadingUpload = false;
      }
    }
  }
};
</script>

<style lang="scss">
.croppa-container {
  background: transparent;
  width: 75vw;
  height: 75vw;
  canvas {
    width: 75vw !important;
    height: 75vw !important;
  }
}
.MainLayout {
  .Footer {
    background-color: #ffffff;
    color: #000000;
    height: 8vh;
    border-top: 1px solid #cccccc;
  }
  .Toolbar {
    height: 100%;
    .PostButton {
      background: linear-gradient(#ff00d6, #ff4d00);
      color: #ffffff;
    }
  }
}
</style>
