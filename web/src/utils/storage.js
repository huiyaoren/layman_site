const storage = {

    load: (key) => {
        return window.localStorage.getItem(key)
    },
    set: (key, value) => {
        return window.localStorage.setItem(key, value)
    }
}

export default storage