import Routers from './routes'
import {Provider} from 'react-redux'
import { rootReducer } from './redux/reducers';
import { createStore} from 'redux'
import {GlobalStyles} from "./globalStyles";

export const store = createStore(rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
  return (
    <Provider store={store}>
        <GlobalStyles/>
       <Routers />
    </Provider>
  )
}

export default App