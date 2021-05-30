<template>
  <div class="column DiarySkeleton">
    <div class="col Top flex justify-between">
      <div class="Info" style=" width: 49%;">
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
      <div class="User" style="width: 49%;">
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
    <div class="col-4" style="width: 100%; height: 100vmin;">
      <q-skeleton type="rect" style="width: 100%; height: 100%" />
    </div>
    <div class="col-2 Content" style="width: 100%; height: 30vmin;">
      <q-skeleton type="rect" style="width: 100%; height: 100%" />
    </div>
    <div class="col flex justify-between">
      <q-skeleton type="QBtn" />
      <q-skeleton type="QBtn" />
      <q-skeleton type="QBtn" />
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
  min-height: 100%;
  height: 100%;
  max-height: 100%;
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
    padding-top: 2vw;
    padding-bottom: 2vw;
  }
  .Bottom {
    .Like {
    }
    .Comment {
    }
  }
}
</style>
