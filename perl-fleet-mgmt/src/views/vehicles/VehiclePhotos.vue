<template>
  <div>
      <AdminSingleCRUDPageLayout
      md="6"
      >
      <template #body>
          <v-row justify="center" align="center">
              <v-col cols="12">
                <custom-pagination></custom-pagination>
                </v-col>
                </v-row>
                </template>
                </AdminSingleCRUDPageLayout>
                <v-row>
                  <v-col cols="12" md="3" v-for="(image, i) in images" :key="i+'image'">
                    <v-card v-if="i === 0" elevation="0" class="grey lighten-3" outlined height="200" width="200">
                      <v-card-text class="h-100" align="center">
                        <v-btn title="Add new image" block @click="triggerUpload" depressed color="success" class="mt-12 mr-auto">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <div>
                          <small>Add New Image...</small>
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
                    <v-card v-else outline height="200" width="200">
                      <v-img cover height="100%" :src="image">
                        <template v-slot:placeholder>
                          <div align="center">
                          <v-progress-circular class="mt-12" color="primary" intermediate></v-progress-circular>
                          </div>
                        </template>
                      </v-img>
                    </v-card>

                  </v-col>
                </v-row>
  </div>
</template>

<script>
import AdminSingleCRUDPageLayout from '../layouts/AdminSingleCRUDPageLayout.vue'
// import PageUnderConstruction from '../PageUnderConstruction.vue'
import CustomPagination from '../../components/common/CustomPagination.vue'
export default {
  components: { AdminSingleCRUDPageLayout, CustomPagination },
  name: 'VehiclePhotos',
  data () {
    return {
      images: [
        ''
      ],
      // eslint-disable-next-line no-undef
      newPhoto: new Form({
        vehicleId: null,
        image: ''
      }),
      uploading: false
    }
  },
  methods: {
    triggerUpload () {
      document.getElementById('fileInput').click()
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
        this.images.push(response)
        this.uploading = false
      }
    }
  }

}
</script>

<style>

</style>
