
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Add some floating 3D objects (X and O shapes)
    const createXShape = () => {
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x5D5FEF,
        shininess: 100,
        specular: 0x5D5FEF,
      });
      
      const group = new THREE.Group();
      
      // Create two cylinders that cross each other
      const geometry1 = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
      const stick1 = new THREE.Mesh(geometry1, material);
      stick1.rotation.z = Math.PI / 4;
      
      const geometry2 = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
      const stick2 = new THREE.Mesh(geometry2, material);
      stick2.rotation.z = -Math.PI / 4;
      
      group.add(stick1);
      group.add(stick2);
      
      return group;
    };
    
    const createOShape = () => {
      const geometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0xEF5DA8,
        shininess: 100,
        specular: 0xEF5DA8,
      });
      return new THREE.Mesh(geometry, material);
    };
    
    // Add multiple X and O shapes to the scene
    for (let i = 0; i < 7; i++) {
      const x = createXShape();
      x.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      x.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      x.scale.multiplyScalar(0.5 + Math.random() * 0.5);
      group.add(x);
      
      const o = createOShape();
      o.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      o.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      o.scale.multiplyScalar(0.5 + Math.random() * 0.5);
      group.add(o);
    }
    
    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the entire group slowly
      group.rotation.x += 0.001;
      group.rotation.y += 0.002;
      
      // Animate individual objects
      group.children.forEach((child, i) => {
        child.rotation.x += 0.003 * (i % 3);
        child.rotation.y += 0.002 * ((i + 1) % 3);
        child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default Background3D;
