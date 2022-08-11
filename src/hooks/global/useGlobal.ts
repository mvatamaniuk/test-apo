import { useEffect } from 'react'
import { useUseGetAllDynamicQuery } from '../../api/global/global.api'
import { setGlobal } from '../../redux/global/global.slice'
import { useAppDispatch } from '../redux/useRedux'

export const useGlobal = () => {
  const { data } = useUseGetAllDynamicQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      dispatch(
        setGlobal({
          defaultLanguageID: data.value[0].defaultLanguageID,
          metaDescription: data.value[0].metaDescription,
        })
      )
    }
  }, [data, dispatch])
}
