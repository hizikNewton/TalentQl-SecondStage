import { Component } from 'react'
import { colors, generateItem, shapes } from 'api/data'
import Header from '../../components/Header'
import { setItemAction,selectAllItemAction } from 'redux/actions'
import {Main} from './styles'
import { connect, ConnectedProps } from 'react-redux'
import { IItems } from 'api/data/types'
import ClassFilter from './ClassFilter'

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
            const data = generateItem()
            this.props.setItemAction(data)
            this.props.selectAllItemAction([...colors],[...shapes])
        }
    
    render() {
        return (
            <div>
               <Header/>
                <Main>
                <ClassFilter/>
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



