import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/crew')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/crew"!</div>
}
