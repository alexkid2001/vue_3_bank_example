import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Введите email')
            .email()
    )
    const PASSWORD_MIN_LENGTH = 6;
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required()
            .min(PASSWORD_MIN_LENGTH, `Пароль должен быть больше ${PASSWORD_MIN_LENGTH} символов`)
    )

    const onSubmit = handleSubmit(async values => {
        console.log('Form:', values)
        try {
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch (e) {}

    })

    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    watch(isTooManyAttempts, value => {
        if(value) {
            setTimeout(() => submitCount.value = 0, 1500)
        }
    })

    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        onSubmit,
        isSubmitting,
        submitCount,
        isTooManyAttempts,
    }
}