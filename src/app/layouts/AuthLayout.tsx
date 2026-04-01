import { Link, Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span>VolunNear App</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Back to home
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  )
}