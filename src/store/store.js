import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    weatherData: {
        icon: "icon",
        temp: 0,
        text: "text",
        location: "location",
        city: "Seoul",
    },
    toggle: false,
  },
  mutations: {
    updateWeather(state, payload) {
        state.weatherData.icon = payload.weather[0].icon;
        state.weatherData.temp = payload.main.temp;
        state.weatherData.text = payload.weather[0].description;
        state.weatherData.location = payload.sys.country;
        state.weatherData.city = payload.name;
        // console.log(state.weatherData);
    },
    addCount(state, payload) {
      state.count +=  payload;
    },
    OnSearchCity(state, payload) {
      state.weatherData.city = payload;
    },
    toggleButton(state) {
        state.toggle = !state.toggle;
    }
  },
  actions: {
    getWeather(context) {
        // console.log("mounted");
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=${API_KEY}`;
      
        fetch(API_URL)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            context.commit('updateWeather', data)
        //     weatherData.value.icon = data.weather[0].icon;
        //     weatherData.value.temp = data.main.temp;
        //     weatherData.value.text = data.weather[0].description;
        //     weatherData.value.location = data.sys.country;
        //     weatherData.value.city = data.name;
        //     console.log(weatherData.value);
          })
          .catch((err) => {
            alert("에러가 발생했습니다. 잠시 후 다시 시도해 주세요.");
          });
      }
      

  },
});
