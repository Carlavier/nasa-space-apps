// PaperGraph3D.jsx
import React, { useMemo, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";

const COLORS = [
    "#3b82f6", // blue
    "#a855f7", // purple
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#14b8a6", // teal
];

// simple string hash to choose color
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLORS[Math.abs(hash) % COLORS.length];
}

export default function PaperGraph3D({ articles, onSelect }) {
    const fgRef = useRef(null);

    // transform articles into graph data
    const data = useMemo(() => {
        const nodes = Object.values(articles).map(article => ({
            id: article.id,
            title: article.title,
            abstract: article.abstract,
            val: article.ref_cited_by?.length || 1,
            color: stringToColor(article.title),
        }));

        const nodeIds = new Set(nodes.map(n => n.id));

        const links = Object.values(articles).flatMap(article =>
            (article.ref_cited || []).map(targetId => ({
                source: article.id,
                target: targetId
            }))
        ).filter(link => nodeIds.has(link.source) && nodeIds.has(link.target));

        return { nodes, links };
    }, [articles]);

    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={data}
            backgroundColor="#0a0e1a"
            nodeThreeObject={(node) => {
                const geometry = new THREE.SphereGeometry(node.size, 32, 32);
                const material = new THREE.MeshStandardMaterial({
                    color: node.color,
                    emissive: "#141824",
                    roughness: 0.5,
                    metalness: 0.6,
                });
                return new THREE.Mesh(geometry, material);
            }}
            nodeLabel={(node) =>
                `<div style="max-width:300px">
          <strong>${node.title}</strong><br/>
          <small>${node.abstract}</small>
        </div>`
            }
            linkColor={() => "#3b82f6"}
            linkOpacity={0.4}
            linkWidth={1}
            onNodeClick={(node) => {
                // pass the full article object back to parent
                onSelect?.(articles[node.id]);
                // zoom into node
                const distance = 120;
                const distRatio =
                    1 +
                    distance /
                    Math.hypot(node.x || 0, node.y || 0, node.z || 0);

                fgRef.current.cameraPosition(
                    {
                        x: (node.x || 0) * distRatio,
                        y: (node.y || 0) * distRatio,
                        z: (node.z || 0) * distRatio,
                    },
                    node,
                    3000 // ms transition
                );
            }}
        />
    );
}
