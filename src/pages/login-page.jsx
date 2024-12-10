import {Form} from "react-router-dom";
import SubmitBtn from "../components/SubmitBtn.jsx";

const LoginPage = () => {
    return (
        <section className='h-screen grid place-items-center'>
            <Form
                method='post'
                className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
            >
                <h4 className='text-center text-3xl font-bold'>Ласкаво просимо!</h4>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Електронна пошта
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Пароль для входу
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className='mt-4'>
                    <SubmitBtn text='Вхід'/>
                </div>

            </Form>
        </section>
    );
};

export default LoginPage;
