import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

const Home = lazy(() => import('./views/Home'))
const Settings = lazy(() => import('./views/Settings'))

/**
 * @desc application router
 * @param {Object} appStore
 */
const AppRouter = ({ appStore }) => {
  return (
    <Router>
      <Suspense fallback={<div className="split-loader" />}>
        <Route path="/" exact render={(props) => <Home {...props} appStore={appStore} />} />
        <Route path="/settings" render={(props) => <Settings {...props} appStore={appStore} />} />
      </Suspense>
    </Router>
  )
}

export default AppRouter
