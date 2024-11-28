import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Sphere } from '@react-three/drei';

export function Earth() {
  const colorMap = useLoader(
    TextureLoader,
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  );

  return (
    <Sphere args={[1, 64, 64]}>
      <meshBasicMaterial
        map={colorMap}
      />
    </Sphere>
  );
}