// import Map from '../components/Map';
import dynamic from 'next/dynamic';

  const Map = dynamic(() => import('../components/Map'), {ssr: false});

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Map />
    </main>
  )
}
