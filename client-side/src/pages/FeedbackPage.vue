<template>
  <q-page padding>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Feedback App</q-toolbar-title>

        <q-btn
          color="white"
          text-color="black"
          label="Log out"
          @click="onLogout"
        />
      </q-toolbar>
    </q-header>
    <!-- content -->
    <q-btn-group spread>
      <q-btn
        color="green"
        icon="sentiment_very_satisfied"
        @click="onFirstEmoticon"
      />
      <q-btn
        color="red"
        icon="sentiment_very_dissatisfied  "
        @click="onSecondEmoticon"
      />
    </q-btn-group>
    <q-btn-group spread>
      <q-btn
        color="orange"
        icon="sentiment_satisfied"
        @click="onThirdEmoticon"
      />
      <q-btn
        color="yellow"
        icon="sentiment_satisfied"
        @click="onForthEmoticon"
      />
    </q-btn-group>
  </q-page>
</template>
<style scoped>
.q-btn-group {
  height: 40vh;
}
</style>
<script>
export default {
  name: "FeedbackPage",
  data() {
    return {};
  },
  methods: {
    onFirstEmoticon() {
      this.$axios
        .post("/feedback", {
          emoticon: 1,
          activityId: this.activity.id
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    onSecondEmoticon() {
      this.$axios
        .post("/feedback", {
          emoticon: 2,
          activityId: this.activity.id
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    onThirdEmoticon() {
      this.$axios
        .post("/feedback", {
          emoticon: 3,
          activityId: this.activity.id
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    onForthEmoticon() {
      this.$axios
        .post("/feedback", {
          emoticon: 4,
          activityId: this.activity.id
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    onLogout() {
      this.$axios
        .get("/logout")
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
          this.$router.push("/");
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    }
  },
  mounted() {
    // this.$store.dispatch("promoData/initPromoData");
    // this.firstName = this.$store.getters["promoData/getFirstName"];
    // this.lastName = this.$store.getters["promoData/getLastName"];
  },

  computed: {
    activity() {
      return this.$store.getters["studentData/getActivity"];
    }
  }
};
</script>
