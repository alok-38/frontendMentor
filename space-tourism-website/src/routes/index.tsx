import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })
import logo from '../../public/Logo.png'

function Home() {
  return (
    <nav>
      <img src={logo} alt="Logo" />
    </nav>
  )
}
