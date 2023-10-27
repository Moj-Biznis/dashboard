import { Outlet } from "react-router-dom"

const ServiceMain = () => {
    const navigation = [
        { name: 'Products', href: 'products', current: location.pathname === "/company_settings/price_plans/products" },
        { name: 'Services', href: 'services', current: location.pathname === "/company_settings/price_plans/services" },
        { name: 'Packages', href: 'packages', current: location.pathname === "/company_settings/price_plans/packages" },
    ]

    const transformedHtml = navigation.map((element) => {

        const classNames = (...classes: string[]) => {
            return classes.filter(Boolean).join(' ')
        }

        return <li key={element.name} role="presentation">
            <a
                href={element.href}
                className={classNames('my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent    dark:hover:bg-transparent border-primary-400 ', element.current ? "bg-slate-500 text-white" : "text-neutral-500")}
            >{element.name}</a>
        </li>
    })
    return (
        <>
            <ul
                className="mb-4 flex list-none flex-row flex-wrap border-b-0 pl-0"
                id="tabs-tab3"
                role="tablist"
                data-te-nav-ref>
                {transformedHtml}
            </ul>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default ServiceMain