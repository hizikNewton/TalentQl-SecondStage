import { PagePanel } from './styles'
const Page = ({ children, style }: { children: any; style?: object }) => {
    return <PagePanel style={style}>{children}</PagePanel>
  }

export default Page