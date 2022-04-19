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
              <v-col cols="12" md="4" class="pr-0">
                <custom-pagination
                module="files"
                state="filePagination"
                ></custom-pagination>
                </v-col>
                </v-row>
                </template>
                </AdminSingleCRUDPageLayout>
                <v-row>
                  <v-col cols="12" md="3" lg="3" sm="12">
                    <v-card elevation="0" class="grey lighten-3" outlined height="200">
                      <v-card-text class="h-100" align="center">
                        <v-btn title="Add new image" block @click="triggerUpload" depressed color="primary" class="mt-12 mr-auto">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <div>
                          <small>Add New successImage...</small>
                        </div>
                      </v-card-text>
                      <input
          id="fileInput"
            v-show="false"
            @change="uploadToServer"
            accept="image/*"
            label="File input"
            type="file"
          />

                    </v-card>
                  </v-col>
                  <v-col cols="12" md="3" lg="3" sm="6" v-for="(image, i) in allPhotos" :key="i+'image'">

                    <v-hover v-slot="{ hover }">
                      <v-card outline height="200">
                      <v-img cover height="100%" :src="image.url ? image.url : defaultVehicle">
                        <template v-slot:placeholder>
                          <div align="center">
                          <v-progress-circular class="mt-12" color="blue" intermediate></v-progress-circular>
                          </div>
                        </template>
                        <v-expand-transition>
          <div
            v-if="hover"
            class="px-2 elevation-3 transition-fast-in-fast-out grey darken-1 v-card--reveal text-caption w-100 white--text"
            style="height: auto; width: 100%;"
          >
          <div class="d-inline">
            <div v-if="!isArchived" class="pt-2">
              <div class="text-right">
              <v-icon
              @click="editFile(image)"
              color="white"
              >
                mdi-pencil-circle
              </v-icon>
              <span class="pl-2">
                <v-icon  @click="archiveFile(image)" color="white">
                  mdi-delete-circle
                </v-icon>
              </span>
              </div>
            </div>
            <div v-else class="pt-2">
              <div class="text-right">
              <v-icon
              @click="restoreFile(image)"
              color="white"
              >
                mdi-refresh-circle
              </v-icon>
              <span class="pl-2">
                <v-icon  @click="archiveFile(image)" color="white">
                  mdi-delete-circle
                </v-icon>
              </span>
              </div>
            </div>
          <div class="py-2">
            {{ image.name }}
            </div>
            </div>
          </div>

        </v-expand-transition>
                      </v-img>
                    </v-card>
                    </v-hover>

                  </v-col>
                </v-row>
                <v-dialog
                v-model="dialog"
                width="600"
                >
                  <file-uploader
                  @change-file="triggerUpload"
                  @close-dialog="closeDialog"
                    :form="newPhoto"
                    type="photo"
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
import { isAdmin } from '../../services/auth'
export default {
  components: { AdminSingleCRUDPageLayout, CustomPagination, FileUploader },
  name: 'VehiclePhotos',
  mixins: [vehicles, user, common],
  data () {
    return {
      editMode: false,
      dialog: false,
      images: [
        ''
      ],
      tabs: [
        { name: 'All Documents', component: 'VehicleList', admin: isAdmin, isArchived: false },
        { name: 'Archived', component: 'VehicleAssignmentList', admin: isAdmin, isArchived: true }
      ],
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
    async restoreFile (data) {
      const response = await this.$store.dispatch('files/restoreFile', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { error: false, message: 'File restored successfully!' })
      }
    },
    switchComponent (name) {
      if (name) {
        this.getAllArchivedDocs()
      } else {
        this.getVehiclePhotos()
      }
    },
    closeDialog () {
      // this.form.reset()
      this.dialog = false
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
      try {
        const response = await this.$store.dispatch('files/getAllVehicleFiles', { page: 1 })
        if (response === 'success') {
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
      this.uploading = true
      // var fileInput = document.getElementById('fileInput')
      var fileList = e.target.files[0]
      console.log('fileInpue', fileList)
      // this.uploadProgress = truedispatch
      // for (var i = 0; i < fileList.length; ++i) {
      const form = new FormData()
      form.append('file', fileList)
      const response = await this.$store.dispatch('uploadFile', form)
      if (response) {
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
    allPhotos: {
      get () {
        return this.$store.state.files.images
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
