import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Sphere } from '@react-three/drei';

export function Earth() {
  const [colorMap, normalMap, specularMap] = useLoader(TextureLoader, [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png'
  ]);

  return (
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        metalnessMap={specularMap}
        normalScale={[0.05, 0.05]}
        roughness={0.7}
        metalness={0.1}
      />
    </Sphere>
  );
}