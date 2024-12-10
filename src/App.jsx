
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
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
import GroupSubjectsPage from "./pages/group-subjects-page.jsx";

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
                        element: <Outlet/>,
                        errorElement: <ErrorPage/>,
                        loader: loaderIndPlans(store),
                        // loader: loaderGroup(store),
                        children: [
                            {
                                index: true,
                                element: <GroupPage/>,
                                // loader: loaderGroup(store),
                                loader: loaderIndPlans(store),
                                errorElement: <ErrorPage/>,
                            },
                            {
                                path: 'subjects',
                                element: <GroupSubjectsPage/>,
                                // loader: loaderGroup(store),
                                loader: loaderIndPlans(store),
                                errorElement: <ErrorPage/>,
                            },
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
