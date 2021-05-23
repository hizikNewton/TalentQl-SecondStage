import Routers from './routes'
import {Provider} from 'react-redux'
import { rootReducer } from './redux/reducers';
import { createStore} from 'redux'
import {defaultTheme, GlobalStyle} from "./globalStyles";
import { ThemeProvider } from 'styled-components';

export const store = createStore(rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
        <Routers />
       </ThemeProvider>
    </Provider>
  )
}

export default App