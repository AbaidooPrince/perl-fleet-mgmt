<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="12" class="pa-0">
          <v-card class="pa-4">
            <v-card-title class="pt-0"
              >New Vehicle Assignment
              <div class="close ml-auto">
                <slot name="close" />
              </div>
            </v-card-title>
            <v-divider class="mt-0"></v-divider>
            <v-card-text>
              <v-form ref="assignmentForm">
                <div>
                  <label>Vehicle <strong class="text--error">*</strong></label>
                  <v-autocomplete
                    v-model="form.vehicleId"
                    :items="allVehicles"
                    item-text="name"
                    item-value="id"
                    dense
                    outlined
                  >
                    <template v-slot:selection="{ item }">
                      <span>
                        <v-chip small>
                          {{ item.name }}
                        </v-chip>
                      </span>
                    </template>
                    <template v-slot:item="{ item, attrs, on }">
                      <vehicle-item
                        v-on="on"
                        v-bind="attrs"
                        :photo="item.photo"
                        :vehicleGroupId="item.VehicleClassification.groupId"
                        :vehicleStatusId="item.VehicleClassification.vehicleStatusId"
                        :name="item.name"
                      ></vehicle-item>
                      <!-- <v-list-item two-line dense v-on="on" v-bind="attrs">
                        <v-list-item-avatar>
                          <v-img :src="item.photo ? item.photo : defaultVehicle"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                        <v-list-item-title>
                          {{ item.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span>
                            {{item.VehicleClassification.vehicleStatusId}}
                          </span>
                          <span v-if="item.VehicleClassification.groupId">.
                            {{ ' '+ item.VehicleClassification.groupId }}
                          </span>
                        </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item> -->
                    </template>
                  </v-autocomplete>
                </div>
                <div>
                  <label>Operator <strong class="text--error">*</strong></label>
                  <v-autocomplete
                    v-model="form.operatorAccountId"
                    :items="allOperators"
                    small-chips
                    item-text="name"
                    item-value="id"
                    dense
                    outlined
                  >
                    <template v-slot:selection="{ item }">
                      <span>
                        <v-chip small color="primary lighten-3">
                          {{ item.firstName ? item.firstName : "" }}
                          {{ item.lastName ? item.lastName : "" }}
                        </v-chip>
                      </span>
                    </template>
                    <template v-slot:item="{ item, attrs, on }">
                      <v-list-item dense two-line v-on="on" v-bind="attrs">
                        <v-list-item-avatar>
                          <v-img
                            :src="item.profileImage ? item.profileImage : defaultProfile"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="py-0">
                          <v-list-item-title class="py-2">
                            {{ item.firstName ? item.firstName : "" }}
                            {{ item.middleName ? item.middleName : "" }}
                            {{ item.lastName ? item.lastName : "" }}
                            <span class="">
                              <v-badge
                                style="size: 10px"
                                class="small"
                                offset-x="-2"
                                color="grey ligten-2"
                                :value="item.employee"
                                content="Employee"
                              ></v-badge>
                              <v-badge
                                class="small"
                                offset-x="-80"
                                color="grey ligten-2"
                                :value="item.operator"
                                content="Operator"
                              ></v-badge>
                            </span>
                          </v-list-item-title>
                          <v-list-item-subtitle class="d-inline">
                            {{ item.email ? item.email : "" }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-autocomplete>
                </div>
                <div>
              <label>Assignment Task</label>
              <v-text-field
              v-model="form.assignmentTask"
              dense
              outlined
              ></v-text-field>
              <!-- <v-select
              v-model="form.taskId"
              :items="groups"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select> -->
                </div>
                <v-divider class="mt-0"></v-divider>
                <label>Start Date/Time</label>
                <div class="d-flex justify-content-between">
                  <div>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          clearable
                          v-model="form.startingDate"
                          prepend-inner-icon="mdi-calendar"
                          hint="(Ex: 2022-03-19 03:37 am)"
                          persistent-hint
                          readonly
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="form.startingDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(form.startingDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div class="justify-end">
                    <v-menu
                      ref="startTimeMenu"
                      v-model="startTimeMenu"
                      :close-on-content-click="false"
                      :return-value.sync="form.startTime"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          clearable
                          v-model="form.startTime"
                          prepend-inner-icon="mdi-clock-outline"
                          :disabled="form.startingDate === null"
                          readonly
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-model="form.startTime" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="startTimeMenu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.startTimeMenu.save(form.startTime)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                  </div>
                  <div></div>
                </div>
                <label>End Date/Time</label>
                <div class="d-flex justify-content-between">
                  <div>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="form.endingDate"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          clearable
                          v-model="form.endingDate"
                          prepend-inner-icon="mdi-calendar"
                          hint="(Ex: 2022-03-19 03:37 am)"
                          persistent-hint
                          :disabled="form.startingDate === null"
                          readonly
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :min="minEndDate"
                        v-model="form.endingDate"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu2.save(form.endingDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div class="justify-end">
                    <v-menu
                      ref="endTimeMenu"
                      v-model="endTimeMenu"
                      :close-on-content-click="false"
                      :return-value.sync="form.endTime"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          clearable
                          v-model="form.endTime"
                          prepend-inner-icon="mdi-clock-outline"
                          readonly
                          outlined
                          :disabled="form.endingDate === null"
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-model="form.endTime" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="endTimeMenu = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.endTimeMenu.save(form.endTime)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                  </div>
                  <div></div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-around">
                  <div class="">
                    <v-avatar
                      color="grey"
                      class="hiddden-sm-and-down white--text"
                      size="40"
                    >
                      U
                    </v-avatar>
                  </div>
                  <div class="w-75">
                    <v-textarea
                      placeholder="Add optional comments..."
                      outlined
                      dense
                      rows="2"
                      auto-grow
                      v-model="form.comment"
                    >
                    </v-textarea>
                  </div>
                </div>
              </v-form>
            </v-card-text>
            <v-divider class="mt-0"></v-divider>
            <v-card-actions>
              <slot name="action" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import common from '../../mixins/common'
import vehicles from '../../mixins/vehicles'
import validation from '../../services/validation'
import VehicleItem from '../common/VehicleItem.vue'
export default {
  components: { VehicleItem },
  name: 'VehicleAssingmentForms',
  props: ['form'],
  mixins: [common, vehicles],
  data () {
    return {
      menu2: false,
      menu: false,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      startDateMenu: false,
      endDateMenu: false,
      endTimeMenu: false,
      startTimeMenu: false,
      ...validation
    }
  },
  computed: {
    minEndDate: {
      get () {
        return this.form.startingDate || this.form.startDate
      }
    },
    allVehicles: {
      get () {
        return this.$store.state.vehicles.vehicles
      }
    }
  }
}
</script>

<style></style>
