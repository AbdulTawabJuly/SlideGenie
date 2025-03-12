import React ,{Suspense} from 'react'
import CreatePageSkeleton from './_components/CreatePage/CreatePageSkeleton'

type Props = {}

const index = (props: Props) => {
  return (
    <main className='w-full h-full pt-6'>
      <Suspense fallback={<CreatePageSkeleton/>}>

      </Suspense> 
    </main>
  )
}

export default index