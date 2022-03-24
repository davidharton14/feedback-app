<template>
  <q-page class="flex flex-center">
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
    <div class="flex column">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add a new activity</div> </q-card-section
        ><q-card-section>
          <q-input
            square
            filled
            v-model="activity.description"
            label="Description"
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>

          <q-input
            square
            filled
            v-model="activity.duration"
            label="Duration (min)"
          >
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="around" class="q-gutter-sm">
          <q-btn @click="add">Add</q-btn>
          <q-btn @click="cancel">Cancel</q-btn>
        </q-card-actions>
      </q-card>

      <div class="q-pa-md">
        <q-table
          :loading="loading"
          title="Activities"
          :data="data"
          :columns="columns"
          :visible-columns="visibleColumns"
          responsive
          row-key="id"
        >
          <template v-slot:top="props">
            <q-btn
              label="Refresh"
              color="primary"
              @click="onRefresh"
              class="q-mb-md"
            />
            <q-separator />
            <div class="text-h6">All activities</div>
            <q-separator />
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md "
            />
          </template>

          <template v-slot:body-cell-feedbacks="props">
            <q-td :props="props">
              <q-btn @click="selectDetails(props.row)">View</q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card class="q-dialog-plugin">
        <q-table
          title="Feedbacks"
          :data="selected.feedbacks"
          :columns="feedbackColumns"
          row-key="index"
        >
          <template v-slot:body-cell-emoticon="props">
            <q-td :props="props">
              <q-badge v-if="props.row.emoticon === 1" color="green">
                <q-icon name="sentiment_very_satisfied" />
                Satisfied
              </q-badge>
              <q-badge v-else-if="props.row.emoticon === 2" color="red">
                <q-icon name="sentiment_very_dissatisfied" />
                Not Satisfied
              </q-badge>
              <q-badge v-else-if="props.row.emoticon === 3" color="orange">
                <q-icon name="sentiment_very_satisfied" />
                Almost not satisfied
              </q-badge>
              <q-badge v-else-if="props.row.emoticon === 4" color="yellow">
                <q-icon name="sentiment_very_satisfied" />
                Less satisfied
              </q-badge>
            </q-td>
          </template>
        </q-table>

        <q-card-actions align="right">
          <q-btn color="primary" label="Exit" @click="onExitClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style></style>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      visibleColumns: [
        "description",
        "createdAt",
        "accessCode",
        "status",
        "feedbacks"
      ],
      activity: {
        duration: 0,
        description: ""
      },
      loading: true,
      selected: {},
      feedbackColumns: [
        {
          name: "emoticon",
          label: "Emoticon",
          align: "left",
          field: "emoticon",
          sortable: true
        },
        {
          name: "createdAt",
          label: "Date",
          align: "left",
          field: "createdAt",
          sortable: true
        }
      ],
      columns: [
        {
          name: "id",
          label: "ID",
          align: "left",
          field: "id",
          sortable: true
        },

        {
          name: "description",
          label: "Description",
          align: "left",
          field: "description",
          sortable: true
        },
        {
          name: "createdAt",
          label: "Date",
          align: "left",
          field: "createdAt",
          sortable: true
        },
        {
          name: "duration",
          label: "Duration (min)",
          align: "left",
          field: "duration",
          sortable: true
        },
        {
          name: "accessCode",
          label: "Access code",
          align: "left",
          field: "accessCode",
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          align: "left",
          field: "status",
          format: val => `${val ? "Active" : "Inactive"}`,
          sortable: true
        },
        {
          name: "feedbacks",
          label: "Feedbacks",
          align: "left"
        }
      ],

      data: [
        {
          id: 1,
          accessCode: "q9qdlen",
          duration: 5,
          status: 0,
          description: "WEB tech 2",
          createdAt: "2020-01-11T22:15:00.000Z",
          feedbacks: []
        },
        {
          id: 2,
          accessCode: "rr23d38",
          duration: 5,
          status: 0,
          description: "WEB tech 2",
          createdAt: "2020-01-11T23:26:47.000Z",
          feedbacks: [
            {
              emoticon: 1,
              createdAt: "2020-01-11T23:28:27.000Z"
            },
            {
              emoticon: 2,
              createdAt: "2020-01-11T23:28:34.000Z"
            }
          ]
        },
        {
          id: 3,
          accessCode: "phb2inl",
          duration: 5,
          status: 1,
          description: "WEB tech 2",
          createdAt: "2020-01-12T00:31:28.000Z",
          feedbacks: [
            {
              emoticon: 1,
              createdAt: "2020-01-12T00:33:56.000Z"
            },
            {
              emoticon: 4,
              createdAt: "2020-01-12T00:33:57.000Z"
            },
            {
              emoticon: 3,
              createdAt: "2020-01-12T00:33:58.000Z"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
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
    },
    selectDetails(item) {
      this.selected = item;
      console.log(item.feedbacks);
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onExitClick() {
      // we just need to hide dialog
      this.hide();
    },
    onRefresh() {
      this.loading = true;
      this.getData();
    },
    cancel() {
      this.activity.duration = 0;
      this.activity.description = "";
    },

    add() {
      this.loading = true;
      this.$axios
        .post("/activities", this.activity)
        .then(response => {
          this.data = response.data;
          this.$q.notify({
            color: "teal",
            message: "Data loaded",
            icon: "thumb_up"
          });

          this.onRefresh();
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
    },
    getData() {
      this.$axios
        .get("/activities")
        .then(response => {
          this.data = response.data.reverse();
          this.$q.notify({
            color: "teal",
            message: "Data loaded",
            icon: "thumb_up"
          });
          this.loading = false;
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message,
            icon: "report_problem"
          });
        });
      this.$axios;
    }
  }
};
</script>
