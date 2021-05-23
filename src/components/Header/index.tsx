import * as S from './styles'
import LogoutIcon from 'assets/icons/logoutIcon'
import React from 'react'

interface Props {
    
}

const Header:React.FC<Props> = () => {
    return (
        <S.Head>
            {'SHAPES'}
            <button>
                {'Logout'}
                <LogoutIcon/>
            </button>
        </S.Head>
    )
}

export default Header
