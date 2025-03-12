import { Skeleton } from './skeleton';

const ProductCardSkeleton = ({ variant }: { variant: 'full' | 'card' }) => {
  const skeleton =
    variant === 'card' ? (
      <div className='min-w-[171px] space-y-2'>
        <Skeleton className='h-[228px] w-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='h-4 w-full' />
        </div>
        <Skeleton className='h-8 w-full mt-7' />
      </div>
    ) : (
      <div className='py-6 max-w-sm'>
        <Skeleton className='h-5 w-48' />
        <Skeleton className='h-[333px] mt-4' />
        <Skeleton className='h-4 w-10 mt-4' />
        <Skeleton className='h-4 mt-4' />
        <Skeleton className='h-4 mt-4' />
        <Skeleton className='h-4 mt-4' />
        <Skeleton className='h-4 mt-4' />
        <Skeleton className='h-3 mt-8 w-[300px]' />
        <Skeleton className='h-3 mt-4 w-[300px]' />
        <Skeleton className='h-3 mt-4 w-[300px]' />
        <Skeleton className='h-15 mt-8' />
      </div>
    );
  return skeleton;
};

export { ProductCardSkeleton };
