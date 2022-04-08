{
    let form = document.getElementById('cityForm');
    console.log(form)

    async function handleSubmit(e){
        e.preventDefault();
        city = e.target.city.value
        console.log(city)

        let weatherData = await getWeatherData(city)
        console.log(weatherData)
        buildWeatherCard(weatherData)
        
    };
    
    async function getWeatherData(city){
        //Update weather api_key when you want to use it
        let api_key = "";
        try{
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`)
            let data = await res.json()
            return data
        } catch(e){
            console.error(e)
        }
    };


    async function buildWeatherCard(data){
        // Area to build the Card
        const build_area = document.getElementById('cityDisplay')
        build_area.innerHTML = ""
        // Get Weather Data
        let name = data['name']
        let country = data['sys']['country']
        let current_weather = data['main']['temp']
        let feels_like = data['main']['feels_like']
        let daily_high = data['main']['temp_max']
        let daily_low = data['main']['temp_min']
        let icon_id = data['weather'][0]['icon']
        let icon_url = `http://openweathermap.org/img/wn/${icon_id}@2x.png`

        // Create Card
        const card = document.createElement('div')
        card.className = 'card'

        // Create card image and add to card
        const card_img = document.createElement('img')
        card_img.className = 'card-img-top'
        card_img.src = icon_url
        card.append(card_img)

        // Create Card body
        const card_body = document.createElement('div')
        card_body.className = 'card-body'

        // Card Title (City name)
        const card_title = document.createElement('h5')
        card_title.className = 'card-title'
        card_title.innerHTML = `${name} | ${country}`
        card_body.append(card_title)

        // Card Text - Current Weather 
        const card_current_weather = document.createElement('p')
        card_current_weather.className = 'card-text'
        card_current_weather.innerHTML = `Currently: ${current_weather}\u00B0 F | Feels Like: ${feels_like}\u00B0 F`
        card_body.append(card_current_weather)

        // Card Text - High / Low
        const card_high_low = document.createElement('p')
        card_high_low.className = 'card-text'
        card_high_low.innerHTML = `High: ${daily_high}\u00B0 F | Low: ${daily_low}\u00B0 F `
        card_body.append(card_high_low)

        // Add Card Body to Card, add Card to build area
        card.append(card_body)
        build_area.append(card)

        day_night = icon_id.slice(-1)
        console.log(day_night, typeof day_night)
        if (day_night == 'd'){ // Day
            console.log('hello world')
            document.body.className = 'bg-warning'
            document.body.style = ""
        } else { // Night
            console.log('goodbye world')
            card.className = 'card text-dark'
            document.body.className = "text-light"
            document.body.style = `height: 100vh; background: radial-gradient(#484650, #000005);`
        }

    }


    form.addEventListener('submit', handleSubmit);

}