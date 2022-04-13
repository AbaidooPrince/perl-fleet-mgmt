<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" lg="8">
          <v-card elevation="0" outlined rounded="3">
            <v-card-title class="font-weight-bold pb-0"> User Access </v-card-title>
            <v-card-text class="pb-0">
              <v-radio-group active-class="radio-active" mandatory v-model="form.accessEnabled" column>
                <template v-slot:default>
                  <div class="d-flex justify-content-between">
                    <div class="radio-group left">
                      <v-radio :value="true">
                        <template v-slot:label>
                          <v-row class="">
                            <v-col class="pb-0" cols="12">
                              <div class="subtitle-2 text-dark">
                                Enable Access to Fleetio
                              </div>
                            </v-col>
                            <v-col class="pt-0">
                              <small>
                                This Contact will be enabled as a User, and will
                                be able to log in to your Fleetio account with
                                the access level you choose below.</small
                              >
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </div>
                    <div class="radio-group right">
                      <v-radio class="pa-0" :value="false">
                        <template v-slot:label>
                          <v-row>
                            <v-col class="pb-0" cols="12">
                              <div class="subtitle-2 text-dark">
                                No Access
                              </div>
                            </v-col>
                            <v-col class="pt-0">
                              <small>
                                This Contact will not have access to your Fleetio account and will not receive any notifications.
                                </small
                              >
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </div>
                  </div>
                </template>
              </v-radio-group>
            </v-card-text>
            <!-- User type form  -->
            <v-card-text class="pt-0 pb-0" v-if="form.accessEnabled">
            <v-divider></v-divider>
            <v-card-title class="px-0 text-dark font-weight-bold pb-0 pt-0">User Type &amp; Permissions</v-card-title>
              <v-radio-group active-class="radio-active" mandatory v-model="form.userTypeId" column>
                <template v-slot:default>
                  <div class="d-flex justify-content-between">
                    <div class="radio-group left">
                      <v-radio :value="2">
                        <template v-slot:label>
                          <v-row class="">
                            <v-col class="pb-0" cols="12">
                              <div class="subtitle-2 text-dark">
                               Regular User
                              </div>
                            </v-col>
                            <v-col class="pt-0">
                              <small>
A Regular User is assigned a Role. The Role controls the actions they can take in Fleetgh
<!-- , and the Record Sets determine which records they can view or manage -->
</small
                              >
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </div>
                    <div class="radio-group right">
                      <v-radio class="pa-0" :value="1">
                        <template v-slot:label>
                          <v-row>
                            <v-col class="pb-0" cols="12">
                              <div class="subtitle-2 text-dark">
                                Administrator
                              </div>
                            </v-col>
                            <v-col class="pt-0">
                              <small>
                                An Administrator can access Account Settings and can view, edit, and delete all records.
                                </small>
                            </v-col>
                          </v-row>
                        </template>
                      </v-radio>
                    </div>
                  </div>
                </template>
              </v-radio-group>
            </v-card-text>

            <!-- roles  -->
            <v-card-text v-if="form.userTypeId === 2 && form.accessEnabled === true" class="pt-0">
              <div>
                <label for="roles">Roles <strong>*</strong></label>
                <v-select
                outlined
                dense
                hint="Regular User Roles and their permissions are managed in Account Settings."
                persistent-hint
                :items="allRoles"
                v-model="form.role"
                item-text="name"
                item-value="id"
                >
                </v-select>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { isAdmin } from '../../services/auth'
import validation from '../../services/validation'
import users from '../../store/modules/users'
export default {
  name: 'UserAccessForm',
  props: ['form', 'role'],
  mixins: [users],
  data () {
    return {
      ...validation,
      rol: [
        { id: 1, name: 'Fleet Manager' },
        { id: 2, name: 'Operator' },
        { id: 3, name: 'Technician' },
        { id: 4, name: 'Viewer' }
      ]
    }
  },
  computed: {
    allRoles: {
      get () {
        return this.$store.state.users.allRoles
      }
    },
    isAdmin: {
      get () {
        return isAdmin()
      }
    }
  }
}
</script>

<style scoped>
.radio-active {
  background-color: rgb(224, 232, 250);
}
.radio-group {
  border: solid 0.2px rgb(211, 208, 208);
  /* padding: 0.3rem; */

}
.left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
