import EmptyFilter from '@/app/components/EmptyFilter'
import React from 'react'

export default function SignIn({searchParams}: {searchParams: {callbackUrl: string}}) {
  return (
     <EmptyFilter
      title='You must be logged in to access this page'
        subtitle='Please login to continue'
        showLogin
        callbackUrl={searchParams.callbackUrl}
      />
  )
}
