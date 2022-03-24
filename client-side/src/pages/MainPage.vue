<template>
  <q-page class="flex flex-center column">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Feedback App</q-toolbar-title>

        <q-btn color="white" text-color="black" label="Login" @click="authOpen = true" />
      </q-toolbar>
    </q-header>
    <q-dialog v-model="authOpen" persistent transition-show="scale" transition-hide="scale">
      <q-card v-if="!isRegister">
        <q-card-section class="row items-center">
          <div class="text-h6">Professor Auth</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div class="q-pa-md">
          <q-card-section class="q-gutter-md" style="max-width: 300px">
            <q-input filled v-model="login.email" label="Email" />

            <q-input filled type="password" v-model="login.password" label="Password" />
          </q-card-section>
        </div>
        <q-card-actions class="bg-white text-teal flex flex-center">
          <q-btn color="primary" label="LOGIN" @click="onLogin" />
          <q-btn label="REGISTER" @click="isRegister = true" />
        </q-card-actions>
      </q-card>
      <q-card v-else>
        <q-card-section class="row items-center">
          <div class="text-h6">Register</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div class="q-pa-md">
          <q-card-section class="q-gutter-md">
            <q-input filled v-model="register.firstName" label="First Name" />
            <q-input filled v-model="register.lastName" label="Last Name" />
            <q-input filled v-model="register.email" label="Email" />

            <q-input filled type="password" v-model="register.password" label="Password" />
          </q-card-section>
        </div>
        <q-card-actions class="bg-white text-teal flex flex-center">
          <q-btn color="primary" label="REGISTER" @click="onRegister" />
          <q-btn label="BACK" @click="isRegister = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="container">
      <q-input
        bg-color="primary"
        class="access"
        rounded
        filled
        v-model="accessCode"
        label="Access code"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
      <q-input square filled v-model="firstName" label="First name">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>

      <q-input square filled v-model="lastName" label="Last name">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>

      <q-input square filled v-model="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
      <q-btn
        class="enter"
        push
        color="primary"
        style="width:100%"
        label="Enter"
        icon="card_giftcard"
        @click="onEnter"
      />
    </div>
  </q-page>
</template>

<style>
.access .q-field {
  color: white;
}
.container {
  width: 80%;
}
.enter.q-btn {
  width: 100%;
  margin-top: 20px;
}

.q-input {
  width: 100%;
}
</style>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      firstName: "",
      lastName: "",
      accessCode: "",
      email: "",
      authOpen: false,
      login: {
        email: "",
        password: ""
      },
      register: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      isRegister: false
    };
  },
  methods: {
    onEnter() {
      this.$axios
        .post("/student", {
          firstName: this.firstName,
          lastName: this.lastName,
          accessCode: this.accessCode,
          email: this.email
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });

          this.$store.dispatch(
            "studentData/setActivity",
            response.data.activity
          );

          this.$router.push("/feedback");
        })
        .catch(error => {
          switch (error.response.status) {
            case 400: {
              error.response.data.errors.forEach(element => {
                this.$q.notify({
                  color: "negative",
                  message: element,
                  icon: "report_problem"
                });
              });
              break;
            }
            default: {
              this.$q.notify({
                color: "negative",
                message: error.response.data.message,
                icon: "report_problem"
              });
            }
          }
        });
    },

    onLogin() {
      this.$axios
        .post("/login", {
          email: this.login.email,
          password: this.login.password
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });
          console.log(response.data);
          // this.$store.dispatch(
          //   "studentData/setActivity",
          //   response.data.activity
          // );

          this.$router.push("/professor");
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    onRegister() {
      this.$axios
        .post("/professors", {
          email: this.register.email,
          password: this.register.password,
          firstName: this.register.firstName,
          lastName: this.register.lastName
        })
        .then(response => {
          this.$q.notify({
            color: "teal",
            message: response.data.message,
            icon: "thumb_up"
          });

          // this.$store.dispatch(
          //   "studentData/setActivity",
          //   response.data.activity
          // );

          this.isRegister = false;
        })
        .catch(error => {
          switch (error.response.status) {
            case 400: {
              error.response.data.errors.forEach(element => {
                this.$q.notify({
                  color: "negative",
                  message: element,
                  icon: "report_problem"
                });
              });
              break;
            }
            default: {
              this.$q.notify({
                color: "negative",
                message: error.response.data.message,
                icon: "report_problem"
              });
            }
          }
        });
    }
  },
  mounted() {
    // this.$store.dispatch("promoData/initPromoData");
    // this.firstName = this.$store.getters["promoData/getFirstName"];
    // this.lastName = this.$store.getters["promoData/getLastName"];
  },

  computed: {
    level() {
      return (this.$store.getters["promoData/getLevel"] / 5) * 100;
    },
    status() {
      return this.$store.getters["promoData/getStatus"];
    },
    loaded() {
      return this.$store.getters["promoData/getLoaded"];
    },
    fullName() {
      return this.firstName + " " + this.lastName;
    }
  }
};
</script>
