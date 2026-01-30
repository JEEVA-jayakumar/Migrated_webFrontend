<template>
    <q-page>
        <div class="row items-center window-height">
            <div class="col-md-4 gt-sm bg-grey-4" align="center">
                <div class="row items-center window-height full-width inline" align="center">
                    <div class="col-auto no-padding full-width" align="center">
                        <img src="~assets/images/Phonepe.png" style="width:300px" />
                    </div>
                </div>
            </div>
            <div class="col-md-7 q-px-xl">
                <div class="row justify-center gutter-md">
                    <div class="col-md-8" align="center">
                        <div class="q-display-1 text-grey-9 text-weight-medium q-py-lg ">Please SignUp</div>
                    </div>
                    <div class="col-md-8">
                        <q-input v-model="FormData.fname" placeholder="Enter Name" float-label="Enter Name"
                            @blur="$v.FormData.fname.$touch" :error="$v.FormData.fname.$error" />

                    </div>
                    <div class="col-md-8">
                        <q-input v-model="FormData.email" placeholder="Enter Email" float-label="Enter Email"
                            @blur="$v.FormData.email.$touch" :error="$v.FormData.email.$error" />

                    </div>
                    <div class="col-md-8">
                        <q-datetime v-model="FormData.dob" placeholder="Select DOB" float-label="Select DOB"
                            @blur="$v.FormData.dob.$touch" :error="$v.FormData.dob.$error" />

                    </div>
                    <div class="col-md-8">
                        <q-select v-model="FormData.gender" float-label="Select Gender" placeholder="Select Gender"
                            @blur="$v.FormData.gender.$touch" :error="$v.FormData.gender.$error"
                            :options="selectGender" />

                    </div>
                    <div class="col-md-8">
                        <q-input v-model="FormData.password" type="password" placeholder="Enter Password"
                            float-label="Enter Password" @blur="$v.FormData.password.$touch"
                            :error="$v.FormData.password.$error" />

                    </div>
                    <div class="col-md-8">
                        <q-input v-model="FormData.repassword" type="password" placeholder="Re-Enter Password"
                            float-label="Re-Enter Password" @blur="$v.FormData.repassword.$touch"
                            :error="$v.FormData.repassword.$error" />

                    </div>
                    <div class="col-md-8" align="center">
                        <q-btn class="full-width text-weigth-regular q-pa-md" no-caps color="purple-9"
                            style="max-width:300px" @click="fnsubmit(FormData)">Submit</q-btn>
                    </div>

                </div>
            </div>
        </div>
    </q-page>
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
} from "vuelidate/lib/validators";
export default {
    data() {
        return {
            selectGender: [
                {
                    label: "Male",
                    value: "Male"
                },
                {
                    label: "Female",
                    value: "Female"
                }
            ],
            FormData: {
                fname: "",
                password: "",
                email: "",
                dob: "",
                gender: "",
                repassword: ""
            },

        }

    },
    validations: {
        FormData: {
            email: {
                required
            },
            fname: {
                required
            },
            dob: {
                required
            },
            gender: {
                required
            },
            password: {
                required
            },
            repassword: {
                required
            }
        }

    },
    method: {
        // fnsubmit(reqData) {
        //     this.$v.FormData.$touch();
        //     if (this.$v.FormData.$error) {
        //         this.$q.notify("Please review fields again.");
        //     } else {

        //         console.log("fnsubmit --------->", JSON.stringify(reqData))
        //     }
        // }
    }
};
</script>
















































<!-- <div class="row items-center window-height">
    <div class="col-md-4 gt-sm bg-grey-4" align="center">
        <div class="row items-center window-height full-width inline" align="center">
            <div class="col-auto no-padding full-width" align="center">
                <img src="~assets/images/Phonepe.png" style="width:200px"/>
                
            </div>
        </div>
    </div>

</div> -->