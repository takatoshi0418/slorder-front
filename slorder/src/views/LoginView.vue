<template>
  <v-container>
    <ValidationObserver v-slot="{invalid}" ref="observer">
      <form @submit.prevent="submit">
        <ValidationProvider rules="required" v-slot="{errors}" :name="$t('common.username')">
          <v-text-field
            v-model="username"
            :label="$t('common.username')"
            :error-messages="errors" />
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{errors}" :name="$t('common.password')">
          <v-text-field
            v-model="password"
            :label="$t('common.password')"
            :error-messages="errors"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            autocomplete="on" />
        </ValidationProvider>
        <v-btn type="submit" :disabled="invalid" class="px-12">{{$t('common.login')}}</v-btn>
      </form>
    </ValidationObserver>
  </v-container>
</template>
<script>
  export default {
    name: 'LoginView',
    data: function() {
      return {
        username: '',
        password: '',
        invalid: false,
        show: false,
        errors: []
      };
    },
    methods: {
      submit () {
        this.$refs.observer.validate();

        if(this.errors.length === 0) {
          this.$router.push({name: 'orderList'})
        }
      }
    }
  }
</script>