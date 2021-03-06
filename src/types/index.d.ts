declare namespace CustomRouter {
    interface Route {
      name: string
      path: string
      params?: string
      exact?: boolean
      comp: React.FunctionComponent<any>
    }
  }


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 interface IUser{
    id?:number,
    fullname:string
    username:string,
    password:string,
    token?:string

}

interface Action<T>{
  type:string;
  payload:|T|Partial<T>
}