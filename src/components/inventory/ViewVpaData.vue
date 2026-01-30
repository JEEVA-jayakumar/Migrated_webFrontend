<template>
    <div>
      <q-modal
      minimized no-backdrop-dismiss
      class="customModalOverlay"
      v-model="VpaDataToggle"
      @hide="emitVpaModalList(VpaDataToggle)"
      @escape-key="emitVpaModalList(VpaDataToggle)"
      :content-css="{padding:'30px',minWidth: '30vw'}"
      >
      <div class="row justify-end">
        <q-btn flat size="md" icon="close" @click="emitVpaModalList(VpaDataToggle)"></q-btn>
      </div>
      <div class="row items-center q-px-lg q-py-md text-weight-regular bottom-border text-grey-9">
      <div class="col q-title">VPA LIST</div>

    </div>
      <q-table
        table-class="customTableClass"
        class="q-py-none"
        :data="tableData"
        :columns="columns"
        row-key="name"
      >

      <q-td slot="body-cell-Sno" slot-scope="props" :props="props">{{ props.row.id == null ? 'NA' : props.row.id

            }}</q-td>
               {{ props }}
             <q-td slot="body-cell-Vpa" slot-scope="props" :props="props">{{ props.row.vpa == null ? 'NA' : props.row.vpa
            }}</q-td>
    </q-table>

      </q-modal>
    </div>
  </template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  alpha,
  alphaNum,
  numeric
} from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'QrVpa',
  props: ['propRowDetails', 'VpaDataModal'],
  data () {
    return {
      filter: '',
      paginationControl: {
        rowsNumber: 5,
        page: 1,
        descending: false,
        rowsPerPage: 5
      },
      tableData: this.propRowDetails.vpaList,
      VpaDataToggle: this.VpaDataModal,
      columns: [
        {
          name: 'Sno',
          required: true,
          label: 'SerialNo',
          align: 'left',
          field: 'id',
          sortable: false
        },
        {
          name: 'Vpa',
          required: true,
          label: 'VPA',
          align: 'left',
          field: 'vpa',
          sortable: false
        }

      ]
    }
  },
  beforeMount () {
    console.log('CHECK', JSON.stringify(this.VpaDataModal))
  },
  methods: {
    ...mapActions('SuperAdminUsers', [
      'FEED_EXISTING_PERMISSION_DATA',
      'FETCH_ALL_PERMISSIONS_DATA'
    ]),

    // Emit functions
    emitVpaModalList (VpaDataToggle) {
      this.$emit('toggleModal', VpaDataToggle)
    }

  }
}
</script>
