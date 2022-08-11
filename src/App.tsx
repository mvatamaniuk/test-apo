import { useGetCurrentUserQuery } from './api/account/account.api'
import { useUseGetAllDynamicQuery } from './api/global/global.api'
import { useToken } from './hooks/auth/useToken'
import { useGlobal } from './hooks/global/useGlobal'
import { useNavigation } from './hooks/navigation/useNavigation'

function App() {
  const navigation = useNavigation()
  const { isChecking } = useToken()

  const { data } = useGetCurrentUserQuery()
  // const { data: global } = useUseGetAllDynamicQuery()

  useGlobal()

  return <div className='App'>{!isChecking && navigation}</div>
}

export default App
