import { h } from 'vue'

const StubComponent = {
  render() {
    return h('div', { style: 'display: none' }, 'Stub')
  }
}

const StubPlugin = {
  install() {}
}

const StubObject = {}

export { StubComponent, StubPlugin, StubObject }
export default StubObject
