import { useGetCurrentUserQuery } from './api/account/account.api'
import { useToken } from './hooks/auth/useToken'
import { useNavigation } from './hooks/navigation/useNavigation'

function App() {
  const navigation = useNavigation()
  const { isChecking } = useToken()

  const { data } = useGetCurrentUserQuery()

  console.log('data', data)

  return <div className='App'>{!isChecking && navigation}</div>
}

export default App
