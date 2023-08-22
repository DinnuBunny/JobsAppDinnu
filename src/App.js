import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedComponent from './Component/ProtectedComponent'
import Login from './Component/Login'
import Home from './Component/Home'
import Jobs from './Component/Jobs'
import JobItemDetails from './Component/JobItemDetails'
import NotFound from './Component/NotFound'
import './App.css'

// ccbp publish RJSCPAW11J dinnujobapp.ccbp.tech
// Replace your code here
const App = () => (
  <div className="responsive-container">
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedComponent exact path="/" component={Home} />
      <ProtectedComponent exact path="/jobs" component={Jobs} />
      <ProtectedComponent exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
