import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import SelectButton from 'primevue/selectbutton';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('ProgressSpinner', ProgressSpinner);
app.component('ProgressBar', ProgressBar);
app.component('Image', Image);
app.component('Dropdown', Dropdown);
app.component('ToggleButton', ToggleButton);
app.component('Badge', Badge);
app.component('SelectButton', SelectButton);
app.component('Dialog', Dialog);
app.directive('tooltip', Tooltip);
app.mount('#app');
