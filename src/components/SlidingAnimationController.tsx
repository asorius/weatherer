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
    console.log(data);
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
  return <div className={`duration-1000 ${animation()}`}>{children}</div>;
}
