import { initializeCookie } from './cookies-popover.js';
const div = document.getElementById('popup-element');

(() => {

    /* 
        PARAMETERS
    {
       key='_ht_gdpr', // string default: '_ht_gdpr'
       value='1', // string default: 1
       days=60, // number default:60 
       position='bottom' //string default: top, top/bottom
    },
       
       callback : fn
       
       */

    const element = initializeCookie();
    div.append(element);

})();