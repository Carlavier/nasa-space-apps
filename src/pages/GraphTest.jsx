import PaperGraph3D from "../components/Graph"
import { articles } from "../constants"

export const GraphTest = () => {
    return (
        <>
            <PaperGraph3D articles={articles} onSelect={() => { }} />
        </>
    )
}
