'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ProductViewer3DProps {
  modelUrl?: string;
  width?: number;
  height?: number;
  onColorChange?: (color: string) => void;
  onMaterialChange?: (material: string) => void;
}

const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  modelUrl = '/models/sample.glb',
  width = 600,
  height = 400,
  onColorChange,
  onMaterialChange
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [selectedMaterial, setSelectedMaterial] = useState('standard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Available colors for customization
  const colors = [
    { name: 'Red', value: '#ff0000' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#00ff00' },
    { name: 'Yellow', value: '#ffff00' },
    { name: 'Purple', value: '#800080' },
    { name: 'Orange', value: '#ffa500' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#ffffff' }
  ];

  // Available materials
  const materials = [
    { name: 'Standard', value: 'standard' },
    { name: 'Metallic', value: 'metallic' },
    { name: 'Glossy', value: 'glossy' },
    { name: 'Matte', value: 'matte' }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl, // Using the sample GLB file we created
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(1);
        model.position.set(0, 0, 0);
        
        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        scene.add(model);
        modelRef.current = model;
        setIsLoading(false);
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Adjust camera position based on model size
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(0, 0, maxDim * 2);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        setError('Failed to load 3D model');
        setIsLoading(false);
        
        // Create a fallback cube if model fails to load
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ color: selectedColor });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
        modelRef.current = cube;
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Add renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Cleanup function
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, width, height]);

  // Update model color
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.Material) {
            (child.material as any).color = new THREE.Color(selectedColor);
          }
        }
      });
    }
    onColorChange?.(selectedColor);
  }, [selectedColor, onColorChange]);

  // Update model material
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          let newMaterial;
          switch (selectedMaterial) {
            case 'metallic':
              newMaterial = new THREE.MeshStandardMaterial({
                color: selectedColor,
                metalness: 0.8,
                roughness: 0.2
              });
              break;
            case 'glossy':
              newMaterial = new THREE.MeshStandardMaterial({
                color: selectedColor,
                metalness: 0.1,
                roughness: 0.1
              });
              break;
            case 'matte':
              newMaterial = new THREE.MeshLambertMaterial({
                color: selectedColor
              });
              break;
            default:
              newMaterial = new THREE.MeshStandardMaterial({
                color: selectedColor,
                metalness: 0.3,
                roughness: 0.7
              });
          }
          child.material = newMaterial;
        }
      });
    }
    onMaterialChange?.(selectedMaterial);
  }, [selectedMaterial, selectedColor, onMaterialChange]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 3D Viewer */}
      <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
        <div ref={mountRef} />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading 3D Model...</p>
            </div>
          </div>
        )}
        
        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-100 bg-opacity-75">
            <div className="text-center text-red-600">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
              <p className="text-xs mt-2">Showing fallback cube</p>
            </div>
          </div>
        )}
      </div>

      {/* Color Customization */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Choose Color:</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                selectedColor === color.value
                  ? 'border-gray-800 scale-110'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: color.value } as React.CSSProperties}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Material Customization */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">Choose Material:</h3>
        <div className="grid grid-cols-2 gap-2">
          {materials.map((material) => (
            <button
              key={material.value}
              onClick={() => setSelectedMaterial(material.value)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedMaterial === material.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
              }`}
            >
              {material.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Info */}
      <div className="text-sm text-gray-600 text-center max-w-md">
        <p><strong>Controls:</strong></p>
        <p>• Left click + drag: Rotate</p>
        <p>• Right click + drag: Pan</p>
        <p>• Scroll: Zoom in/out</p>
      </div>
    </div>
  );
};

export default ProductViewer3D;