import React, {
  KeyboardEvent,
  SyntheticEvent,
  FormEvent,
  useContext,
} from 'react';
import { Ctx } from '../context/index';
import Input from './Input';
import Option from './Option';
interface LocationData {
  name: string;
  coords: number[];
}
const locationAPI = async (target: string, key: string | undefined) => {
  try {
    const mapboxResponse = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${target}.json?access_token=${key}&cachebuster=1625641871908&autocomplete=true&types=place`
    );
    const js = await mapboxResponse.json();
    const list = js.features.map((el: any) => ({
      name: el.place_name,
      coords: el.geometry.coordinates,
    }));
    return list;
  } catch (e) {
    return e;
  }
};

export default function Form() {
  const [inputValue, setInputValue] = React.useState('');
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [inputFocus, setInputFocus] = React.useState(false);
  const [coords, setCoords] = React.useState([0, 0]);
  const selectElement = React.createRef<HTMLSelectElement>();
  const context = useContext(Ctx);
  React.useEffect(() => {
    const APICalls = async (
      target: string,
      locationKey = process.env.REACT_APP_MAPBOX_KEY
    ) => {
      if (target.length < 3) {
        setSuggestionList([]);
        return;
      }
      try {
        const suggestions = await locationAPI(target, locationKey);
        setSuggestionList(suggestions);
      } catch (e) {
        return { error: true };
      }
    };
    APICalls(inputValue);
  }, [inputValue]);

  const updateFn = (currentTarget: HTMLInputElement) => {
    setInputValue(currentTarget.value);
  };
  const onKeyboardAction = (key: KeyboardEvent<HTMLInputElement>) => {
    key.code === 'ArrowDown' &&
      selectElement.current?.focus() &&
      setSelected(selectElement.current?.children[0].innerHTML);
    key.code === 'Escape' && setSuggestionList([]);
  };
  const selectedController = (name: string) => {
    const selectedLocationData: LocationData = suggestionList.find(
      (obj: LocationData) => obj.name === name
    ) || { name: '', coords: [0, 0] };
    setSelected(name);
    console.log(selectedLocationData);
    selectedLocationData && setCoords(selectedLocationData.coords);
  };
  const handleSubmit = () => {
    context?.dispatch({
      type: 'loading',
    });
    setInputValue('');
    setSuggestionList([]);
    const weatherKey = process.env.REACT_APP_WEATHER_KEY;
    const weatherAPI = async (target: string, key: string | undefined) => {
      try {
        console.log('Getting data for : ' + target);
        const [lon, lat] = coords;
        const responseCurrent = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}&units=metric`
        );
        const responseForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${key}&units=metric`
        );

        const current = await responseCurrent.json();
        const forecast = await responseForecast.json();
        context?.dispatch({
          type: 'get-weather',
          payload: { current, forecast },
        });
      } catch (e) {
        return { error: true };
      }
    };
    setTimeout(() => {
      selected && weatherAPI(selected, weatherKey);
    }, 500);
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
            selectedController(e.currentTarget.value);
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
          {suggestionList.map((cityData: LocationData, i) => (
            <Option
              key={i}
              city={cityData.name}
              actionFn={(e) => {
                e.preventDefault();
                selectedController(e.currentTarget.value);
                handleSubmit();
              }}
            />
          ))}
        </select>
      </div>
    </form>
  );
}
