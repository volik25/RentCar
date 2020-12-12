import { MenuItem, PrimeIcons as pi } from "primeng/api";

export const menuItems: MenuItem[] = [
    {
        label: 'Главная',
        icon: pi.HOME,
        routerLink: ['']
    },
    {
        label: 'Автомобили',
        routerLink: ['/cars']
    },
    {
        label: 'Контакты',
        icon: pi.BOOK,
        routerLink: ['/contacts']
    },
    {
        label: 'Личный кабинет',
        icon: pi.USER,
        routerLink: ['/profile']
    }
]