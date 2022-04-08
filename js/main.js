{
    let form = document.getElementById('cityForm');
    console.log(form)

    async function handleSubmit(e){
        e.preventDefault();
        city = e.target.city.value
        console.log(city)

        let weatherData = await getWeatherData(city)
        console.log(weatherData)
        let name = weatherData['name']
    };
    
    async function getWeatherData(city){
        let api_key = "9849260713672bbe2e27a9060f844ba4";
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
            let data = await res.json()
            return data
        } catch(e){
            console.error(e)
        }
    };


    form.addEventListener('submit', handleSubmit);

}