import { Component } from 'react'
import storage, { getSessionStorage } from 'helpers/storage'
import { colors, generateItem, shapes } from 'api/data'
import Header from '../../components/Header'
import { setItemAction,selectAllItemAction } from 'redux/actions'
import  Filters  from './Filters'
import {Main} from './styles'
import { connect, ConnectedProps } from 'react-redux'
import { IItems } from 'api/data/types'

interface Props extends PropFromRedux{
}
interface State {
    items:IItems
}

class Home extends Component<Props, State> {
    state = {
        items:[]
    }
    constructor(props:Props){
        super(props)
        let itemStorage = getSessionStorage(storage.items);
        if(itemStorage && itemStorage.length!==0){
            this.setState({items:itemStorage})
        }
        else{
            const data = generateItem()
            this.props.setItemAction(data)
            this.setState({items:data})
            }
        this.props.selectAllItemAction([...colors],[...shapes])
        }
    
    render() {
        return (
            <div>
               <Header/>
                <Main>
                <Filters items={this.state.items}/>
                </Main> 
            </div>
        )
    }
}


const mapDispatchToProps = {
    setItemAction,
    selectAllItemAction
}

const connector = connect(null,mapDispatchToProps)

type PropFromRedux = ConnectedProps<typeof connector>

export default connector(Home)



