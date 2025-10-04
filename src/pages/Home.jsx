import { Sidebar } from "../components/sidebar"
import SpaceshipInterior from "./ControlPanel"
import Dashboard from "./Dashboard"
import SpaceshipInteriorNeumorphic from "./NeuControlPanel"
import NewControlPanel from "./NewControllPanel"

const Home = () => {
  return (
    <>
      <div className="w-full h-full ">
        {/* <Sidebar /> */}
        {/* <h1 className="underline">Hi</h1> */}
        {/* <Dashboard /> */}
        {/* <SpaceshipInterior /> */}
        {/* <NewControlPanel /> */}
        <SpaceshipInteriorNeumorphic />
      </div>
    </>
  )
}

export default Home
