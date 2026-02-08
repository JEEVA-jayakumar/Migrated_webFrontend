<template>
  <div>
     <q-dialog
        position="right"
        maximized
        v-model="propShowAddPermissions"  
        @hide="emitfnshowAddPermissions(propShowAddPermissions)" 
        @escape-key="emitfnshowAddPermissions(propShowAddPermissions)"  
        class="customModalOverlay" 
        :content-css="{paddingTop:'50px',paddingBottom:'50px',maxWidth: '50vw',minHeight:'100vh'}"
        >
           <form> 
            <div class="q-px-md">
              <div class="q-pa-sm">
                <div class="column gutter-sm q-py-sm items-center bottom-border">
                  <div class="col-md-8">
                    <div class="text-h6 text-weight-regular">Add Permissions</div>
                  </div>
                  <div class="col-md-2">
                    <q-btn flat size="md" align="right" class="bg-white text-weight-regular text-grey-8" @click="emitfnshowAddPermissions(item)">Cancel
                    </q-btn>
                  </div>
                  <div class="col-md-2">
                    <q-btn size="md" align="right"  color="purple-9">Add
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>

            <div class="q-px-md">
              <div class="q-pa-sm">
                <div class="column gutter-sm q-py-lg items-center bottom-border">

                  <div class="col-auto">
                    <img src="https://png.icons8.com/color/260/person-female.png" class="avatar">
                  </div>

                  <div class="col-md-5">
                    <div class="text-weight-regular text-grey-8">
                      Arun Kumar
                    </div>
                    <div class="text-weight-regular text-body1 text-grey-8">
                      <span class="text-light-blue">Employee ID:</span> 2134453
                    </div>
                  </div>

                  <div class="col-md-5">
                    <div class="text-weight-regular text-grey-8">
                      +91 9921344530
                    </div>
                    <div class="text-weight-regular text-body1 text-grey-8">
                      arunkumar@gmail.com
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="q-px-md">
                <div class="q-pa-sm">
                    <div class="column gutter-sm q-py-sm items-center bottom-border">
                        <div class="col-md-12">
                        <div class="text-h6 text-weight-regular">Set Permission</div>
                        </div>
                        <div v-for="radioPermission in radioPermissions" :key="radioPermission.id">
                        <q-radio v-model="radioPermissionChecked" color="purple-9">
                            <q-chip color="blue-grey-1" class="text-weight-regular text-grey-8">
                            {{radioPermission.label}}
                            </q-chip>
                        </q-radio>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </q-dialog>

     <q-dialog
       
        minimized
        v-model="propShowAddPermissions"  
        @hide="emitfnshowAddPermissions(propShowAddPermissions)" 
        @escape-key="emitfnshowAddPermissions(propShowAddPermissions)"  
        class="animate-scale lt-md" 
        :content-css="{padding:'20px'}"
        >
          <form>
            <div>
              <div>
                <q-radio v-model="checked" color="purple-9">
                  <q-chip color="blue-grey-2 " class="text-black">
                    q-chip
                  </q-chip>
                </q-radio>
              </div>
            </div>

            <q-btn size="sm" align="right" rounded outline color="purple-9" 
                class="float-right q-mx-sm q-my-md">Send
            </q-btn>
            <q-btn size="sm" align="right" rounded outline color="grey-7" 
                class="float-right q-mx-sm q-my-md" @click="emitfnshowAddPermissions(propShowAddPermissions)">Cancel
            </q-btn>
        </form>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: ["propShowAddPermissions"],
  data() {
    return {
      model: "",
      radioPermissionChecked: "",

      radioPermissions: [
        {
          value: 1,
          label: "Read",
        },
        {
          value: 2,
          label: "Write",
        },
        {
          value: 3,
          label: "Download",
        },
        {
          value: 4,
          label: "Edit",
        },
      ],
    };
  },

  methods: {
    emitfnshowAddPermissions(propShowAddPermissions) {
      this.$emit("emitfnshowAddPermissions", propShowAddPermissions);
    },
  },
};
</script>
