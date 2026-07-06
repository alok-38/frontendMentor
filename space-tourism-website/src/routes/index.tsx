import { createFileRoute, Link } from '@tanstack/react-router'
import logo from '/Logo.png'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-screen bg-[url('/earth.png')] bg-cover bg-center">
      
      {/* NAVBAR */}
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between px-10 py-6"
      >
        {/* LEFT SIDE */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logo} alt="Go to homepage" />
          </Link>

          {/* Decorative line */}
          <div
            className="h-px w-150 bg-white/30"
            aria-hidden="true"
          />
        </div>

        {/* RIGHT SIDE NAV */}
        <ul className="flex gap-10 bg-white/10 backdrop-blur-md px-10 py-6">
          
          <li>
            <Link
              to="/"
              activeProps={{
                className: 'border-b-2 border-white',
                'aria-current': 'page',
              }}
              className="flex gap-2 px-4 py-2 text-white focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4"
            >
              <span aria-hidden="true" className="font-bold">
                00
              </span>
              HOME
            </Link>
          </li>

          <li>
            <Link
              to="/destination"
              activeProps={{
                className: 'border-b-2 border-white',
                'aria-current': 'page',
              }}
              className="flex gap-2 px-4 py-2 text-white focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4"
            >
              <span aria-hidden="true" className="font-bold">
                01
              </span>
              DESTINATION
            </Link>
          </li>

          <li>
            <Link
              to="/crew"
              activeProps={{
                className: 'border-b-2 border-white',
                'aria-current': 'page',
              }}
              className="flex gap-2 px-4 py-2 text-white focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4"
            >
              <span aria-hidden="true" className="font-bold">
                02
              </span>
              CREW
            </Link>
          </li>

          <li>
            <Link
              to="/technology"
              activeProps={{
                className: 'border-b-2 border-white',
                'aria-current': 'page',
              }}
              className="flex gap-2 px-4 py-2 text-white focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4"
            >
              <span aria-hidden="true" className="font-bold">
                03
              </span>
              TECHNOLOGY
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  )
}