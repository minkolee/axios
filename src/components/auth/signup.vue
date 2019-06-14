<template>
    <div id="signup">
        <div class="signup-form">
            <form @submit.prevent="onSubmit">
                <div class="input" :class="{invalid: $v.email.$error}">
                    <label for="email">Mail</label>
                    <input
                            type="email"
                            id="email"
                            @blur="$v.email.$touch()"
                            v-model="email">
                    <p v-if="!$v.email.email">请输入正确的Email地址。</p>
                    <p v-if="!$v.email.required && $v.email.$dirty">Email地址不能为空。</p>
                </div>
                <div class="input" :class="{invalid: $v.age.$error}">
                    <label for="age">Your Age</label>
                    <input
                            id="age"
                            @blur="$v.age.$touch()"
                            v-model="age">
                    <p v-if="!$v.age.required && $v.age.$dirty">年龄不能为空。</p>
                    <p v-if="!$v.age.numeric && $v.age.$dirty">必须输入数字。</p>
                    <p v-if="!$v.age.minValue && $v.age.$dirty &&$v.age.numeric">年龄必须大于{{ $v.age.$params.minValue.min
                        }}岁。</p>
                </div>
                <div class="input" :class="{invalid: $v.password.$error}">
                    <label for="password">Password</label>
                    <input
                            type="password"
                            id="password"
                            @blur="$v.password.$touch()"
                            v-model="password">
                </div>
                <div class="input" :class="{invalid: $v.confirmPassword.$error}">
                    <label for="confirm-password">Confirm Password</label>
                    <input
                            type="password"
                            id="confirm-password"
                            @blur="$v.confirmPassword.$touch()"
                            v-model="confirmPassword">
                </div>
                <div class="input">
                    <label for="country">Country</label>
                    <select id="country" v-model="country">
                        <option value="usa">USA</option>
                        <option value="india">India</option>
                        <option value="uk">UK</option>
                        <option value="germany">Germany</option>
                    </select>
                </div>
                <div class="hobbies">
                    <h3>Add some Hobbies</h3>
                    <button @click="onAddHobby" type="button">Add Hobby</button>
                    <div class="hobby-list">
                        <div
                                :class="{invalid: $v.hobbyInputs.$each[index].$error}"
                                class="input"
                                v-for="(hobbyInput, index) in hobbyInputs"
                                :key="hobbyInput.id">
                            <label :for="hobbyInput.id">Hobby #{{ index }}</label>
                            <input
                                    type="text"
                                    :id="hobbyInput.id"
                                    @input="$v.hobbyInputs.$each[index].value.$touch()"
                                    v-model="hobbyInput.value">
                            <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
                        </div>
                        <p v-if="!$v.hobbyInputs.minLength || !$v.hobbyInputs.required">You have to select at least {{
                            $v.hobbyInputs.$params.minLength.min }} hobby(s).</p>
                    </div>
                </div>
                <div class="input inline" :class="{invalid: $v.terms.$invalid}">
                    <input
                            type="checkbox"
                            id="terms"
                            @change="$v.terms.$touch()"
                            v-model="terms">
                    <label for="terms">Accept Terms of Use</label>
                </div>
                <div class="submit">
                    <button :disabled="$v.$invalid" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, email, numeric, minValue, minLength, sameAs, requiredUnless} from 'vuelidate/lib/validators';

    export default {
        data() {
            return {
                email: '',
                age: null,
                password: '',
                confirmPassword: '',
                country: 'usa',
                hobbyInputs: [],
                terms: false
            }
        },

        validations: {
            email: {
                required,
                email,
                myVal: val => {
                    if (val === '') return true
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(val === 'test@test.com')
                        }, 2000)
                    })
                }
            },
            age: {
                required,
                numeric,
                minValue: minValue(18)
            },
            password: {
                required,
                minLength: minLength(4)
            },
            confirmPassword: {
                //直接传入字符串
                // sameAs: sameAs("saner")

                //传入当前实例的属性值
                sameAs: sameAs(v => v.password)
            },
            terms: {
                required: requiredUnless(v => {
                    return v.country === 'germany'
                })
            },
            hobbyInputs: {
                required,
                minLength: minLength(2),
                //$each表示当前array中的每一个元素
                //所以其中要对这个元素的属性进行验证
                //$each代表的是hobbyInput对象，要验证其value，验证器中的属性就是value
                $each: {
                    value: {
                        required,
                        minLength: minLength(5)
                    }
                }
            }
        },

        computed: {
            errorStyle: function () {
                if (!this.$v.email.$dirty) {
                    console.log(this.$v.email.$dirty)
                    return false;
                } else {
                    console.log(this.$v.email.$error)
                    if (this.$v.email.$error) {
                        return true
                    } else {
                    }
                    return false;
                }
            }
        },

        methods: {
            onAddHobby() {
                const newHobby = {
                    id: Math.random() * Math.random() * 1000,
                    value: ''
                }
                this.hobbyInputs.push(newHobby)
            },
            onDeleteHobby(id) {
                this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
            },
            onSubmit() {
                const formData = {
                    email: this.email,
                    age: this.age,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    country: this.country,
                    hobbies: this.hobbyInputs.map(hobby => hobby.value),
                    terms: this.terms
                };
                console.log("Email is " + formData.email)
                console.log("Email is " + formData.password)

                // axios.post('/signupNewUser?key=AIzaSyAtwQ-RL7GKu0T1h4kOy32JRXmbmQPqiHM', {
                //   email: formData.email,
                //   password: formData.password,
                //   returnSecureToken: true
                // })
                //         .then(response => {
                //           console.log(response);
                //         })
                //         .catch(error=> {
                //           console.log(error);
                //         });
                this.$store.dispatch('signup', {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                }).then(() => console.log("action-signup执行完成"));
            }
        }
    }
</script>

<style scoped>
    .signup-form {
        width: 400px;
        margin: 30px auto;
        border: 1px solid #eee;
        padding: 20px;
        box-shadow: 0 2px 3px #ccc;
    }

    .input {
        margin: 10px auto;
    }

    .input.invalid label {
        color: red;
    }

    .input.invalid input {
        border: 1px solid red;
        background-color: #ffc9aa;
    }

    .input label {
        display: block;
        color: #4e4e4e;
        margin-bottom: 6px;
    }

    .input.inline label {
        display: inline;
    }

    .input input {
        font: inherit;
        width: 100%;
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid #ccc;
    }

    .input.inline input {
        width: auto;
    }

    .input input:focus {
        outline: none;
        border: 1px solid #521751;
        background-color: #eee;
    }

    .input select {
        border: 1px solid #ccc;
        font: inherit;
    }

    .hobbies button {
        border: 1px solid #521751;
        background: #521751;
        color: white;
        padding: 6px;
        font: inherit;
        cursor: pointer;
    }

    .hobbies button:hover,
    .hobbies button:active {
        background-color: #8d4288;
    }

    .hobbies input {
        width: 90%;
    }

    .submit button {
        border: 1px solid #521751;
        color: #521751;
        padding: 10px 20px;
        font: inherit;
        cursor: pointer;
    }

    .submit button:hover,
    .submit button:active {
        background-color: #521751;
        color: white;
    }

    .submit button[disabled],
    .submit button[disabled]:hover,
    .submit button[disabled]:active {
        border: 1px solid #ccc;
        background-color: transparent;
        color: #ccc;
        cursor: not-allowed;
    }
</style>
