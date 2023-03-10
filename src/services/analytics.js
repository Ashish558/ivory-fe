import { gapi } from "gapi-script";
import ReactGA from 'react-ga4'

export const authenticate = () => {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
export const GA_updateProfile = () => {
    ReactGA.event({
        category: 'update_profile',
        action: 'User profile updated',
    })
}
export const GA_signup = () => {
    ReactGA.event({
        category: 'sign_up',
        action: 'sign_up',
    })
}
export const GA_login = () => {
    ReactGA.event({
        category: 'login',
        action: 'login',
        label: 'User logged in',
    })
}

export const GA_liveSessionRegister= () => {
    ReactGA.event({
        category: 'liveevent_register ',
        action: 'liveevent_register ',
        label: 'Registered for live session',
    })
}
export const GA_programRegister = () => {
    ReactGA.event({
        category: 'program_register',
        action: 'program_register ',
        label: 'Registered for Program',
    })
}

export const GA_startActivity= () => {
    ReactGA.event({
        category: 'start_activity',
        action: 'start_activity',
        label: 'Started Activity',
    })
}

export const GA_submitActivity = () => {
    ReactGA.event({
        category: 'activity_submit',
        action: 'activity_submit',
        label: 'Submitted Activity',
    })
}

export const GA_beginCheckout = () => {
    ReactGA.event({
        category: 'begin_checkout',
        action: 'begin_checkout',
        label: 'Began checkout',
    })
}

export const GA_share = (text, item_id) => {
    ReactGA.event('share', {
        category: 'share',
        action: `Shared ${text}`,
        content_type: text,
        item_id
    })
}

export const GA_bannerClick = (content_type, item_id) => {
    ReactGA.event('banner_click', {
        category: 'banner_click',
        action: `banner_click`,
        content_type,
        item_id
    })
}