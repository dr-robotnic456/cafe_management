import { Inter } from 'next/font/google'
import Dashboard from './Dashboard'
import Auth from '@/components/Auth'

const inter = Inter({ subsets: ['latin'] })

function Home() {
  return (
    <div className='h-screen bg-[#f1f1f1]'>
      <Dashboard />
    </div>
  )
}

export default Auth(Home)