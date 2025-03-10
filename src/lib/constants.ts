import {
    User,
    Home,
    File,
    Trash2,
    Settings
} from "lucide-react";

export const data = {
    user: {
        name: "Abdul Tawab",
        email: "tawabmasood31july@gmail.com",
        avatar: User
    },

    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home
        },
        {
            title: "Templates",
            url: "/templates",
            icon: File
        },
        {
            title: "Trash",
            url: "/trash",
            icon: Trash2
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings
        }
    ]
};