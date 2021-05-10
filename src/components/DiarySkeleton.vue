<template>
  <div class="DiarySkeleton">
    <div class="row Top">
      <div class="col Cat">
        <q-skeleton type="QBadge" />
        <q-item class="q-px-none q-mx-none">
          <q-item-section side>
            <q-skeleton type="QAvatar" />
          </q-item-section>
          <q-item-section>
            <q-skeleton type="text" />
            <q-skeleton type="text" />
          </q-item-section>
        </q-item>
      </div>
      <div class="col column Info">
        <div class="col text-weight-bold text-center">
          <q-skeleton type="text" />
        </div>
        <div class="col text-center"><q-skeleton type="text" /></div>
        <div class="col text-center"><q-skeleton type="text" /></div>
      </div>
      <div class="col User">
        <q-skeleton type="QBadge" />
        <q-item class="q-px-none q-mx-none">
          <q-item-section>
            <q-skeleton type="text" />
            <q-skeleton type="text" />
          </q-item-section>
          <q-item-section side>
            <q-skeleton type="QAvatar" />
          </q-item-section>
        </q-item>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-skeleton type="rect" style="width: 100%; height: 100%;" />
      </div>
    </div>
    <div class="row">
      <div class="col Content"><q-skeleton type="text" /></div>
    </div>
    <div class="row">
      <div class="col flex justify-start">
        <q-skeleton type="QBtn" />
      </div>
      <div class="col flex justify-end">
        <q-skeleton type="QBtn" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiarySkeleton",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.DiarySkeleton {
  min-height: 73.5vh;
  height: 73.5vh;
  max-height: 73.5vh;
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
