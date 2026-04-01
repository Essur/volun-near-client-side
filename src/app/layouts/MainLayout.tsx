import { Footer } from "@/shared/ui/layout/Footer"
import { NavBar } from "@/widgets/navbar/ui/NavBar"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1"><Outlet/></main>
      <Footer/>
    </div>
  )
}
