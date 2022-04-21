import React, { KeyboardEvent } from 'react';
import Input from './Input';

export default function Form() {
  const [inputValue, setValue] = React.useState('');
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [found, setFound] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const parentRef = React.createRef<HTMLUListElement>();
  React.useEffect(() => {
    const APICalls = async (
      target: string,
      key = process.env.REACT_APP_WEATHER_KEY
    ) => {
      if (target.length < 3 || found) {
        if (inputValue.length === 0) {
          setFound(false);
        }
        setSuggestionList([]);

        return;
      }
      try {
        const mapboxResponse = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${target}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
        );
        const js = await mapboxResponse.json();
        console.log({ js });
        const list = js.features.map((el: any) => el.place_name);
        list.find((el: string) => el === inputValue) || setSuggestionList(list);

        // console.log({ current, forecast });
      } catch (e) {
        return { error: true };
      }
    };
    APICalls(inputValue);
  }, [inputValue, found]);
  const updateFn = (currentTarget: HTMLInputElement) => {
    setValue(currentTarget.value);
    console.log();
  };
  const onDownArrow = (key: KeyboardEvent<HTMLInputElement>) => {
    key.code === 'ArrowDown' && parentRef.current && parentRef.current.focus();
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submite');
      }}
      onBlur={(e) => {
        parentRef.current &&
          parentRef.current.contains(e.currentTarget) &&
          setSuggestionList([]);
      }}
      className='grid place-content-center w-full'>
      <div className='bg-white/90 rounded-lg py-6 px-16 max-w-5xl lg:w-full m-6 relative'>
        <Input
          onPressedKey={onDownArrow}
          updateFunction={updateFn}
          value={inputValue}></Input>
        <ul
          id='suggestions_list'
          role='listbox'
          className={`${
            suggestionList.length > 0 ? 'absolute' : 'hidden'
          } top-3/4 left-[5%] lg:left-[10%] p-2 bg-slate-800 rounded-lg text-white before:content-[''] before:absolute before:left-[15%] before:top-0 before:h-4 before:w-4 before:bg-slate-800 before:rotate-45 before:-translate-y-1/2 `}
          ref={parentRef}>
          {suggestionList.map((city, i) => (
            <li
              key={i}
              data-value={city}
              role='option'
              aria-selected={false}
              onClick={(e) => {
                e.preventDefault();
                setValue(e.currentTarget.dataset.value || '');
                setSuggestionList([]);
                setFound(true);
              }}
              className='p-2 cursor-pointer hover:text-mainBlue'>
              {city}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
