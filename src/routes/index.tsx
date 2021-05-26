import { FC, lazy, Suspense } from 'react'
import { BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Page from '../components/Page'


const Login = lazy(() => import('../pages/Auth/Login/Login'))
const Home = lazy(() => import('../pages/Home'))

const Containers: CustomRouter.Route[] = [
    {
      name: 'Home',
      path: '/home',
      exact: true,
      comp: Home,
    },
    {
      name: 'Login',
      path: '/',
      exact: true,
      comp: Login,
    },
   
]

const RouterComp = ({ container, routeProps }:{ container: CustomRouter.Route; routeProps: any })=>{
  return <container.comp {...routeProps} />
}

const Routes:FC = () => {

    return(
    <Router>
        <Route render={(props: any) => (
            <Page>
                <Suspense fallback={<span />}>
                <Switch location={props.location}>
                {Containers.map(container => (
                  <Route
                    {...container}
                    key={container.name}
                    render={routeProps => <RouterComp container={container} routeProps={routeProps} />}
                  />
                ))}
                <Redirect from="*" to="/404" />
                </Switch>
                </Suspense>
            </Page>)} />
    </Router>
    )
}

export default Routes 