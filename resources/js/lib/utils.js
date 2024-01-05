import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Swal from 'sweetalert2'
import moment from "moment";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Function that copies the targeted text on the clipboard and sends out an alert to let the user know
 * @param {*} target 
 * @returns 
 */

export function copy(target) {
    if(typeof target !== "undefined") {
        navigator.clipboard.writeText(target);
        Swal.fire({
            titleText: 'Copied to clipoard',
            text: '"' + target + '" is now copied',
            icon: 'success',
            toast: true,
            position: 'bottom-end',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }
}

/**
 * Function that Uppercases a string
 * @param {*} $string 
 * @returns 
 */
export function uppercase(string) {
  return string.charAt(0).toUpperCase() + $string.slice(1);
}

/**
 * Function that returns a string with the age in Years and months
 * @param {*} $date 
 * @returns 
 */
export function calculateAge(date) {
  // Get the current date and targeted date in moments.js format
  var now = moment();
  var targetDate = moment(date);

  // Calculate the difference 
  var age = moment.duration(now.diff(targetDate));
  
  // Initiate our variables
  var years = "";
  var months = "";

  // If more than one year/month we use the plural
  years = age.years() == 1 ? ' year ' : ' years ';
  months = age.months() == 1 ? ' month' : ' months';

  // Return the age in string
  return age.years() + years + age.months() + months;
}

/**
 * Function that returns a string with the age in Years and months
 * @param {*} $date 
 * @returns 
 */
export function calculateDays(date) {
  // Get the current date and targeted date in moments.js format
  var now = moment();
  var targetDate = moment(date);

  // Calculate the difference 
  var age = moment.duration(now.diff(targetDate));
  
  // Initiate our variable
  var days = "";

  // If more than one year/month we use the plural
  days = age.days() == 1 ? ' day' : ' days';

  // Return the age in string
  return age.days() + days;
}