import React from 'react';
import { Ctx } from '../context';
import Option from './Option';
interface Props {
  list: { name: string; coords: number[] }[];
  listController: (k?: { name: string; coords: number[] }) => void;
  submit: () => void;
}
export default function IterableUL({
  list,
  submit,
  listController: selectionController,
}: Props) {
  const [currentOption, setOption] = React.useState(0);
  const context = React.useContext(Ctx);
  const onKeyboardAction = (key: React.KeyboardEvent<HTMLUListElement>) => {
    const selectedOptionManager = (actionType: number) => {
      const nextRawValue = currentOption + actionType;
      const nextValue =
        nextRawValue < 0
          ? length - 1
          : nextRawValue < length
          ? nextRawValue
          : 0;
      selectionController(list[nextValue]);
      setOption(nextValue);
    };
    const length = list.length;
    switch (key.code) {
      case 'ArrowDown': {
        selectedOptionManager(1);
        return;
      }
      case 'ArrowUp': {
        selectedOptionManager(-1);
        return;
      }
      case 'Enter': {
        selectionController(list[currentOption]);
        submit();
        return;
      }
      case 'Escape': {
        selectionController();
        context?.dispatch({ type: 'input-focus-change' });
        return;
      }

      default:
        break;
    }
  };
  const ul = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    const focused = context?.state.inputFocus;
    focused ? ul.current?.focus() : ul.current?.blur();
    focused && setOption(0);
  }, [context?.state.inputFocus]);
  return (
    <ul
      role='listbox'
      tabIndex={0}
      onKeyDown={onKeyboardAction}
      ref={ul}
      className={`${
        list.length > 0 ? 'absolute' : 'hidden'
      } transition-all ease-out duration-700 top-3/4 left-[5%] lg:left-[10%] p-2 bg-slate-800 rounded-lg text-white before:content-[''] before:absolute before:left-[15%] before:top-0 before:h-4 before:w-4 before:bg-slate-800 before:rotate-45 before:-translate-y-1/2 z-[200]`}>
      {list.map((cityData: any, i) => (
        <Option
          key={i}
          city={cityData.name}
          isSelected={i === currentOption}
          actionFn={(e) => {
            // e.preventDefault();
            selectionController(list[i]);
            submit();
          }}
        />
      ))}
    </ul>
  );
}
