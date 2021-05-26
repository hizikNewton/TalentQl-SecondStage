import Routers from './routes'
import {Provider} from 'react-redux'
import { rootReducer } from './redux/reducers';
import {defaultTheme, GlobalStyle} from "./globalStyles";
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {applyMiddleware, createStore} from 'redux'
import { configureFakeBackend } from 'helpers/fake-bakend';


export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

configureFakeBackend();

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