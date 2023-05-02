import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import Card from 'primevue/card';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import ProgressBar from 'primevue/progressbar';
import Image from 'primevue/image';
import Dropdown from 'primevue/dropdown';
import ToggleButton from 'primevue/togglebutton';
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
app.mount('#app');
