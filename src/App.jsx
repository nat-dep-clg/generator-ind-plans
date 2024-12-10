
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    ErrorPage,
    GroupPage,
    IndPlansPage,
    LoginPage,
    RootPage,
    StudentPage,
    ViewStudentPage,
    WorkShopPage
} from "./pages";
import {actionLogin} from "./actions";
import {store} from "./store/index.js";
import {loaderGroup, loaderIndPlans} from "./loaders";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
              index: true,
              element: <WorkShopPage/>,
              errorElement: <ErrorPage/>,
            },
            {
                path: "ind-plans",
                element: <IndPlansPage/>,
                errorElement: <ErrorPage/>,
                loader: loaderIndPlans(store),
                children: [
                    {
                        path: ':group',
                        element: <GroupPage/>,
                        errorElement: <ErrorPage/>,
                        loader: loaderIndPlans(store),
                        // loader: loaderGroup(store),
                        children: [
                            {
                                path: ":studID/view",
                                element: <ViewStudentPage />,
                                // loader: loaderGroup(store),
                                loader: loaderIndPlans(store),
                                errorElement: <ErrorPage/>,
                            },
                            {
                                path: ":studID",
                                element: <StudentPage/>,
                                // loader: loaderGroup(store),
                                loader: loaderIndPlans(store),
                                errorElement: <ErrorPage/>
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
        action: actionLogin(store)

    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
