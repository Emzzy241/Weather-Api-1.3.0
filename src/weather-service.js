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

        // export default class WeatherService {
        //     static async getWeather(city) {
        //         try {
        //             const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
        //             if (!response.ok) {
        //                 throw Error(response.statusText);
        //             }
        //             return response.json();
        //         } catch (error) {
        //             return error.message;
        //         }
        //     }
        // }


        // all what worked for the first class is the same thing that would be executed here also, next we update our UI logic file

        export class CountryWeatherService {
            static getCountryWeather(country) {
                // return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`)
                //     .then(function (countryResponse) {
                //         if (!countryResponse.ok) {
                //             throw Error(countryResponse.statusText);
                //         }
                //         return countryResponse.json();
                //     }) // didn't add a semi colon here because it threw an error, but when I added it to the end of the catch block everything was fine
                //     .catch(function (error) {
                //         return error.message;
                //     })

                try{
                    const myCountryResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`);
                }
            }
        }

        // after updating the service codes, off to the UI logic code to work with our new features(async and await functions)
        