import { mount } from '@vue/test-utils'
import TranslationInput from '../src/components/TranslationInput.vue'

describe('TranslationInput.vue', () => {
  it('renders textarea and button', () => {
    const wrapper = mount(TranslationInput)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').text()).toMatch(/Translate/i)
  })
})
