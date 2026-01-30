<template>
  <div>
    <q-modal v-model="toggleModal" class="q-mt-lg capitalize" @hide="emitToggleRemarks" @escape-key="emitToggleRemarks"
      :content-css="{minWidth:'30vw',padding:'20px'}">
      <div class="row items-center bottom-border q-py-sm">
        <div class="col">Add Remarks</div>
        <div class="col-auto">
          <q-btn round size="sm" @click="emitToggleRemarks" outline color="dark" icon="clear" />
        </div>

      </div>
      <form>
        <div class="column group">
          <div class="q-title"></div>
          <div>
            <q-editor @blur="$v.formData.crmRemark.$touch" :error="$v.formData.crmRemark.$error" color="grey-9" v-model="formData.crmRemark" float-label="Remarks" placeholder="Add remarks"
              :toolbar="[
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['token', 'hr', 'link', 'custom_btn'],
                ['print', 'fullscreen'],
                [
                  {
                    label: $q.i18n.editor.formatting,
                    icon: $q.icon.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                  },
                  {
                    label: $q.i18n.editor.fontSize,
                    icon: $q.icon.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
                  },
                  {
                    label: $q.i18n.editor.defaultFont,
                    icon: $q.icon.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
                  },
                  'removeFormat'
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
                [
                  {
                    label: $q.i18n.editor.align,
                    icon: $q.icon.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify']
                  },
                  {
                    label: $q.i18n.editor.align,
                    icon: $q.icon.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify']
                  }
                ],
                ['undo', 'redo']
              ]" :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
              }" />
            <!-- <q-input @blur="$v.formData.crmRemark.$touch" :error="$v.formData.crmRemark.$error" color="grey-9"
              v-model="formData.crmRemark" float-label="Remarks" placeholder="Add remarks" /> -->
          </div>
        </div>

        <div class="group" align="right">
          <q-btn @click="fnsubmit(formData)" color="positive" icon="check" label="Save" />
        </div>
      </form>
    </q-modal>
  </div>
</template>
    
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "bijlipayAddRemarks",
  props: ["remarksInfo", "propToggleRemarksPop", "propToggleRemarks"],
  data() {
    return {
      toggleModal: this.propToggleRemarksPop,
      formData: {
        serviceRequest: this.remarksInfo.remarks.serviceReqTicketId,
        crmRemark: this.remarksInfo.remarks.crmRemark,
        action: this.remarksInfo.action
      },      
    };
  },

  validations: {
    formData: {
      crmRemark: { required },
    }
  },
  computed : {
    ...mapGetters("bijlipayCrm", ["getupdateRemarks"])
  },

  methods: {
    ...mapActions("bijlipayCrm", ["UPDATE_CRM_REMARKS"]),
    fnsubmit(formData) {
      this.$v.formData.$touch();
      if (this.$v.formData.$error) {
        this.$q.notify("Please review fields again.");
      } else {
        this.UPDATE_CRM_REMARKS(formData)
          .then(() => {
            this.$q.notify({
              color: "positive",
              position: "bottom",
              message: "Remarks updated successfully",
              icon: "thumb_up"
            });
            this.emitToggleRemarks()
            this.$emit("reloadBijlipayPendingDetails", this.formData.action);
          })
          .catch(error => {
            this.$q.notify({
              color: "negative",
              position: "bottom",
              message: error.body.message == null ? "Please Try Again Later !" :error.body.message,
              icon: "thumb_down"
            });
          });
      }
    },
    emitToggleRemarks() {
      this.$emit("closeRemarksInfo");
    }
  }
};
</script>

    
