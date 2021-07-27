import { useSession } from 'next-auth/client'
import React, { ReactElement } from 'react'
import Router, { useRouter } from 'next/router'

const Application = (): ReactElement => {
  const session = useSignIn()
  return <div>Application Page</div>
}

export default Application

export function useSignIn() {
  const [session, loading] = useSession()
  const { pathname } = useRouter()

  if (session) {
    return session
  } else if (!loading && pathname !== '/login') {
    Router.push('/login')
  }
}
