import { extend, localize } from "vee-validate";
import { min, required, email, numeric, confirmed, max } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";

// Install rules
extend("required", required);
extend("min", min);
extend("email", email);
extend("numeric", numeric);
extend("confirmed", confirmed);
extend("max", max);

//Ovewrite some default error messages
en.messages.confirmed='The password does not match'
en.messages.required = 'This field is required';
en.messages.min = 'The {_field_} must be at least {length} characters'


// Install messagess
localize({
  en
});
