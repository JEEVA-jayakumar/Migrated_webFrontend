<template>
  <div>
    <q-dialog
      minimized
      no-backdrop-dismiss
      no-esc-dismiss
      v-model="toggleModal1"
        :content-css="{padding:'30px',minWidth: '40vw'}"
    >
      <div
        class="
          row
          items-center
          q-px-lg q-py-md
          text-weight-regular
          bottom-border
          text-grey-9
        ">
        <div class="col text-h6" icon="far fa-bell">Add Role/Permissions</div>
     
        </div>
        <div class="column group q-py-sm">
          <div class="col-md-8">
           <q-select
            v-model="formData.hierarchyId"
            float-label="Hierarchy"
            placeholder="Select Hierarchy"
            class="text-weight-regular text-grey-8" color="grey-9"
            :options="getAllHierarchiesData"
              />
          </div>
          </div>
          
             
          <div class="column group q-py-sm">
          <div class="col-md-8">
            <q-input v-model="formData.role" 
            @blur="$v.formData.role.$touch"
            :error="$v.formData.role.$error"
            class="text-weight-regular text-grey-8" 
            color="grey-9" 
            float-label="Role"
             placeholder="Role" /> 
          </div>

          <div class="column group q-py-sm">
          <div class="col-md-8">
            <q-color 
              clearable
              v-model="formData.roleColor"
              @blur="$v.formData.roleColor.$touch"
             :error="$v.formData.roleColor.$error"
              popover float-label="Choose a role color" color="grey-9"
            />
          </div>
        </div>

          <div class="group" align="right">
          <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitToggleMyAccount()">Cancel
          </q-btn>
          <q-btn size="md" align="right" @click="fnAddRoleSubmit(formData)" color="purple-9">Save
          </q-btn>
        </div>
        
      </div>

     

    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, maxLength } from "@vuelidate/validators";
export default {
  name: "changePassword",
  props: ["propsToggleModal1"],
  data() {
    return {
      toggleModal1: this.propsToggleModal1,
      currentPasswordMatched: false,
      formData: {
          roleColor: "",
          role: "",
          hierarchyId: "",
          // roleId: this.propRowDetails.id,
          // role: this.propRowDetails.role,
          // hierarchyId: this.propRowDetails.hierarchy.id,
          // roleColor: this.propRowDetails.roleColor,
      },
      propGetAllHierarchiesData: [],
    };

    
  },
   validations: {
    formData: {
        roleColor: { required },
        role: { required }
    }
  },
   error: {
    formData: {
    
        roleColor: {
          alert: false,
          issue: "",
          value: ""
        },
         role: {
          alert: false,
          issue: "",
          value: ""
        }
    }
    
  },

 
  beforeMount() {
   
  },
  computed: {
     ...mapGetters("SuperAdminUsers", [
      "getAllRolesPermissions",
      "getAllFilterRoles",
      "getAllHierarchiesData",
    ]),
   
    // ...mapGetters("NotificationDatas", ["getnotificationDatas"]),
   
  },

  created() {
     this.ajaxLoadAllLeadInfo();
  },
  methods: {
    // ...mapActions("Authentication", ["CHANGE_PASSWORD"]),
    // ...mapActions("NotificationDatas", ["FETCH_NOTIFICATION_DATAS"]),
    ...mapActions("addRole", ["UPDATE_ROLE_DATA"]),
     ...mapActions("SuperAdminUsers", [
      "FETCH_ALL_ROLES_PERMISSIONS_DATA",
      "FETCH_ALL_HIERARCHIES_DATA",
      "DELETE_ROLE_BY_ROLE_ID_DATA",
    ]),

    emitToggleMyAccount() {
      this.$emit("propsToggleModal1");
    },

    fnAddRoleSubmit(formData){
      
      this.$v.formData.$touch();

      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.$q.loading.show({
          delay: 100, // ms
          message: "Please Wait",
          spinnerColor: "purple-9",
          customClass: "shadow-none",
        });
        this.UPDATE_ROLE_DATA(formData)
          .then(() => {
            console.log("POST store >> AFTER >>");
            this.$q.loading.hide();
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Successfully updated!",
              icon: "thumb_up"
            });
            this.$router.push("/super/admin/roles/permissions/");          
          //  this.FETCH_ALL_USERS_DATA();
          //   this.$emit("emitfnShowEditUser", showEditUser);
            this.$emit("propsToggleModal1");
          })
          .catch(error => {
            this.$q.loading.hide();
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" : error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },
    // getNotificationTitle(){
    //  <q-item v-for = "nofication in this.">
    //  </q-item>
    // },
    ajaxLoadAllLeadInfo() {
      this.FETCH_ALL_HIERARCHIES_DATA();
    },
 
  },
};
</script>

<style>
.error1 {
  color: grey;
}
</style>
