export default {
    install(Vue) {
        Vue.prototype.$rules = {
            nameRequired: [
                v => !!v || 'Nazwa jest wymagana',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters.'
            ],
            emailRequired: [
                v => !!v || 'E-mail jest wymagany',
                v => /.+@.+\..+/.test(v) || 'Nieprawidłowy e-mail'
            ],
            required: [v => !!v || 'To pole jest wymagane'],
            maxLength: [(v = '') => v.length <= 100 || 'Maksymalnie 100 znaków!']
        }
    }
}