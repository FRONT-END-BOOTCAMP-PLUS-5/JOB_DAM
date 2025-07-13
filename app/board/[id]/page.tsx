'use client'
import { useParams } from 'next/navigation';

export default function Item(){
  const params = useParams();
  const { id } = params;

  return (
    <div>
      {id}
    </div>
  );
};