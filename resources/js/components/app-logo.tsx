import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 items-center justify-center">
                <AppLogoIcon className="size-9" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm text-sidebar-primary-foreground">
                <span className="mb-0.5 truncate leading-tight font-semibold uppercase tracking-widest text-xs text-green-200 dark:text-green-100">
                    Restyle
                </span>
                <span className="text-[10px] text-green-400 dark:text-green-300">
                    Waste less · Wear more
                </span>
            </div>
        </>
    );
}
