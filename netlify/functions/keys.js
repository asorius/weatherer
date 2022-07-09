exports.handler = async function (event, context) {
  console.log('from netlify function');
  try {
    const weatherKey = await fetch(`${process.env.REACT_APP_WEATHER_KEY}`);
    const mapboxKey = await fetch(`${process.env.REACT_APP_MAPBOX_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ weatherKey, mapboxKey }),
    };
  } catch (error) {
    return { statusCode: 404, body: error.toString() };
  }
};
