import React from 'react';
import { Ctx } from '../context';
import Option from './Option';
interface Props {
  list: { name: string; coords: number[] }[];
  listController: (k?: string) => void;
  submit: () => void;
}
export default function IterableUL({ list, submit, listController }: Props) {
  const [currentOption, setOption] = React.useState(0);
  const context = React.useContext(Ctx);
  React.useEffect(() => {
    const focusValue = context?.state.inputFocus;
    focusValue && setOption(0);
  }, [context?.state.inputFocus]);
  const onKeyboardAction = (key: React.KeyboardEvent<HTMLInputElement>) => {
    const optionCalculator = (actionType: number) => {
      listController(list[currentOption].name);
      const nextValue = currentOption + actionType;
      const inc = () =>
        nextValue < length ? setOption(nextValue) : setOption(0);
      const dec = () =>
        nextValue >= 0 ? setOption(nextValue) : setOption(length - 1);

      actionType > 0 ? inc() : dec();
    };
    const length = list.length;
    switch (key.code) {
      case 'ArrowDown': {
        optionCalculator(1);
        return;
      }
      case 'ArrowUp': {
        optionCalculator(-1);
        return;
      }
      case 'Enter': {
        console.log('enter ');
        submit();
        return;
      }
      case 'Escape': {
        console.log('esc ');
        listController();
        context?.dispatch({ type: 'input-focus-change' });
        return;
      }

      default:
        break;
    }
  };
  const ul = React.useRef<HTMLUListElement>();
  React.useEffect(() => {
    const focused = context?.state.inputFocus;
    focused ? ul.current?.focus() : ul.current?.blur();
  }, [context?.state.inputFocus]);
  return (
    <ul
      role='listbox'
      tabIndex={1}
      onKeyDown={onKeyboardAction}
      ref={ul}
      className={`${
        list.length > 0 ? 'absolute' : 'hidden'
      } transition-all ease-out duration-700 top-3/4 left-[5%] lg:left-[10%] p-2 bg-slate-800 rounded-lg text-white before:content-[''] before:absolute before:left-[15%] before:top-0 before:h-4 before:w-4 before:bg-slate-800 before:rotate-45 before:-translate-y-1/2 `}>
      {list.map((cityData: any, i) => (
        <Option
          key={i}
          city={cityData.name}
          isSelected={i === currentOption}
          actionFn={(e) => {
            e.preventDefault();
            submit();
          }}
        />
      ))}
    </ul>
  );
}
