import React, { useEffect, useState } from 'react'
import storage, { getSessionStorage } from 'helpers/storage'
import { generateItem } from 'redux/data'
import { IItems } from 'redux/data/types'
import Header from '../../components/Header'
import { useDispatch } from 'react-redux'
import { setItemAction } from 'redux/actions'
import { ItemContainer } from './ItemContainer'

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
        <ItemContainer items={items}/>
        </>
    )
}

export default Home


