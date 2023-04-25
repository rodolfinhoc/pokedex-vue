import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import 'primevue/resources/themes/saga-blue/theme.css'; // escolha o tema que preferir
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Card', Card);
app.mount('#app');
