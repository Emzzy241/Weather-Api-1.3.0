
// the UserInterface Logic file

// After I've made use of Promises, I would like to make use of 


import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// importing the WeatherService and CountryWeatherService class that we need in the UI logic file

import { WeatherService, CountryWeatherService } from "./weather-service.js";

// separation of logic code 

// importing app logo IMage

import jsBadgeImage from "./assets/images/js-badge.svg";






$(document).ready(() => {

    // working with app Logo Image 
    let appImage = $(".appImg");
    appImage.attr("href", jsBadgeImage);

    
    
    // a function for clearing out the form fields and other things from the DOM(Document Object Module)
    function clearFields() {
        $("#location").val("");
        $(".showErrors").text("");
        $(".showHumidity").text("");
        $(".showTemp").text("");
        $(".showTempCelsius").text("");
        $(".showTempFahrenheit").text("");
    }
    
    function clearCountryFields() {
        $("#country").val("");
        $(".showErrorsCountry").text("");
        $(".showHumidityCountry").text("");
        $(".showTempCountry").text("");
        $(".showTempCelsiusCountry").text("");
        $(".showTempFahrenheitCountry").text("");
    }



    $('#weatherLocation').click(() => {
        let city = $('#location').val();
        // running the clearFields() function to clear out all our fields(both the form fields and the other fields for revealingthe answers)
        clearFields();

        // now we're working with callbacks, we're back to writing(callbacks) a function that would be called to show user values of temperature
        // makeFirstApiCall(city);

        // If you're not a fan of IIFE like me, you can comment this IIFE function, ncomment both the 
        // calling of the makeFirstApiCall() function above and also uncomment where I wrote the function down below
        // it would still work and don't get scared; I personally tried both

        (async function () {
            const response = await WeatherService.getWeather(city);
            getMyWeatherValues(response);
        })();



        // also, this is a good opportunity to separate out our code further, taking code that alters the DOM and putting it in its own getMyWeatherValues() function. So our code is a bit cleaner once we do that.
        function getMyWeatherValues(myResponseBody) {
            // in the branch below we are also taking a new different approach because we are saying to JavaScript
            // if there is a .main property inside the response I will be getting(that tells me my request was successful), show my user all of the temperature values and if not, 
            // show the error message to our users(thankfully, the promise object I would be getting has a message property)
            if (myResponseBody.main) {
                // getting the fahrenheit temperature value
                let myTempValue = 1.8 * (myResponseBody.main.temp - 273) + 32;
                // let myTempValue = Math.trunc(1.8 * (response.main.temp - 273) + 32); -- I didn't trunc or floor the values because I want my value to be concised for my users
                // console.log(myTempValue);

                $('.showHumidity').text(`The humidity in ${city} is ${myResponseBody.main.humidity}%`);
                $('.showTemp').text(`The temperature in Kelvin is ${myResponseBody.main.temp}k.`);
                $('.showTempCelsius').text(`The temperature in degree Celsius is ${myResponseBody.main.temp - 273}c.`);
                $(".showTempFahrenheit").text(`The temperature in Fahrenheit is ${myTempValue}f`);
            } else {
                // However, if the previous promise returns an error, that error will be passed into the response of getElements(). JavaScript Error objects have a handy message property so we can get the message via response.message.
                // here we don't need the .message property anymore like we did in version 1.2.0 and this is because
                //  because our static async method returns the error message if it fails, which means we just need to grab the ${myResponseBody} in the error conditional of the callback.
                $('.showErrors').text(`There was an error in processing your request: ${myResponseBody}`);
            }

            // It's important to emphasize that we are grabbing properties from two completely different things in the callback above. If there's a successful API call, we are parsing the body of the API response. 
            // If there isn't, we are just grabbing the message property from a JavaScript Error object.

        }



        // update for UI:
        // the first api call is for the top value get from my user in the first form
        // We now have a new async function called makeFirstApiCall(). Inside that function, we await a response to our API call and then run our callback once the data stream from the API response is complete. 
        // Remember that we can only use the await keyword inside an async function, which is why we need to separate out the code like this.

        // uncomment this (makeFirstApiCall()) function if you don't want to make use of an IIFE(Immediately Invoked Function  Expression) like I did after I called my clearFields(); function
        // async function makeFirstApiCall(city) {
        //     const response = await WeatherService.getWeather(city);
        //     getMyWeatherValues(response);
        // }


    });





    // ---- another way of making me API call that saves me the stress of coming up with a new function name
    // In my other call over Here, I did not use an IIFE(Immediately Invoked FUnction Expression)
    // I named an async function and used that unlike I did above


    $("#countryWeather").click(function () {
        let country = $("#country").val();

        clearCountryFields();

        // since no IIFE is used, I'm calling my makeSecondApiCall() function and passing a country value I take from my user in it
        makeSecondApiCall(country);


        function getMyCountryWeatherValues(myCountryBody) {
            if (myCountryBody.main) {
                let myCountryTempValue = 1.8 * (myCountryBody.main.temp - 273) + 32;
                // console.log(myCountryTempValue);

                $('.showHumidityCountry').text(`The humidity in ${country} is ${myCountryBody.main.humidity}%`);
                $('.showTempCountry').text(`The temperature in Kelvin is ${myCountryBody.main.temp}k.`);
                $('.showTempCelsiusCountry').text(`The temperature in degree Celsius is ${myCountryBody.main.temp - 273}c.`);
                $(".showTempFahrenheitCountry").text(`The temperature in Fahrenheit is ${myCountryTempValue}f`);
            } else {
                $('.showErrorsCountry').text(`There was an error processing your request: ${myCountryBody}`);

            }
        }

        // no more .then's in UI logic file to handle a resolved or a rejected promise
        // all thanks to Async and Awake functions

        async function makeSecondApiCall(country) {
            const countryResponse = await CountryWeatherService.getCountryWeather(country);
            getMyCountryWeatherValues(countryResponse);
        }


    });
});


// While the fetch() method is very useful, some developers prefer using XMLHttpRequest objects
// Ultimately, even if you prefer using fetch(), it's still important to have a good understanding of XMLHttpRequest objects and promises because fetch() relies on both.

// Which one to use between .fetch() and XMLHttpRequest() ?

// Use XMLHttpRequest objects and promises if you want full control over being able to reject a promise.
// Use fetch() if you don't want to worry about dealing with XMLHttpRequest objects and want any advantages that come with streaming the data instead of waiting for the full response.
