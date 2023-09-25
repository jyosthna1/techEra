import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import CourseDetails from './components/CourseDetails'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetails} />
  </Switch>
)

export default App
