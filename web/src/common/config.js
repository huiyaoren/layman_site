import storage from '../utils/storage'

let config= {
    server_host: 'http://192.168.40.73:5001',

}

console.log('storage', storage)
Object.keys(config).map((key, index) => {
    config[key] = storage.load(key) || config[key]
})

export default config
