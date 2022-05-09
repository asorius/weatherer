import React, { KeyboardEvent, FormEvent, useContext } from 'react';
import { Ctx } from '../context/index';
import Input from './Input';
import IterableUL from './IterableUL';
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

  const selectedController = (name?: string) => {
    if (name) {
      const selectedLocationData: LocationData = suggestionList.find(
        (obj: LocationData) => obj.name === name
      ) || { name: '', coords: [0, 0] };
      setSelected(name);
      selectedLocationData && setCoords(selectedLocationData.coords);
    } else {
      setSuggestionList([]);
    }
  };
  const handleSubmit = () => {
    context?.dispatch({
      type: 'loading',
    });
    setInputValue('');
    selectedController(selected);
    const weatherKey = process.env.REACT_APP_WEATHER_KEY;
    const weatherAPI = async (target: string, key: string | undefined) => {
      try {
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
        <Input updateFunction={updateFn} value={inputValue}></Input>
        <IterableUL
          list={suggestionList}
          submit={handleSubmit}
          listController={selectedController}></IterableUL>
      </div>
    </form>
  );
}
