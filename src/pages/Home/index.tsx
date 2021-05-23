import React, { useEffect, useState } from 'react'
import storage, { getSessionStorage } from 'helpers/storage'
import { generateItem } from 'api/data'
import { IItems } from 'api/data/types'
import Header from '../../components/Header'
import { useDispatch } from 'react-redux'
import { setItemAction } from 'redux/actions'
import { Filters } from './Filters'
import {Main} from './styles'

interface Props {
    
}

const Home:React.FC<Props> = () => {
    const dispatch = useDispatch();

    const [items, setItems] = useState<IItems>([]);

    const itemStorage = getSessionStorage(storage.items)

    useEffect(() => {
        const initializeItem = (items:IItems) =>{
                dispatch(setItemAction(items))
            }
        
        if(!!itemStorage?.items){
            setItems([...itemStorage.items])
        }
        else{
                const data = generateItem()
                initializeItem(data)
                const itemStorage = getSessionStorage(storage.items)
                setItems(itemStorage.items)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
        <Header/>
        <Main>
            <Filters items={items}/>
        </Main>
        </>
    )
}

export default Home


