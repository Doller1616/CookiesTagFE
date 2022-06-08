
// Style Html Elelments --------------------------------------------------
const innerContainerStyle = `"background: rgba(29, 155, 240,0.1);
font-size: 1.2rem;
text-align: left;
padding: 15px;
border-radius: 8px;
box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
overflow: hidden;
position: relative;
margin: 8px;"`,

innerConatinerBgStyle = `"border-radius: 50%;border-radius: 50%;
height: 500px;
width: 100%;
top: -15%;
position: absolute;
right: 8%;
background: rgb(231,189,232);
background: linear-gradient(90deg, rgba(231,189,232,.2) 0%, rgba(15,173,223,.5) 69%);
z-index: -1;"`,

buttonStyle = `"background: rgba(29, 155, 240);
color: #fff;
border: none;
padding: 8px;
border-radius: 3px;
cursor: pointer; 
box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;"`
//--------------------------------------------------------------



function initialization( custom, fn ){
   const {key='_ht_gdpr', value='1', days=60, position='top'} = custom || {};
  //Container Element  
  const popupContainer = document.createElement('div');
  const cookie_consent = getCookie("_ht_gdpr");
  const visiblity = (cookie_consent != "") ? "none" : "block"
  popupContainer.id = 'cookieNotice';
  popupContainer.style.display = visiblity;
  popupContainer.style.position = 'fixed';
  popupContainer.style.width = '100%';
  popupContainer.style[position] = 0;
  popupContainer.style.right = 0;

  // Add function in windows Object  
  window.thCookiesAccept = () => {
    deleteCookie(key);
    setCookie(key, value, days);
    popupContainer.style.display = "none";
    fn({key,value,days,position});
  }

  // Popup Html/view
  popupContainer.innerHTML = `<div style=${innerContainerStyle}>
  <header style="font-weight: bold"> Cookies </header>
  <p>This website uses cookies for better user experence!</p>
  <button style=${buttonStyle} onclick="window.thCookiesAccept();">Accept</button> 
  <div style=${innerConatinerBgStyle}></div>
  </div>`;

  return popupContainer
    
}

// Create cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = window.decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const initializeCookie = initialization