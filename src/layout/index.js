import withRouter from 'umi/withRouter'
import PropTypes from 'prop-types'
import {
  connect
} from 'dva'

const Widget = ({
  children
}) => (
  <div>
    <div>header</div>
    <div>{children}</div>
    <div>footer</div>
  </div>
)


Widget.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withRouter(connect()(Widget))