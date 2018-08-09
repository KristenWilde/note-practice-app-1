import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Practice from './Practice'
import SetGoal from './SetGoal'
import Progress from './Progress'
import Buddies from './Buddies'
import Account from './Account'
import FAQ from './FAQ'
import Register from './Register'
// import NotFound from './NotFound'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/register" component={Register}/>
      <Route path="/:userId/practice" component={Practice}/>
      <Route path="/:userId/goal/new" component={SetGoal}/>
      <Route path="/:userId/progress" component={Progress}/>
      <Route path='/:userId/buddies' component={Buddies}/>
      <Route path='/:userId/account' component={Account}/>
      <Route exact path='/faq' component={FAQ}/>
      <Route exact path="/logout" component={Home}/>
      {/*<Route component={NotFound} />*/}
    </Switch>
  </BrowserRouter>
)

export default Router

//     'Practice': `/${this.props.userId}/practice`,
//     'Set a Goal': `/${this.props.userId}/goal/new`,
//     'View Progress': `/${this.props.userId}/progress`,
//     'Music Buddies': `/${this.props.userId}/buddies`,
//     'FAQ': '/faq',
//     'My Account':`/${this.props.userId}/account`,
//     'Log out': '/logout',
