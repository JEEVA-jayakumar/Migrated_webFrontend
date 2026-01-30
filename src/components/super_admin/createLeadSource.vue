<template>
  <div>
    <q-modal
      minimized
      v-model="propToggleModal"
      @hide="toggleModal"
      @escape-key="toggleModal"
      class="customModalOverlay"
      :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <form>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Add Lead Source</div>
          </div>
        </div>
        <q-card style="width:100%">
          <q-card-separator />
          <q-item>
            <q-item-main>
              <q-input
              v-model="formData.sourceName"
              @blur="$v.formData.sourceName.$touch"
              :error="$v.formData.sourceName.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Lead Source"
              placeholder="Lead Source"
              @keyup.enter="submitLeadSourceData(formData)"
            />
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-input
              v-model="formData.sourceCode"
              @blur="$v.formData.sourceCode.$touch"
              :error="$v.formData.sourceCode.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Enter Source Code"
              placeholder="Enter Source Code"
              @keyup.enter="submitLeadSourceData(formData)"
              
            />
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <p class="q-caption">Multi-TID</p>
              <q-radio
                    :error="$v.formData.multiTidEnabled.$error"
                    v-for="(item, index) in multiTidFlagOptions"
                    :key="index"
                    color="grey-9"
                    v-model.trim="formData.multiTidEnabled"
                    :val="item.value"
                    :label="item.label"
                  />
            </q-item-main>
          </q-item>
          <!-- <q-item>
            <q-item-main>
              <q-input
              v-model="formData.baseTidMidPrefix"
              @blur="$v.formData.baseTidMidPrefix.$touch"
              :error="$v.formData.baseTidMidPrefix.$error"
              class="text-weight-regular text-grey-8"
              color="grey-9"
              float-label="Tid/Mid Prefix"
              placeholder="Tid/Mid Prefix"
              @keyup.enter="submitLeadSourceData(formData)"
            />
            </q-item-main>
             <q-item-side right>
                <q-btn
                  round
                  dense
                  no-caps
                  size="md"
                  @click="fnAddPrefix"
                  color="purple-9"
                  icon="add"
                  class="no-margin"
                />
              </q-item-side>
          </q-item> -->
          </q-card>
        <div class="row gutter-sm q-py-sm items-center">
          <div class="col-md-12 group" align="right">
            <q-btn
              flat
              align="right"
              class="bg-white text-weight-regular text-grey-8"
              @click="toggleModal()"
            >Cancel</q-btn>
            <q-btn align="right" @click="submitLeadSourceData(formData)" color="purple-9">Save</q-btn>
          </div>
        </div>
      </form>
    </q-modal>
      <!--START: Show Prefix details -->
      <!-- <showPrefixDetails
          v-if="showAddPrefixModal"
          :propToggleModal="showAddPrefixModal"
          @emitToggleModal="fnAddPrefix"
        ></showPrefixDetails> -->
        <!--END: Show Prefix details-->
  </div>
</template>

<script>
import { integer, required,minLength,maxLength} from "vuelidate/lib/validators";
// import showPrefixDetails from "../../components/super_admin/addPrefixDetails.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["propShowCreateLeadSource"],
  components:{
    // showPrefixDetails
  },
  data() {
    return {
      // showAddPrefixModal:false,
      multiTidFlagOptions:[
        {
          label: "Yes",
          value: true
        },
        {
          label: "No",
          value: false
        }
      ],
      propToggleModal: this.propShowCreateLeadSource,
      formData: {
        bank_enable: "False",
        sourceName: "",
        sourceCode:"",
        multiTidEnabled: false,
        // baseTidMidPrefix:"",
      }
    };
  },
  validations: {
    formData: {
      sourceName: {
        required
      },
      sourceCode:{
        required,
      },
      multiTidEnabled:{
        required
      },
      // baseTidMidPrefix:{
      //   required
      // },
    }
  },

  methods: {
    ...mapActions("leadSource", ["ADD_NEW_LEAD_SOURCE"]),
    toggleModal() {
      this.$emit("emitfnshowLeadSources");
    },
    // fnAddPrefix(){
    //   this.showAddPrefixModal =! this.showAddPrefixModal;
    // },
    submitLeadSourceData() {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });
        this.ADD_NEW_LEAD_SOURCE(this.formData)
          .then(() => {
            this.$q.loading.hide();
            this.$emit("emitfnshowLeadSources", "refresh");
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Lead Source successfully created!",
              icon: "thumb_up"
            });
          })
          .catch(() => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    }
  }
};
</script>

<style>
</style>
