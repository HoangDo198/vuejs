<template>
  <div id="login">
    <div class="container">
      <h1>LOGIN</h1>
      <v-form>
        <v-text-field
          autocomplete="off"
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

        <v-alert border="right" type="error" elevation="2" v-if="errors">Wrong email or password</v-alert>

        <v-btn class="mr-4 btn-submit" @click.prevent="submit" color="success">Login</v-btn>

        <v-btn
          style="float:right; margin-right:0!important"
          class="mr-4 btn-submit"
          @click.prevent="register"
          color="error"
        >Register</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  metaInfo: {
    title: "Mail Marketing"
  },
  name: "Login",
  mixins: [validationMixin],

  validations: {
    password: { required, maxLength: maxLength(10) },
    email: { required, email }
  },

  data: () => ({
    password: "",
    email: "",
    errors: false
  }),

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 10 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      let user_email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { user_email, password })
        .then(res => {
          this.$router.push({ name: "Dashboard" });
          console.log(res);
        })
        .catch(err => {
          this.errors = err;
        });
    },

    register() {
      this.$router.push({
        name: "Register"
      });
    }
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  border: 1px solid #cccc;
  border-radius: 5px;
}
h1 {
  margin-bottom: 10px;
}
.btn-submit {
  margin: 10px 0;
  text-transform: uppercase;
}
</style>