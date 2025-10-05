// PaperGraph3D.jsx
import React, { useMemo, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";

const COLORS = [
  "#6b7280", // muted blue-gray
  "#7c3aed", // muted violet
  "#4b5563", // dark slate (muted green-gray)
  "#b45309", // burnt amber
  "#9f1239", // muted red
  "#0f766e", // deep muted teal
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
            id: article.pmcid,
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
            // Add lighting for realistic planet appearance
            enablePointerInteraction={true}
            onEngineStop={() => {
                // Add ambient and directional lighting for planets
                const scene = fgRef.current.scene();
                
                // Ambient light for overall illumination
                const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
                scene.add(ambientLight);
                
                // Directional light to simulate sunlight
                const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
                directionalLight.position.set(100, 100, 50);
                directionalLight.castShadow = true;
                scene.add(directionalLight);
                
                // Point light for additional illumination
                const pointLight = new THREE.PointLight(0xffffff, 0.5, 1000);
                pointLight.position.set(0, 0, 100);
                scene.add(pointLight);
            }}
            // Force simulation settings to bring nodes closer
            d3AlphaDecay={.9}
            d3VelocityDecay={0.2}
            // Cooling settings for faster convergence
            cooldownTicks={200}
            cooldownTime={10000}
            // Configure forces when engine starts
            onEngineTick={() => {
                if (fgRef.current && fgRef.current.d3Force) {
                    // Set charge force to be less repulsive (brings nodes closer)
                    fgRef.current.d3Force('charge').strength(-50);
                    // Set link distance to be shorter
                    fgRef.current.d3Force('link').distance(25).strength(0.8);
                }
                
                // Animate planet rotations
                if (fgRef.current) {
                    const scene = fgRef.current.scene();
                    scene.traverse((child) => {
                        if (child.isGroup && child.userData.rotationSpeed) {
                            child.rotation.y += child.userData.rotationSpeed;
                        }
                    });
                }
            }}
            nodeThreeObject={(node) => {
                // Use val for size, with minimum size of 2 and max of 8
                const nodeSize = Math.max(2, Math.min(8, (node.val || 1) * 0.5));
                const geometry = new THREE.SphereGeometry(nodeSize, 32, 32);
                
                // Create procedural planet texture
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext('2d');
                
                // Create gradient for planet surface
                const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
                gradient.addColorStop(0, node.color);
                gradient.addColorStop(0.7, node.color);
                gradient.addColorStop(1, '#000000');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 256, 256);
                
                // Add noise/texture for planet surface
                const imageData = ctx.getImageData(0, 0, 256, 256);
                const data = imageData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    const noise = Math.random() * 0.3 - 0.15;
                    data[i] = Math.max(0, Math.min(255, data[i] + noise * 255));     // Red
                    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 255)); // Green
                    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 255)); // Blue
                }
                
                ctx.putImageData(imageData, 0, 0);
                
                // Create texture from canvas
                const texture = new THREE.CanvasTexture(canvas);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                
                // Create normal map for surface detail
                const normalCanvas = document.createElement('canvas');
                normalCanvas.width = 256;
                normalCanvas.height = 256;
                const normalCtx = normalCanvas.getContext('2d');
                const normalImageData = normalCtx.createImageData(256, 256);
                const normalData = normalImageData.data;
                
                for (let i = 0; i < normalData.length; i += 4) {
                    const noise = Math.random();
                    normalData[i] = 128 + noise * 50;     // Normal X
                    normalData[i + 1] = 128 + noise * 50; // Normal Y
                    normalData[i + 2] = 255;              // Normal Z (pointing up)
                    normalData[i + 3] = 255;              // Alpha
                }
                
                normalCtx.putImageData(normalImageData, 0, 0);
                const normalTexture = new THREE.CanvasTexture(normalCanvas);
                
                // Enhanced material with planet-like properties
                const material = new THREE.MeshStandardMaterial({
                    map: texture,
                    normalMap: normalTexture,
                    normalScale: new THREE.Vector2(0.5, 0.5),
                    roughness: 0.8,
                    metalness: 0.1,
                    emissive: new THREE.Color(node.color).multiplyScalar(0.1),
                });
                
                // Create the planet mesh
                const planetMesh = new THREE.Mesh(geometry, material);
                
                // Add atmosphere glow effect
                const atmosphereGeometry = new THREE.SphereGeometry(nodeSize * 1.1, 16, 16);
                const atmosphereMaterial = new THREE.MeshBasicMaterial({
                    color: node.color,
                    transparent: true,
                    opacity: 0.2,
                    side: THREE.BackSide,
                });
                const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
                
                // Group planet and atmosphere
                const planetGroup = new THREE.Group();
                planetGroup.add(planetMesh);
                planetGroup.add(atmosphere);
                
                // Add subtle rotation animation
                planetGroup.userData = { rotationSpeed: 0.001 + Math.random() * 0.002 };
                
                return planetGroup;
            }}
            nodeLabel={(node) =>
                `<div style="max-width:300px">
          <strong>${node.title}</strong><br/>
          <small>${node.abstract}</small>
        </div>`
            }
            linkColor={() => "#60a5fa"}
            linkOpacity={0.6}
            linkWidth={2}
            linkDirectionalParticles={1}
            linkDirectionalParticleSpeed={0.005}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleColor={() => "#fbbf24"}
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
