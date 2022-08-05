<template>
  <div>
    <new-item-page-layout
    listLink="IssuesList"
    listPage="Issue"
    :crumb="editMode ? 'Issue' : ''"
    :title="editMode ? 'Edit Issue' : 'Add Issue'"
    :processing="editMode ? updating: saving"
    @cancel-action="cancelAction"
    @add-action="saveOption"
    >
    <!-- <v-container> -->
    <template #formView>
      <v-container>
        <v-form  ref="servce_form" @submit.prevent="saveOption">
        <v-row justify="center" align="center">
          <v-col cols="8">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Details
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12" class="pb-0">
                <div>
                  <label>Asset <strong class="text--error">*</strong></label>
                  <v-autocomplete
                    v-model="issueForm.vehicleId"
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
                    </template>
                  </v-autocomplete>
                </div>
                <div>
              <label>Reported Date<strong class="text--error">*</strong></label>
                  <v-row>
                    <v-col cols="12" md="4" lg="4" sm="12">
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
                          v-model="reportedDate"
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
                      <v-date-picker v-model="endingDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(endingDate)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" sm="12">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="endingTime"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          clearable
                          v-model="endingTime"
                          prepend-inner-icon="mdi-clock-outline"
                          readonly
                          outlined
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-model="endingTime" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu2.save(endingTime)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                    </v-col>
                  </v-row>
                </div>
              <div>
              <label>Summary<strong class="text--error">*</strong></label>
              <v-text-field
              v-model="issueForm.odometer"
              hint="Brief overview of this issue"
              dense
              outlined
              persistent-hint
              >
              </v-text-field>
                </div>
                <div>
              <label>Description</label>
                <div>
                  <v-textarea
                  v-model="issueForm.comments"
                  row="3"
                  dense
                  outlined
                  placeholder="Add comments here..."
                  ></v-textarea>
                </div>
                </div>
                <div>
              <label>Primary Meter<strong class="text--error">*</strong></label>
              <v-text-field
              v-model="issueForm.vendor"
              dense
              :rules="[mustContainNumber()]"
              outlined
              persistent-hint
              >
              </v-text-field>
                </div>
                <div>
              <label>Reference</label>
              <v-text-field
              v-model="issueForm.reference"
              dense
              outlined
              hint="Optional (e.g. invoice number, etc.)"
              persistent-hint
              >
              </v-text-field>
                </div>
                <div>
              <label>Labels</label>
              <v-text-field
              v-model="issueForm.vendor"
              dense
              outlined
              persistent-hint
              >
              </v-text-field>
                </div>
                <div>
                  <label>Reported By <strong class="text--error">*</strong></label>
                  <v-autocomplete
                    v-model="issueForm.reportedBy"
                    :items="allUsers"
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
                  </v-autocomplete></div>
                <div>
                  <label>Assigned to</label>
                  <v-autocomplete
                    v-model="issueForm.reportedBy"
                    :items="allUsers"
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
          </v-col>
          </v-row>
          </v-card-text>
          </v-card>
          </v-col>
          <v-col cols="8">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
   Service Task
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12" class="pb-0">
                <div>
                  <label>Issues</label>
                  <v-autocomplete
                    item-text="name"
                    item-value="id"
                    return-object
                    multiple
                    v-model="issueForm.issues"
                    :items="issues"
                    dense
                    outlined
                  >
                    <template v-slot:selection="{ item }">
                      <span>
                        <v-chip small>
                          {{ item }}
                        </v-chip>
                      </span>
                    </template>
                    <!-- <template v-slot:item="{ item, attrs, on }">
                      <vehicle-item
                        v-on="on"
                        v-bind="attrs"
                        :photo="item.photo"
                        :vehicleGroupId="item.VehicleClassification.groupId"
                        :vehicleStatusId="item.VehicleClassification.vehicleStatusId"
                        :name="item.name"
                      ></vehicle-item>
                    </template> -->
                  </v-autocomplete>
                </div>
                <div>
                  <label>Line Items</label>
                <v-divider></v-divider>
                <div v-if="issueForm.issues.length === 0" class="d-flex align-items-center justify-content-center no-item-row">
                  <div class="">
                  <p class="mb-0">No items added</p>
                  </div>
                </div>
                <div v-else>
                <v-data-table
                  :headers="headers"
                  :items="issueForm.issues"
                  hide-default-footer
                  class="elevation-1"
                >
                <template v-slot:[`item.labor`]="{item, index}">
                  <v-text-field
                  type="number"
                  dense
                  outlined
                  v-model="issueForm.issues[index].labor"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.parts`]="{item, index}">
                  <v-text-field
                  type="number"
                  dense
                  outlined
                  v-model="issueForm.issues[index].parts"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.id`]="{item, index}">
                  <v-icon @click="removeIssue(index)">mdi-facebook</v-icon>
                </template>
                <template v-slot:[`item.subtotal`]="{item}">
                  {{ item.labor + item.parts }}
                </template>
                </v-data-table>
                </div>
                </div>
                <div>
                  <v-row>
                    <v-col cols="12" md="6">
                      <label class="font-weight-bold">General Notes</label>
                      <div>
                        <v-textarea
                        outlined
                        placeholder="Add notes or additional details">
                        </v-textarea>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <label class="font-weight-bold">Cost Summary</label>
                      <div class="d-flex justify-space-between py-3">
                        <div>Labor</div>
                        <div>$Labor</div>
                      </div>
                      <div class="d-flex justify-space-between pb-3">
                        <div>Parts</div>
                        <div>$Labor</div>
                      </div>
                      <div class="d-flex justify-space-between pb-3">
                        <div>Subtotal</div>
                        <div>$Labor</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{'Tax(%)'}}</div>
                        <div class="w-25 align-center">
                          <v-text-field
                           type="number"
                           outlined
                           dense
                          ></v-text-field></div>
                        <div>Labor</div>
                      </div>
                      <div class="d-flex justify-space-between">
                        <div>{{'Discout(%)'}}</div>
                        <div class="w-25 align-center">
                          <v-text-field
                           type="number"
                           outlined
                           dense
                          ></v-text-field>
                        </div>
                        <div>Labor</div>
                      </div>
                    </v-col>
                  </v-row>
                </div>

          </v-col>
          </v-row>
          </v-card-text>
          </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-card elevation="0" outlined rounded="3" min-height="150">
              <v-card-text>
                <div class="d-flex justify-space-between mb-2">
                  <label class="title font-weight-bold text-dark mb-0">
                Images <span v-if="uploading">...
                  <!-- <v-progress-circular small color="primary" :loading="uploading" intermediate>
                  </v-progress-circular> -->
                  </span></label>
                  <v-btn color="primary" small link text
                  @click="triggerUpload('img')">Add image</v-btn>
                </div>
                <div class="" style="max-width: 100%; overflow-x: auto;">
                  <!-- <v-data-table
                  :header="filesTableHeader"
                  :items="servicePhotos"
                  >
                  <template v-slot:[`item.name`]="{ item }"> -->
                    <div class="d-flex justify-space-even">
                      <div v-for="(photo, p) in servicePhotos" :key="p+'photos'" >
                    <span>
                      <v-avatar class="rounded-lg" size="60">
                        <v-img :src="photo.url"></v-img>
                      </v-avatar>
                      <span class="">
                        <v-icon size="20">mdi-delete</v-icon>
                      </span>
                    </span>
                    <!-- <span>{{ photo.name }}</span> -->
                      </div>

                    </div>
                  <!-- </template>
                  </v-data-table> -->
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card elevation="0" outlined rounded="3" min-height="150">
              <v-card-text>
                <div class="d-flex justify-space-between mb-2">
                  <label class="title text-dark  font-weight-bold mb-0">
                Documents</label>
                  <v-btn color="primary" small link text
                  @click="triggerUpload('doc')">Add Document</v-btn>
                </div>
                <div class="" style="max-width: 100%; overflow-x: auto;">
                  <!-- <v-data-table
                  :header="filesTableHeader"
                  :items="servicePhotos"
                  >
                  <template v-slot:[`item.name`]="{ item }"> -->
                    <div class="">
                      <div v-for="(photo, p) in serviceDocs" :key="p+'photos'" >
                    <span>
                      {{ photo.name }}
                        <v-icon size="20">mdi-delete</v-icon>
                      </span>
                    <!-- <span>{{ photo.name }}</span> -->
                      </div>

                    </div>
                  <!-- </template>
                  </v-data-table> -->
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card elevation="0" outlined rounded="3" min-height="150">
              <v-card-text>
                <div class="d-flex justify-space-between mb-2">
                  <label class="title text-dark  font-weight-bold mb-0">
                Comments</label>
                </div>
                <div>
                  <v-textarea
                  v-model="issueForm.comments"
                  row="3"
                  dense
                  outlined
                  placeholder="Add comments here..."
                  ></v-textarea>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        </v-form>
        </v-container>
        </template>
    </new-item-page-layout>
          <input
          id="fileInput"
            v-show="false"
            @change="uploadToServer"
            :accept="isDoc  ? '.xlsx,.xls,.csv,.doc,.docx,.ppt,.pptx,.pdf' : '.jpg'"
            label="File input"
            type="file"
          />
  </div>
