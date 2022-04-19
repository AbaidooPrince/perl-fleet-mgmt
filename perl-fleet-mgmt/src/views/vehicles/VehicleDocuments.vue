<template>
  <div>
    <v-toolbar flat height="">
    <div class="w-100">
    <ul class="line">
      <li @click="switchComponent(tab.isArchived)" :class="isArchived === tab.isArchived ? 'activeLink' : 'text-muted'" class="list mr-5 defaultLink" v-for="(tab, t) in tabs" :key="t+'ttab'">
        <label class="mb-0" v-if="tab.admin">
        {{ tab.name }}
        </label>
      </li>
    </ul>
    <!-- <v-divider class="mt-0"></v-divider> -->
    </div>
    </v-toolbar>
      <AdminSingleCRUDPageLayout
      md="6"
      >
      <template #body>
          <v-row justify="end" align="center">
              <v-col cols="12" md="8" class="pr-0 align-self-center">
                        <v-btn small title="Add new image" @click="triggerUpload" depressed color="primary" class="mr-auto">
                          <v-icon>mdi-plus</v-icon> Add
                        </v-btn>
                </v-col>
              <v-col cols="12" md="4" class="pr-0">
                <custom-pagination
                module="files"
                state="filePagination"
                ></custom-pagination>
                </v-col>
                </v-row>
                </template>
                </AdminSingleCRUDPageLayout>
                <v-data-table
                :loading="loading"
                height="400"
                hide-default-footer
                  :headers="headers"
                  :items="allDocuments"
                  item-key="name"
                  class="tables bg-white"
                >
                <template v-slot:[`item.name`]="{ item }">
                  <router-link to="" :href="`${item.url}`" target="_blank">
                    {{ item.name }}
                  </router-link>
                </template>
                <template v-slot:[`item.uploadedBy`]="{ item }">
                  <user-item
                  :user="getUser(item.uploadedBy)"
                  ></user-item>
                </template>
    <template class="table-actions" v-slot:[`item.id`]="{ item }">
    <v-menu offset-y left rounded="lg"
      transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        small
        depressed
          v-bind="attrs"
          v-on="on"
        ><v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
        <v-list dense>
          <v-list-item v-for="menu in (isArchived ? archivedActionItems : actionItems)" :key="menu.id" @click="action(item, menu.name)">
            <v-list-item-title class="small">
              <v-icon  left small>{{ menu.icon }}</v-icon>
                {{ menu.name }}
            </v-list-item-title>
            <v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
                </v-data-table>
                <v-row>
                      <input
          id="fileInput"
            v-show="false"
            @change="uploadToServer"
            accept=".xlsx,.xls,.csv,.doc,.docx,.ppt,.pptx,.pdf"
            label="File input"
            type="file"
          />
                </v-row>
                <v-dialog
                v-model="dialog"
                width="600"
                >
                  <file-uploader
                  @change-file="triggerUpload"
                  @close-dialog="closeDialog"
                    :form="newPhoto"
                    type="document"
                    :editMode="editMode"
                    :vehicleUpload="true"
                  ></file-uploader>
                </v-dialog>
  </div>
</template>

