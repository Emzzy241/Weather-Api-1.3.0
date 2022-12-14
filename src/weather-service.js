// business Logic file
// fine we now use fetch in making our API calls,
// our API call is still an asynchronous code, but wouldn't it be fun if we could write an asynchronous code as a synchronous one?
// don't forget an asynchronous code is the code that runs later but a synchronous code runs right now
// we do that with an async function which was added in ES 2017(Remember ES6 is EcmaScript2015 )
export class WeatherService {
    static async getWeather(city) {
        // You can only use the awake keyword in async functions, you must 
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
            // using the await keyword tells javascript to await the response openweathermap endpoint will give him, and only when that response is gotten would we assign it to the constant variable
            // the rest of the service code is the same after we used "await" keyword -we throw an error if the response property isn't ok. If the response property is ok, we return the streaming data.
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        } catch (error) {
            return error.message;
        }
        // we wrapped our call in a try catch block because We aren't resolving or rejecting promises here so we need to handle any errors ourselves.
    }
}

        // all what worked for the first class is the same thing that would be executed here also, next we update our UI logic file

        export class CountryWeatherService {
            static async getCountryWeather(country) {
                try{
                    const myCountryResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`);
                    // a branch to determine whether my response has an ok property or not
                    if(!myCountryResponse.ok){
                        // if there isn't an ok property in my myCountryResponse, throw in an error
                        throw Error(myCountryResponse.statusText);
                    }
                    // if there is an ok property, return me myCountryResponse but make sure you call the .json() method on it to ensure JavaScript can understand it
                    return myCountryResponse.json();

                } catch (countryError){
                    // the catch block would help me handle the errors and display to me the "message" key in my error object 
                    return countryError.message;
                }
            }
        }

        // after updating the service codes, off to the UI logic code to work with our new features(async and await functions)
        