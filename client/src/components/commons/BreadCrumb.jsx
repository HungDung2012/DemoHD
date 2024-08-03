import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from 'react-router-dom';

export const breadcrumbRoutes = [
    { path: '/', breadcrumb: 'Home' },
    { path: '/properties', breadcrumb: 'Properties' },

]

const BreadCrumb = () => {
    const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);

    return (
        <React.Fragment>
            {breadcrumbs.map(({ match, breadcrumb }, idx) => (
                <NavLink key={match.pathname} to={match.pathname}>
                    <span className='hover:underline' > {breadcrumb} </span>
                    {idx < breadcrumbs.length - 1 && <span> / </span>}
                </NavLink>
            ))}
        </React.Fragment>
    )
}

export default BreadCrumb