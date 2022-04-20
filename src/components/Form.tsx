import React from 'react';
import Input from './Input';

export default function Form() {
  const [inputValue, setValue] = React.useState('');
  const [suggestionList, setSuggestionList] = React.useState([]);
  const [found, setFound] = React.useState(false);
  const divRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    const APICalls = async (
      target: string,
      key = process.env.REACT_APP_WEATHER_KEY
    ) => {
      if (target.length < 3 || found) {
        inputValue.length === 0 && setFound(false);
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submite');
      }}
      onBlur={(e) => {
        divRef.current &&
          divRef.current.contains(e.currentTarget) &&
          setSuggestionList([]);
      }}
      className='grid place-content-center w-full'>
      <div className='bg-white/90 rounded-lg py-6 px-16 max-w-5xl lg:w-full m-6 relative'>
        <Input
          updateFunction={(value) => setValue(value)}
          value={inputValue}></Input>
        <div
          className={`${
            suggestionList.length > 0 ? 'absolute' : 'hidden'
          } top-3/4 left-[5%] lg:left-[10%] p-2 bg-black/80 rounded-lg text-white max-h-52`}
          ref={divRef}>
          {suggestionList.map((city, i) => (
            <option
              key={i}
              value={city}
              className='p-2 cursor-pointer hover:text-mainBlue'
              onClick={(e) => {
                e.preventDefault();
                setValue(e.currentTarget.value);
                setSuggestionList([]);
                setFound(true);
                // console.log(e.currentTarget.value);
              }}>
              {city}
            </option>
          ))}
        </div>
      </div>
    </form>
  );
}
