import React, {
  KeyboardEvent,
  SyntheticEvent,
  FormEvent,
  useContext,
} from 'react';
import { Ctx } from '../context/index';
import Input from './Input';
const locationAPI = async (target: string, key: string | undefined) => {
  try {
    const mapboxResponse = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${target}.json?access_token=${key}&cachebuster=1625641871908&autocomplete=true&types=place`
    );
    const js = await mapboxResponse.json();
    const list = js.features.map((el: any) => el.place_name);
    return list;
  } catch (e) {
    return e;
  }
};

export default function Form() {
  const [inputValue, setInputValue] = React.useState('');
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [found, setFound] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [inputFocus, setInputFocus] = React.useState(false);
  const selectElement = React.createRef<HTMLSelectElement>();
  React.useEffect(() => {
    const APICalls = async (
      target: string,

      locationKey = process.env.REACT_APP_MAPBOX_KEY
    ) => {
      if (target.length < 3 || found) {
        if (target.length === 0) {
          setFound(false);
        }
        setSuggestionList([]);

        return;
      }
      try {
        const suggestions = await locationAPI(target, locationKey);
        suggestions.find((el: string) => el === target) ||
          setSuggestionList(suggestions);
      } catch (e) {
        return { error: true };
      }
    };
    APICalls(inputValue);
  }, [inputValue, found]);
  const context = useContext(Ctx);
  React.useEffect(() => {
    const APICalls = async () => {
      selected &&
        context?.dispatch({
          type: 'get-weather',
          payload: { target: selected },
        });
      console.log('action submitted');
    };
    APICalls();
  }, [selected]);
  const updateFn = (currentTarget: HTMLInputElement) => {
    setInputValue(currentTarget.value);
  };
  const onKeyboardAction = (key: KeyboardEvent<HTMLInputElement>) => {
    key.code === 'ArrowDown' && selectElement.current?.focus();
    key.code === 'Escape' && setSuggestionList([]);
  };
  const handleSubmit = () => {
    setInputValue('');
    setSuggestionList([]);
    setFound(true);
  };
  return (
    <form
      id='input-form'
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}
      onBlur={(e: FormEvent<HTMLFormElement>) => {
        selectElement.current &&
          selectElement.current.contains(e.currentTarget) &&
          setSuggestionList([]);
      }}
      className='grid place-content-center w-full'>
      <div className='bg-white/90 rounded-lg py-6 px-16 max-w-5xl lg:w-full m-6 relative'>
        <Input
          onPressedKey={onKeyboardAction}
          updateFunction={updateFn}
          isFocused={inputFocus}
          value={inputValue}></Input>
        <select
          id='suggestions-list'
          name='suggestion-list'
          form='input-form'
          size={suggestionList.length}
          value={selected}
          onChange={(e: SyntheticEvent<HTMLOptionElement>) => {
            setSelected(e.currentTarget.value);
          }}
          onKeyDown={(key: KeyboardEvent<HTMLInputElement>) => {
            key.code === 'Enter' && handleSubmit();
            key.code === 'Escape' &&
              setInputFocus(true) &&
              setSuggestionList([]);
          }}
          className={`${
            suggestionList.length > 0 ? 'absolute' : 'hidden'
          } transition-all ease-out duration-700 top-3/4 left-[5%] lg:left-[10%] p-2 bg-slate-800 rounded-lg text-white before:content-[''] before:absolute before:left-[15%] before:top-0 before:h-4 before:w-4 before:bg-slate-800 before:rotate-45 before:-translate-y-1/2 `}
          ref={selectElement}>
          {suggestionList.map((city, i) => (
            <option
              key={i}
              value={city}
              onClick={(e: SyntheticEvent<HTMLOptionElement>) => {
                e.preventDefault();
                setSelected(e.currentTarget.value);
                handleSubmit();
              }}
              className='p-2 cursor-pointer hover:text-mainBlue'>
              {city}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
