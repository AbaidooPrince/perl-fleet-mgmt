<template>
  <div>
    <v-container>
      <v-row justify="center" align="center" class="mt-4">
        <v-col cols="12" md="8">
          <h3 class="font-weight-bold">User Profile</h3>
        </v-col>
        <v-col cols="12" md="8">
          <v-card class="pa-4">
            <v-card-text class="">
              <v-form>
              <v-row>
                <v-col cols="12" md="3" class=" text-right">
                  <label>Photo</label>
                </v-col>
                <v-col cols="12" md="9" class="">
                  <v-hover v-slot="{ hover }">
                  <v-badge :color="hover ? 'primary' : 'white'"  bordered avatar offset-y="60" offset-x="10">
                    <template v-slot:badge>
                    <v-icon :color="hover ? 'white' : 'primary'" size="20" class="pt-2">mdi-plus</v-icon>
                    </template>
                    <v-avatar size="80" :color="hover ? 'primary' : 'grey lighten-2'">
                  <v-avatar size="75" color="grey">
                    <v-img :src="defaultProfile"></v-img>
                  </v-avatar>
                    </v-avatar>
                  </v-badge>
                  </v-hover>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="text-right pb-0 pt-0">
                  <label>First Name <strong>*</strong></label>
                </v-col>
                <v-col cols="12" md="9" class="pb-0 pt-0">
                  <v-text-field outlined dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="pb-0 text-right pt-0">
                  <label>Last Name</label>
                </v-col>
                <v-col cols="12" md="9" class="pb-0 pt-0">
                  <v-text-field outlined dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="pb-0 text-right pt-0">
                  <label>Email</label>
                </v-col>
                <v-col cols="12" md="9" class="pb-0 pt-0">
                  <v-text-field outlined dense
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-flex justify-content-between">
              <v-btn plain color="primary">Cancel</v-btn>
              <v-btn depressed color="primary">Save</v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      defaultProfile: require('@/assets/profile.svg')
    }
  }

}
</script>

<style>

</style>
