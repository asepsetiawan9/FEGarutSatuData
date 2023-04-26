import Artikel from '@/components/home/Artikel';
import Counter from '@/components/home/Counter';
import Demografi from '@/components/home/Demografi';
import Slide from '@/components/home/Slide';

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-between sm:flex-row">
        <Slide />
      </div>
      <Artikel />
      {/* count */}
      <div className="mt-5 sm:py-4">
        <Counter />
      </div>
      <div className="flex flex-col py-10 sm:flex-row">
        <Demografi />
      </div>
    </>
  );
}
