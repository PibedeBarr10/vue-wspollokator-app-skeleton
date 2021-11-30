export default {
    nameRequired: [
        v => !!v || 'Nazwa jest wymagana',
        v => (v && v.length <= 30) || 'Nazwa musi mieć mniej niż 30 znaków.'
    ],
    emailRequired2: [

    ],
    emailRequired (val) {

        return [
            (v) => {
                return val => !!val || 'E-mail jest wymagany'
            }
        ]
    },
    required: [v => !!v || 'To pole jest wymagane'],
    maxLength: [(v = '') => v.length <= 100 || 'Maksymalnie 100 znaków!']
}