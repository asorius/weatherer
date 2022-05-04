import React from 'react';
import { Ctx } from '../context';
import Option from './Option';
interface Props {
  list: string[];
  listController: () => void;
  submit: () => void;
}
export default function IterableUL({ list, submit, listController }: Props) {
  const [currentOption, setOption] = React.useState(0);
  const context = React.useContext(Ctx);
  const onKeyboardAction = (key: React.KeyboardEvent<HTMLInputElement>) => {
    switch (key.code) {
      case 'ArrowDown': {
        console.log('down ');

        setOption(currentOption + 1);
        return;
      }
      case 'ArrowUp': {
        console.log('up');

        setOption(currentOption - 1);
        return;
      }
      case 'Enter': {
        console.log('enter ');

        submit();
        return;
      }
      case 'Escape': {
        console.log('esc ');

        context?.dispatch({ type: 'input-focus-change' });
        listController();
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