<script>
import AdminSingleCRUDPageLayout from '../layouts/AdminSingleCRUDPageLayout.vue'
// import PageUnderConstruction from '../PageUnderConstruction.vue'
import CustomPagination from '../../components/common/CustomPagination.vue'
import vehicles from '../../mixins/vehicles'
import user from '../../mixins/user'
import common from '../../mixins/common'
import FileUploader from '../../components/common/FileUploader.vue'
import UserItem from '../../components/common/UserItem.vue'
import { isAdmin } from '../../services/auth'
export default {
  components: { AdminSingleCRUDPageLayout, CustomPagination, FileUploader, UserItem },
  name: 'VehicleDocuments',
  mixins: [vehicles, user, common],
  data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Uploaded by', value: 'uploadedBy' },
        { text: '', value: 'id', align: 'end' }
      ],
      tabs: [
        { name: 'All Documents', component: 'VehicleList', admin: isAdmin, isArchived: false },
        { name: 'Archived', component: 'VehicleAssignmentList', admin: isAdmin, isArchived: true }
      ],
      actionItems: [
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditPersonnel' },
        { id: 3, name: 'Archive', icon: 'mdi-delete-outline', routeName: 'DeactivatePersonnel' }
      ],
      archivedActionItems: [
        { id: 2, name: 'Restore', icon: 'mdi-refresh', routeName: 'EditPersonnel' },
        { id: 3, name: 'Delete', icon: 'mdi-delete-outline', routeName: 'DeactivatePersonnel' }
      ],
      editMode: false,
      dialog: false,
      images: [
        ''
      ],
      loading: false,
      // eslint-disable-next-line no-undef
      newPhoto: new Form({
        id: '',
        name: '',
        url: '',
        type: 'photo',
        vehicleId: null,
        uploadedBy: '',
        fileOwnerId: null
      }),
      uploading: false
    }
  },
  methods: {
    switchComponent (name) {
      if (name) {
        this.getAllArchivedDocs()
      } else {
        this.getVehiclePhotos()
      }
    },
    action (item, action) {
      if (action === 'Edit') {
        this.editMode = true
        this.newPhoto.fill(item)
        this.dialog = true
      } else if (action === 'Restore') {
        this.restoreFile(item)
      } else if (action === 'Delete') {
        console.log(item)
      } else {
        this.archiveFile(item)
        // this.deleteItem = item
        // this.deleteDialog = true
      }
    },
    closeDialog () {
      // this.form.reset()
      this.dialog = false
    },
    async restoreFile (data) {
      const response = await this.$store.dispatch('files/restoreFile', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { error: false, message: 'File restored successfully!' })
      }
    },
    async archiveFile (data) {
      const response = await this.$store.dispatch('files/archiveFile', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { error: false, message: 'File deleted successfully!' })
      }
    },
    editFile (data) {
      this.newPhoto.fill(data)
      this.editMode = true
      this.dialog = true
    },
    async getAllArchivedDocs () {
      this.loading = true
      try {
        const response = await this.$store.dispatch('files/getAllArchivedFiles', { page: 1 })
        if (response === 'success') {
          this.loading = false
        } else if (response === 'error') {
          this.$store.dispatch('showSnackBar', { error: true, message: 'Error fetching data. Try again!' })
          this.loading = false
        }
      } catch (e) {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error fetching data. Try again!' })
        this.loading = false
        console.log(e)
      }
    },
    async getVehiclePhotos () {
      this.loading = true
      try {
        const response = await this.$store.dispatch('files/getAllVehicleFiles', { page: 1 })
        if (response === 'success') {
          this.loading = false
          console.log('success')
        }
      } catch (e) {
        console.log(e)
      }
    },
    triggerUpload () {
      document.getElementById('fileInput').click()
    },
    async addFile () {
      const response = await this.$store.dispatch('files/addFile', this.newPhoto)
      if (response === 'success') {
        this.uploading = false
      }
    },
    async uploadToServer (e) {
      this.loading = true
      // var fileInput = document.getElementById('fileInput')
      var fileList = e.target.files[0]
      console.log('fileInpue', fileList)

      // this.uploadProgress = truedispatch
      // for (var i = 0; i < fileList.length; ++i) {
      const form = new FormData()
      form.append('file', fileList)
      const response = await this.$store.dispatch('uploadFile', form)
      if (response) {
        this.loading = false
        this.newPhoto.url = response
        this.newPhoto.uploadedBy = this.currentUser.id
        if (!this.dialog) {
          this.newPhoto.name = fileList.name
          this.dialog = true
        }
        // this.images.push(response)
        // this.uploading = false
      }
    }
  },
  computed: {
    isAdmin () {
      return isAdmin()
    },
    isActiveTab: {
      get () {
        return this.$route.name
      }
    },
    isArchived: {
      get () {
        return this.$store.state.files.archivedView
      }
    },
    allDocuments: {
      get () {
        return this.$store.state.files.documents
      }
    }
  },
  created () {
    this.getVehiclePhotos()
  }

}
</script>

<style>

</style>
