import { h } from 'vue'

const StubComponent = {
  render() {
    return h('div', { style: 'display: none' }, 'Stub')
  },
  methods: {
    renderChart() {
      console.log('Chart rendering is stubbed')
    }
  }
}

const StubPlugin = {
  install() {}
}

const StubObject = {}

export { StubComponent, StubPlugin, StubObject, StubComponent as Bar }
export default StubObject
