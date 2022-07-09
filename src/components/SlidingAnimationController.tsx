import React from 'react';
import { Ctx } from '../context';
export default function SlidingAnimationController({
  children,
  body,
}: {
  children: React.ReactNode;
  body?: boolean;
}) {
  const context = React.useContext(Ctx);
  const [toGrow, setToGrow] = React.useState(false);
  React.useEffect(() => {
    const data = context?.state.data;
    if (data) {
      setToGrow(true);
    } else {
      return;
    }
  }, [context?.state.data]);
  const animation1 = '-translate-y-[20%]';
  const animation2 = 'translate-y-[-5%]';
  const animation = () => {
    if (toGrow) {
      return body ? animation2 : animation1;
    } else {
      return '';
    }
  };
  const loading = (
    <div className='flex items-center justify-center w-full '>
      <div className='w-24 h-24 border-l-2  rounded-full animate-spin border-mainBlue'></div>
    </div>
  );

  return (
    <>
      <div
        className={`duration-1000 ${animation()} ${
          body &&
          'lg:grid lg:grid-flow-row lg:place-items-center lg:divide-y-8 lg:divide-transparent'
        }`}>
        {children}
      </div>
    </>
  );
}
