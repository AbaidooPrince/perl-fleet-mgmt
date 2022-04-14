<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="12" class="pa-0">
          <v-card class="pa-4">
            <v-card-title class="pt-0">{{ editMode ? 'Edit Role' : 'New Role'}}
              <div class="close ml-auto">
                <slot name="close"/>
              </div>
            </v-card-title>
            <v-divider class="mt-0"></v-divider>
            <v-card-text>
              <v-form ref="groupForm">
              <div>
                <label>Role Name <strong>*</strong></label>
                <v-text-field :rules="[required('Role Name')]" dense outlined
                v-model="form.name"
                :value="form.id"
                >
                </v-text-field>
              </div>
              <div>
                <v-textarea
                outlined
                placeholder="Description"
                dense
                row="2"
                v-model="form.description"
                >

                </v-textarea>
              </div>
              <v-divider class="mt-0"></v-divider>
              <v-row class="mt-4">
                <v-col cols="12" md="12" v-for="(item, i) in form.items" :key="i+'item'">
                  <v-row>
                    <v-col cols="12" md="10" class="pr-0 py-0">
                      <v-text-field
                      v-model="item.name"
                      dense
                      outlined
                      :placeholder="`Item ${i+1} Name`"
                      ></v-text-field>

                    </v-col>
                    <v-col cols="12" md="1" class="pl-0 py-0">
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div align="end" class="mt-4">
                <v-btn @click="addNewItem" depressed small color="success">
                  <v-icon left>mdi-plus</v-icon>
                  New Item
                </v-btn>
              </div>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <slot name="action"/>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import validation from '../../services/validation'
export default {
  name: 'InspectionFormForm',
  props: ['form', 'editMode'],
  data () {
    return {
      ...validation,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Read', value: 'read' },
        { text: 'Create', value: 'create' },
        { text: 'Update', value: 'update' },
        { text: 'Delete', value: 'delete' },
        { text: '', value: 'id', align: 'end' }
      ]
    }
  },
  methods: {
    addNewItem () {
      this.$emit('add-new-item')
    }
  }

}
</script>

<style>

</style>
