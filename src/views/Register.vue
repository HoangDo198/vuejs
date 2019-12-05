<template>
  <div id="Register">
    <h1>REGISTER</h1>
    <form>
      <v-alert
      border="right"
      colored-border
      type="error"
      elevation="2"
      v-if="errors"
    >
      {{errors}}
    </v-alert>
     <v-alert
      border="right"
      colored-border
      type="success"
      elevation="2"
      v-if="success"
    >
      {{success}}
    </v-alert>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        dense
        outlined
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        :error-messages="passwordErrors"
        :counter="10"
        label="Password"
        dense
        outlined
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

       <v-text-field
        v-model="cfpassword"
        type="password"
        :error-messages="cfpasswordErrors"
        :counter="10"
        label="Confirm Password"
        dense
        outlined
        @input="$v.cfpassword.$touch()"
        @blur="$v.cfpassword.$touch()"
      ></v-text-field>

      <v-btn 
      class="mr-4 btn-submit" 
      @click.prevent="submit"
      color="success"
      >
      Register
      </v-btn>
     
      <v-btn 
      style="float:right; margin-right:0!important"
      class="mr-4 btn-submit" 
      @click.prevent="login"
      color="error"
      >
      Login
      </v-btn>

    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    name: 'Register',
    mixins: [validationMixin],

    validations: {
      password: { required, maxLength: maxLength(10) },
      cfpassword:  { required, maxLength: maxLength(10), sameAsPassword: sameAs('password') },
      email: { required, email },
    },

    data: () => ({
      password: '',
      email: '',
      cfpassword: '',
      errors: false,
      success: false
    }),

    computed: {
        cfpasswordErrors () {
            const errors = []
            if (!this.$v.cfpassword.$dirty) return errors
            !this.$v.cfpassword.maxLength && errors.push('Confirm password must be at most 10 characters long')
            !this.$v.cfpassword.required && errors.push('Confirm password is required.')
            !this.$v.cfpassword.sameAsPassword && errors.push('Passwords must be identical.')
            return errors
        },
        passwordErrors () {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.maxLength && errors.push('Password must be at most 10 characters long')
            !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
    },

    methods: {
      submit () {
        this.$v.$touch();
        axios.post('http://localhost:3001/user/register', {
          user_email: this.email,
          password: this.password
        }).then( () => {
          this.success="Account registration successful";
        }).catch(err => {
          if(err.response.status === 400) {
            this.errors="Email already in use ";
          }
        })
      },
      login () {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  }
</script>

<style scoped>
  #Register {
    position: absolute;
    top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		width:400px;
		padding:40px;
    border: 1px solid #999;
    border-radius: 5px;
  }
  h1{
    margin-bottom: 10px;
  }
  .btn-submit {
    margin: 10px 0;
  }
</style>