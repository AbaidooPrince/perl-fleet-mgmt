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
              <div>
                <v-switch inset class="mt-0" label="Default role for new users" dense
                v-model="form.default"
                >
                </v-switch>
              </div>
              <v-data-table
              hide-default-footer
                :headers="headers"
                :items="form.permissions"
                select-all
              >
              <template v-slot:[`item.read`]="{ item }">
                <v-switch inset class="mt-0" dense
                v-model="item.read"
                >
                </v-switch>
              </template>
              <template v-slot:[`item.create`]="{ item }">
                <v-switch inset class="mt-0" dense
                v-model="item.create"
                >
                </v-switch>
              </template>
              <template v-slot:[`item.update`]="{ item }">
                <v-switch inset class="mt-0" dense
                v-model="item.update"
                >
                </v-switch>
              </template>
              <template v-slot:[`item.delete`]="{ item }">
                <v-switch inset class="mt-0" dense
                v-model="item.delete"
                >
                </v-switch>
              </template>
              </v-data-table>
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
  name: 'RoleForm',
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
  }

}
</script>

<style>

</style>
