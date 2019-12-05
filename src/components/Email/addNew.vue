<template>
    <v-col cols="6">
        <v-card outlined>
            <v-form>
                <v-row>
                    <v-col cols="12">
                        Add New Email
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field   
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()" outlined clearable>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field   
                        v-model="name"
                        :error-messages="emailErrors"
                        label="Name"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()" outlined clearable>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="success">
                        <v-alert dismissible  type="success">
                            Add New Successful
                        </v-alert>
                    </v-col>
                    <v-col cols="12" v-if="errors">
                        <v-alert dismissible type="error">
                            Add new Failse
                        </v-alert>
                    </v-col>
                    <v-col cols="12">
                        <v-btn @click.prevent="submit" color="error">Add New</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-col>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
    name: 'AddNew',
    mixins: [validationMixin],
    validations: {
        email: {required, email},
        name: {required}
    },
    data: () => ({
        email: '',
        name: '',
        success: false,
        errors:false
    }),
    computed: {
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('Name is required')
            return errors
        }
    },
    methods: {
        submit () {
            this.$v.$touch()
            axios.post('http://157.245.156.221:3000/api/contacts', {
                email: this.email,
                name: this.name
            })
            .then( res => {
                console.log(res);
                
                this.success = res.data
                console.log(res);
                
            }).catch (err => {
                this.errors = err
            })

        }
    }
}
</script>

<style scoped>
    .v-card {
        padding: 10px;
        margin-bottom: 10px;
    }
</style>