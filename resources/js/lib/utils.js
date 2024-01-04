import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Swal from 'sweetalert2'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Function that copies the targeted text on the clipboard and sends out an alert to let the user know
 * @param {*} $target 
 * @returns 
 */

export function copy($target) {
    if(typeof $target !== "undefined") {
        navigator.clipboard.writeText($target);
        Swal.fire({
            titleText: 'Copied to clipoard',
            text: '"' + $target + '" is now copied',
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
export function uppercase($string) {
  return $string.charAt(0).toUpperCase() + $string.slice(1);
}