</template>

<script>
import validation from '../../services/validation'
import vehicles from '../../store/modules/vehicles'
import NewItemPageLayout from '../layouts/NewItemPageLayout.vue'
// import UserItem from '../../components/common/UserItem.vue'
import common from '../../mixins/common'
export default {
  name: 'NewService',
  props: ['editMode'],
  mixins: [vehicles, common],
  components: { NewItemPageLayout },
  data () {
    return {
      ...validation,
      menu4: false,
      menu3: false,
      menu2: false,
      menu: false,
      // saving: false,
      isDoc: false,
      uploading: false,
      issues: [{ id: 1, name: 'issue w', labor: 0, parts: 0, subtotal: 0, comment: '' }, { id: 2, name: 'issue we', labor: 0, parts: 0, subtotal: 0, comment: '' }, { id: 3, name: 'issu w', labor: 0, parts: 0, subtotal: 0, comment: '' }],
      startingDate: null,
      startingTime: null,
      endingDate: null,
      reportedDate: null,
      endingTime: null,
      filesTableHeader: [
        { text: '', value: 'name' },
        { text: '', value: 'id' }
      ],
      headers: [
        {
          text: '',
          align: 'start',
          value: 'name'
        },
        { text: 'Labour', value: 'labor', width: '150', align: 'start' },
        { text: 'Parts', value: 'parts', width: '150' },
        { text: 'Subtotal (g)', value: 'subtotal', width: '150' }
      ],
      // eslint-disable-next-line no-undef
      issueForm: new Form({
        id: null,
        reportedBy: null,
        reference: '',
        issues: [],
        reportedDate: null,
        vendor: '',
        odometer: null,
        endDate: null,
        photos: [],
        documents: [],
        comment: ''
      })
    }
  },
  methods: {
    async uploadToServer (e) {
      this.uploading = true
      // var fileInput = document.getElementById('fileInput')
      var fileList = e.target.files[0]
      console.log('fileInpue', fileList)

      // this.uploadProgress = truedispatch
      // for (var i = 0; i < fileList.length; ++i) {
      const form = new FormData()
      form.append('file', fileList)
      const response = await this.$store.dispatch('uploadFile', form)
      if (response && this.isDoc) {
        this.issueForm.documents.push({ url: response, name: fileList.name })
        this.uploading = false
      } else {
        this.issueForm.photos.push({ url: response, name: fileList.name })
        this.uploading = false
      }
    },
    triggerUpload (type) {
      if (type === 'doc') {
        this.isDoc = true
        setTimeout(() => {
          document.getElementById('fileInput').click()
        }, 1500)
      } else {
        this.isDoc = false
        setTimeout(() => {
          document.getElementById('fileInput').click()
        }, 1500)
      }
    },
    removeIssue (index) {
      this.issueForm.issues.splice(index)
    },
    getSubtotal (item) {
      console.log(typeof (item.parts))
      return item.parts + item.labor
    },
    saveOption () {
      if (this.editMode) {
        this.updateService()
      } else {
        this.addService()
      }
    },
    addService () {
      if (!this.issueForm.vehicleId) return
      if (!this.$refs.servce_form.validate()) return
      this.issueForm.startDate = `${this.issueForm.startingDate}T${this.issueForm.startTime}:00Z`
      this.issueForm.endDate = `${this.issueForm.endingDate}T${this.issueForm.endTime}:00Z`
      // console.log('date', this.startDate)
      const response = this.$store.dispatch('services/addService', this.issueForm)
      if (response) {
        // this.dialog = false
        this.$store.dispatch('showSnackBar', { message: 'Service added Successfully', error: false })
      }
    },
    cancelAction () {
      this.issueForm.reset()
      this.$router.push({ name: 'ServiceList' })
    }
  },
  computed: {
    servicePhotos: {
      get () {
        return this.issueForm.photos
      }
    },
    serviceDocs: {
      get () {
        return this.issueForm.documents
      }
    },
    allVehicles: {
      get () {
        return this.$store.state.vehicles.vehicles
      }
    },
    serviceData: {
      get () {
        return this.$store.state.services.serviceData
      }
    }
  }
}
</script>

<style scoped>
.no-item-row {
  background-color: #f5f4f4;
  height: 100px;
  border-radius: 10px;
}

</style>
