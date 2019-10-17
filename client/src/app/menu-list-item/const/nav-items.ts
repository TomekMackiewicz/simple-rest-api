export const NAV_ITEMS = [
    {
        displayName: 'dashboard',
        iconName: 'dashboard',
        route: 'admin/dashboard'
    },
    {
        displayName: 'user traits',
        iconName: 'fingerprint',
        children: [
            {
                displayName: 'education status',
                iconName: 'school',
                route: 'admin/education-status/list',
            }
        ]
    },     
];
