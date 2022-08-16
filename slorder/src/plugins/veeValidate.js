import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import {required, max, integer} from 'vee-validate/dist/rules';
import ja from 'vee-validate/dist/locale/ja.json';
import Vue from "vue";

extend('integer', integer);
extend('required', required);
extend('max', max);
localize('ja', ja);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

export default {}