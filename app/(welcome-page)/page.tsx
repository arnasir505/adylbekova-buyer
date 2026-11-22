'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Steps from '@/components/ui/steps';
import { Icon } from '@/iconpack';
import { palette } from '@/lib/palette';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VISITED_KEY } from '@/lib/constants';

export default function WelcomePage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const router = useRouter();

  // Returning visitors carry the cookie and are redirected by middleware.ts
  // before this page renders. Visitors from before the cookie existed only
  // have the localStorage flag: give them the cookie and send them on.
  useEffect(() => {
    let hasVisited = false;
    try {
      hasVisited = Boolean(localStorage.getItem(VISITED_KEY));
      localStorage.setItem(VISITED_KEY, 'true');
    } catch {}
    document.cookie = `${VISITED_KEY}=1; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    if (hasVisited) router.replace('/products');
  }, [router]);

  // Each background is only requested once the step before it is on screen,
  // instead of all four at once.
  const bg = (n: number) => (step >= n - 1 ? `bg-welcome-${n}` : '');

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.push('/products');
    }
  };

  return (
    <>
      <div
        className={cn(
          'absolute w-full z-[1004] flex flex-col items-center justify-between min-h-screen bg-welcome-1 font-cormorant py-[106px] cursor-pointer transition-all',
          step === 1 ? 'opacity-100' : 'opacity-0'
        )}
        onClick={nextStep}
      >
        <h1 className='text-5xl min-[405px]:text-6xl uppercase text-center text-white'>
          Adylbekova <br /> Buyer
        </h1>
        <div className='max-w-[360px] px-2'>
          <p className='text-2xl min-[405px]:text-4xl uppercase text-white font-medium mb-7'>
            Стиль и роскошь без переплат
          </p>
          <Steps totalSteps={totalSteps} currentStep={step} />
        </div>
      </div>
      <div
        className={cn(
          'absolute w-full z-[1003] flex flex-col items-center justify-between min-h-screen pt-[62px] pb-[106px] cursor-pointer transition-all',
          bg(2),
          step === 2 ? 'opacity-100' : 'opacity-0'
        )}
        onClick={nextStep}
      >
        <div>
          <h1 className='text-2xl uppercase text-center text-white font-cormorant'>
            Adylbekova <br /> Buyer
          </h1>
          <div className='max-w-[363px] mt-[55px] p-[10px] bg-[#3333331A] backdrop-blur-2xl rounded'>
            <p className='text-lg text-white leading-7'>
              <span className='block text-[28px] mb-1'>Привет!</span> Меня зовут
              Айжана, и я байер в Китае, специализирующийся на люксовых репликах
              премиального качества
            </p>
          </div>
        </div>
        <div>
          <div className='max-w-[363px] mt-[55px] p-[10px] bg-[#3333331A] backdrop-blur-2xl mb-5 rounded'>
            <p className='text-lg text-white leading-7'>
              Мы работаем напрямую с проверенными фабриками, чтобы предлагать
              вам топовые копии мировых брендов без переплат.
            </p>
          </div>
          <Steps totalSteps={totalSteps} currentStep={step} />
        </div>
      </div>
      <div
        className={cn(
          'absolute w-full z-[1002] flex flex-col items-center justify-between min-h-screen pt-[62px] pb-[80px] cursor-pointer transition-all',
          bg(3),
          step === 3 ? 'opacity-100' : 'opacity-0'
        )}
        onClick={nextStep}
      >
        <div className='pb-5'>
          <h1 className='text-2xl uppercase text-center text-white font-cormorant'>
            Adylbekova <br /> Buyer
          </h1>
          <div className='max-w-[343px] mt-[40px]'>
            <h2 className='text-[34px] uppercase text-white text-center font-cormorant'>
              Как мы работаем?
            </h2>
            <ul className='flex flex-col items-center gap-11 py-[27px] px-[10px] mt-4 bg-[#3333331A] backdrop-blur-2xl text-white text-lg leading-7 rounded'>
              <li className='flex flex-col items-center gap-[17px] text-center'>
                <Icon
                  name='airplane'
                  size='lg'
                  color={palette.white}
                  height={39}
                  width={39}
                />
                <span>
                  Отправляем заказы по всему миру с надёжной логистикой
                </span>
              </li>
              <li className='flex flex-col items-center gap-[17px] text-center'>
                <Icon
                  name='starCheck'
                  size='lg'
                  color={palette.white}
                  height={39}
                  width={39}
                />
                <span>Проверяем качество перед отправкой</span>
              </li>
              <li className='flex flex-col items-center gap-[17px] text-center'>
                <Icon
                  name='chatHelp'
                  size='lg'
                  color={palette.white}
                  height={39}
                  width={39}
                />
                <span>
                  Помогаем подобрать идеальный вариант под ваш запрос.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <Steps totalSteps={totalSteps} currentStep={step} />
      </div>
      <div
        className={cn(
          'absolute w-full z-[1001] flex flex-col items-center justify-between min-h-screen pt-[62px] pb-[106px] transition-all',
          bg(4),
          step === 4 ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className='pb-5'>
          <h1 className='text-2xl uppercase text-center text-white font-cormorant'>
            Adylbekova <br /> Buyer
          </h1>
          <div className='max-w-[357px] mt-[176px] bg-[#3333331A] backdrop-blur-2xl px-[10px] py-[20px] text-white text-center rounded mb-[23px]'>
            <Icon
              name='starDuoTone'
              size='md'
              color={palette.gold}
              className='mx-auto'
            />
            <h2 className='text-3xl uppercase font-cormorant my-[19px]'>
              Покупка реплик
            </h2>
            <div>
              <p>
                - это умный выбор для тех, кто хочет выглядеть дорого без лишних
                трат.
              </p>
              <hr className='my-4 w-1.5 mx-auto' />
              <p>Мы делаем всё, чтобы вы были довольны качеством и сервисом!</p>
            </div>
          </div>
          <div className='max-w-[357px]'>
            <Button
              className='w-full rounded text-xl'
              size='xl'
              variant='white'
              onClick={nextStep}
            >
              Перейти к покупкам
              <Icon
                name='arrowUpRight'
                size='sm'
                height={18}
                width={18}
                color={palette.black}
              />
            </Button>
          </div>
        </div>
        <Steps totalSteps={totalSteps} currentStep={step} />
      </div>
    </>
  );
}
