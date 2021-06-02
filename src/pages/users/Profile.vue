<template>
  <q-page class="column flex Profile">
    <div class="flex justify-center">
      <q-dialog
        v-model="uploader"
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="my-card">
          <q-card-section class="row items-center">
            <q-btn
              icon="eva-close"
              flat
              round
              dense
              v-close-popup
              @click="closeDialog"
            />
          </q-card-section>
          <q-stepper
            ref="stepper"
            v-model="step"
            vertical
            color="black"
            active-color="pink-13"
            done-color="black"
            animated
            keep-alive
          >
            <q-step
              :name="1"
              title="프로필 사진 고르기"
              icon="eva-image-outline"
              :done="step > 1"
            >
              Drag, pinch and zoom으로 올라갈 사진을 간단하게 바꿔보세요!

              <croppa
                v-model="myCroppa"
                placeholder="프로필 사진을 선택해주세요"
                placeholder-color="#000"
                canvas-color="transparent"
                :show-loading="true"
              ></croppa>

              <q-stepper-navigation>
                <q-btn
                  unelevated
                  @click="selectFileAndUploadProfilePhoto"
                  color="black"
                  label="다음"
                  :disable="myCroppa.chosenFile === null"
                />
              </q-stepper-navigation>
            </q-step>
            <q-step
              :name="2"
              title="업로드 완료!"
              icon="eva-checkmark-circle-outline"
            >
              집사의 프로필 사진이 바뀌었습니다. 고양이와 다른 집사들에게 좋은
              인상을 남길 수 있을 거에요!
              <q-stepper-navigation>
                <q-btn
                  unelevated
                  @click="closeDialogWhenComplete"
                  color="black"
                  label="완료"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card>
      </q-dialog>
      <q-avatar
        v-if="userTarget.profile_img === null"
        size="6rem"
        color="purple"
        text-color="white"
        class="q-my-md"
      >
        {{ userTarget.nickname ? userTarget.nickname[0] : "" }}
        <q-badge
          v-if="authUserId === parseInt(userId)"
          floating
          rounded
          color="grey"
          @click="uploader = true"
        >
          <q-icon
            color="white"
            name="eva-edit-outline"
            style="font-size: 1.3rem"
          ></q-icon>
        </q-badge>
      </q-avatar>
      <q-avatar v-else size="6rem" class="q-my-md">
        <img :src="userTarget.profile_img" />
        <q-badge
          v-if="authUserId === parseInt(userId)"
          floating
          rounded
          color="grey"
          @click="uploader = true"
        >
          <q-icon
            color="white"
            name="eva-edit-outline"
            style="font-size: 1.3rem"
          ></q-icon>
        </q-badge>
      </q-avatar>
    </div>
    <div class="text-h5 text-center text-weight-bold">
      {{ userTarget.nickname ? userTarget.nickname : "" }}
    </div>
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
    <div class="fit row wrap justify-between" style="margin-top: 20px">
      <q-img
        v-for="(diary, idx) in diaries"
        :src="diary.photoURL"
        width="47.5%"
        class="q-mb-md"
        :ratio="1"
        :key="diary.id"
        @click="selectDiary(diary, idx)"
      />
    </div>
    <q-space></q-space>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Diary from "../../components/Diary";
import "vue-croppa/dist/vue-croppa.css";

export default {
  name: "PageUsersProfile",
  props: {
    userId: {
      type: String,
      default: "-1"
    }
  },
  components: {
    Diary
  },
  computed: {
    ...mapGetters({
      authUserId: "auth/userId",
      userTarget: "user/target",
      diaries: "diary/list"
    })
  },
  async mounted() {
    await this.initProfile();
  },
  data() {
    return {
      showSelectedDiary: false,
      uploader: false,
      myCroppa: {},
      step: 1,
      loadingUpload: false,
      preventUpload: false,
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
    async initProfile() {
      try {
        await this.$store.dispatch("user/getTarget", this.userId);
        await this.refreshUserDiaryList();
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭집사 조회 실패",
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
    async selectFileAndUploadProfilePhoto() {
      const blob = await this.myCroppa.promisedBlob("image/png", 0.8);
      let file = new File(
        [blob],
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 18) + ".png",
        { type: "image/png" }
      );
      this.$store.commit("auth/assignProfileForm", { photo: file });
      try {
        this.loadingUpload = true;
        await this.$store.dispatch("auth/updateProfileImage");
        this.step = 2;
      } catch (e) {
        console.error(e);
        this.$q
          .dialog({
            title: "😭프로필 사진 업로드 실패",
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
    },
    closeDialog() {
      this.uploader = false;
      this.step = 1;
    },
    async closeDialogWhenComplete() {
      await this.initProfile();
      this.closeDialog();
    },
    async refreshUserDiaryList() {
      this.loaded = false;
      try {
        await this.$store.dispatch("diary/getListSpecificUser", {
          userId: this.userId
        });
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
    }
  }
};
</script>

<style lang="scss">
.Profile {
  margin-left: 20px;
  margin-right: 20px;
  .Avatar {
    font-size: 12px;
  }
  .Badge {
    text-align: center;
    font-weight: bold;
    background: black;
    border-radius: 6px;
  }
  .ReportButton {
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
