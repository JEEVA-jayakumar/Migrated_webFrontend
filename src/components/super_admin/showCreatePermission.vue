<template>
  <div>
    <q-modal
    minimized 
    class="customModalOverlay"
    v-model="propShowCreatePermission"  
    @hide="emitfnshowAddPermissions(propShowCreatePermission)" 
    @escape-key="emitfnshowAddPermissions(propShowCreatePermission)"  
    :content-css="{padding:'30px',minWidth: '30vw'}"
    >
      <form> 
        <div class="row q-pa-md bottom-border">
          <div class="col-md-12">
            <div class="q-title text-weight-regular">Add Permission</div>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col-md-12">
            <q-input 
            @keyup.enter="fnEditPermissionSubmit(formData.permissionDetails)"
            v-model="formData.permissionDetails.permission" 
            :error="$v.formData.permissionDetails.permission.$error" 
            class="text-weight-regular text-grey-8 q-my-sm" color="grey-9" float-label="Permission" placeholder="Permission" />
          </div>
        </div>
        <div class="row gutter-sm q-pa-md">
          <div class="col-md-12" align="right">
            <q-btn flat size="md" align="right" class="bg-white q-mr-sm text-weight-regular text-grey-8" @click="emitfnshowAddPermissions(propShowCreatePermission)">Cancel
            </q-btn>
            <q-btn size="md" align="right" @click="fnEditPermissionSubmit(formData.permissionDetails)" color="purple-9">Save
            </q-btn>
          </div>
        </div>
      </form>
    </q-modal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["propGetAllPermissionData", "propShowCreatePermission"],
  data() {
    return {
      formData: {
        permissionDetails: {
          permission: ""
        }
      }
    };
  },

  validations: {
    formData: {
      permissionDetails: {
        permission: required
      }
    }
  },

  methods: {
    ...mapActions("SuperAdminUsers", [
      "FEED_PERMISSION_DATA",
      "FETCH_ALL_PERMISSIONS_DATA"
    ]),

    emitfnshowAddPermissions(propShowCreatePermission) {
      this.$emit("emitfnshowAddPermissions", propShowCreatePermission);
    },
    //Permission creation final submit
    fnEditPermissionSubmit(formData) {
      this.$v.formData.permissionDetails.$touch();

      if (this.$v.formData.permissionDetails.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none"
        });

        this.FEED_PERMISSION_DATA(formData)
          .then(response => {
            this.FETCH_ALL_PERMISSIONS_DATA();
            this.emitfnshowAddPermissions(this.propShowCreatePermission);
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully Updated!",
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
