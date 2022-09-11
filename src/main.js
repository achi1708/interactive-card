import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { maska } from "maska";

//import "./assets/main.css";
//import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
/*import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";*/
import { BootstrapVue3 } from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "./assets/main.scss";

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);
/* Registering the directive globally. */
app.directive("maska", maska);

app.mount("#app");
