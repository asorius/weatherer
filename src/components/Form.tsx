import React, { FormEvent, useContext } from 'react';
import { Ctx } from '../context/index';
import Input from './Input';
import IterableUL from './IterableUL';
// interface LocationData {
//   name: string;
//   coords: number[];
// }
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
  const [selected, setSelected] = React.useState({ name: '', coords: [0, 0] });
  const selectElement = React.useRef<HTMLSelectElement>();
  const context = useContext(Ctx);

  const updateFn = (currentTarget: HTMLInputElement) => {
    setInputValue(currentTarget.value);
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
        setSelected(suggestionList[0]);
      } catch (e) {
        return { error: true };
      }
    };
    APICalls(currentTarget.value);
  };

  const selectionController = (selectedObj?: {
    name: string;
    coords: number[];
  }) => {
    if (selectedObj) {
      setSelected(selectedObj);
    } else {
      setSuggestionList([]);
    }
  };
  const handleSubmit = () => {
    context?.dispatch({
      type: 'loading',
    });
    setInputValue('');
    setSuggestionList([]);
    selectionController(selected);

    const weatherKey = process.env.REACT_APP_WEATHER_KEY;
    const weatherAPI = async (key: string | undefined) => {
      try {
        const [lon, lat] = selected.coords;

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
      selected && weatherAPI(weatherKey);
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
      <div className='bg-white/90 rounded-lg py-6 px-16 max-w-5xl lg:w-full m-6 relative z-[200]'>
        <Input updateFunction={updateFn} value={inputValue}></Input>
        <IterableUL
          list={suggestionList}
          submit={handleSubmit}
          listController={selectionController}></IterableUL>
      </div>
      <div
        className={`
        w-full transition-all 
      ${
        suggestionList.length > 0
          ? `max-h-[20rem] h-[12rem] lg:h-[7rem]`
          : 'max-h-1 h-0'
      } 
      `}></div>
    </form>
  );
}
