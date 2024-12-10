import {Link, useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    if (error.status === 404) {
        return (
            <main className='grid min-h-[100vh] place-items-center px-8'>
                <div className='text-center'>
                    <p className='text-9xl font-semibold text-primary'>404</p>
                    <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
                        сторінку не знайдено
                    </h1>
                    <p className='mt-6 text-lg leading-7'>
                        Вибачте, ми не можемо знайти сторінку яку ви шукаєте
                    </p>
                    <div className='mt-10'>
                        <Link to='/' className='btn btn-secondary'>
                            на домашню
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className='grid min-h-[100vh] place-items-center px-8'>
            <h4 className='text-center font-bold text-4xl'>Якась жахлива несподіванка ...</h4>
        </main>
    );
};

export default ErrorPage;
