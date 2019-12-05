<template>
    <v-col cols="6">
        <h1>Add New Campaign</h1>
        <v-card outlined>
            <v-form>
                <v-row>
                    <v-col>
                        <v-text-field   
                        v-model="title"
                        :error-messages="emailErrors"
                        label="Title"
                        required
                        @input="$v.title.$touch()"
                        @blur="$v.title.$touch()" outlined clearable>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea
                        v-model="content"
                        :error-messages="ContentErrors"
                        label="Content"
                        auto-grow
                        outlined
                        rows="1"
                        row-height="15"
                        required
                        @input="$v.content.$touch()"
                        @blur="$v.content.$touch()" 
                        clearable
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
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
                        <v-btn @click.prevent="submit" color="error">Send</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-col>
</template>

<script>
import EventBus from '../EventBus';
import { validationMixin } from 'vuelidate'
import { required} from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
    name: 'AddNew',
    mixins: [validationMixin],
    validations: {
        title: {required},
        content: {required}
    },
     created() {
        EventBus.$on('Data', (datas) => {
            this.ContactList =datas;
        })
    },
    data: () => ({
        title: '',
        content: '',
        ContactList: [],
        success: false,
        errors:false
    }),
    computed: {
        emailErrors () {
            const errors = []
            if (!this.$v.title.$dirty) return errors
            !this.$v.title.required && errors.push('Title is required')
            return errors
        },
        ContentErrors () {
            const errors = []
            if(!this.$v.content.$dirty) return errors
            !this.$v.content.required && errors.push('Content is reqired')
            return errors
        }
    },
    methods: {
        submit () {
            this.$v.$touch()
            
            axios.post('http://localhost:3000/mail', {
                title: this.title,
                content: this.content,
                contact: this.ContactList
            })
            .then( res => {
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
    h1 {
        font-size: 18px;
        font-weight: bold;
        font-family: sans-serif;
    }
    button.v-btn.v-btn--contained.theme--light.v-size--default.error {
        cursor: pointer;
    }
</style>