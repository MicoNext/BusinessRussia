'use client';

import dynamic from 'next/dynamic';

const YMapWidget = dynamic(
  () => import('@/components/YMap').then(m => m.YMapWidget),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Загрузка карты...</div>
      </div>
    )
  }
);

export default function ClientMap() {
  return (
    <div className="w-full h-64 lg:h-96">
      <YMapWidget />
    </div>
  );
}