import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App.vue 样式', () => {
    it('正确应用 CSS 变量', () => {
        const wrapper = mount(App);
        const appDiv = wrapper.find('#app');
        expect(appDiv.attributes('style')).toContain('width: 100px');
    });
});