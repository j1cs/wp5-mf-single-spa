import {h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App, {});
        }
    }
});
export const {bootstrap, mount, unmount} = vueLifecycles;
