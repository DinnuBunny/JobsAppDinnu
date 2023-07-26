import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedComponent = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedComponent
