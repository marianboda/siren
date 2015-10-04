var React = require('react')
import store from './store'

class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.name} {store.getState()}</div>
  }
}




React.render(<Hello name="Svet"/>, document.getElementById('content'))
