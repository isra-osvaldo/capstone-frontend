export const Categories = [
    {
        "name": "Electrónica",
        "icon": "mdi mdi-cellphone",
        "active": false,
        "sub_categories": [
            {"name": "Celulares y Smartphones", "icon": "mdi mdi-cellphone"},
            {"name": "Televisores", "icon": "mdi mdi-television"},
            {"name": "Cámaras y Accesorios", "icon": "mdi mdi-camera"},
            {"name": "Audio y Sonido", "icon": "mdi mdi-headphones"},
            {"name": "Computadoras y Laptops", "icon": "mdi mdi-laptop"}
        ]
    },
    {
        "name": "Hogar y Decoración",
        "icon": "mdi mdi-home",
        "active": false,
        "sub_categories": [
            {"name": "Muebles", "icon": "mdi mdi-sofa-single"},
            {"name": "Electrodomésticos", "icon": "mdi mdi-washing-machine"},
            {"name": "Decoración", "icon": "mdi mdi-lava-lamp"},
            {"name": "Iluminación", "icon": "mdi mdi-lightbulb"},
            {"name": "Jardinería", "icon": "mdi mdi-flower"}
        ]
    },
    {
        "name": "Moda",
        "icon": "mdi mdi-tshirt-crew",
        "active": false,
        "sub_categories": [
            {"name": "Ropa", "icon": "mdi mdi-hanger"},
            {"name": "Zapatos", "icon": "mdi mdi-shoe-heel"},
            {"name": "Zapatillas", "icon": "mdi mdi-shoe-formal"},
            {"name": "Bolsos y Accesorios", "icon": "mdi mdi-purse"},
            {"name": "Relojes", "icon": "mdi mdi-watch"},
            {"name": "Joyas", "icon": "mdi mdi-diamond"}
        ]
    },
    {
        "name": "Deportes y Aire Libre",
        "icon": "mdi mdi-football",
        "active": false,
        "sub_categories": [
            {"name": "Equipamiento Deportivo", "icon": "mdi mdi-dumbbell"},
            {"name": "Ropa Deportiva", "icon": "mdi mdi-tshirt-crew"},
            {"name": "Camping y Excursionismo", "icon": "mdi mdi-campfire"},
            {"name": "Ciclismo", "icon": "mdi mdi-bike"},
            {"name": "Fitness", "icon": "mdi mdi-weight-lifter"}
        ]
    },
    {
        "name": "Libros y Entretenimiento",
        "icon": "mdi mdi-book-open-page-variant",
        "active": false,
        "sub_categories": [
            {"name": "Libros", "icon": "mdi mdi-book"},
            {"name": "Películas y Series", "icon": "mdi mdi-movie"},
            {"name": "Música", "icon": "mdi mdi-music-note"},
            {"name": "Juegos de Mesa", "icon": "mdi mdi-cards-playing-outline"},
            {"name": "Instrumentos Musicales", "icon": "mdi mdi-guitar-electric"}
        ]
    },
    {
        "name": "Belleza y Cuidado Personal",
        "icon": "mdi mdi-face-man-shimmer",
        "active": false,
        "sub_categories": [
            {"name": "Maquillaje", "icon": "mdi mdi-lipstick"},
            {"name": "Cuidado de la Piel", "icon": "mdi mdi-face-woman-shimmer-outline"},
            {"name": "Perfumes", "icon": "mdi mdi-bottle-tonic"},
            {"name": "Cuidado del Cabello", "icon": "mdi mdi-hair-dryer"},
            {"name": "Higiene Personal", "icon": "mdi mdi-face-man-shimmer"}
        ]
    },
    {
        "name": "Electrodomésticos",
        "icon": "mdi mdi-washing-machine",
        "active": false,
        "sub_categories": [
            {"name": "Lavadoras y Secadoras", "icon": "mdi mdi-washing-machine"},
            {"name": "Refrigeradores", "icon": "mdi mdi-fridge"},
            {"name": "Hornos y Estufas", "icon": "mdi mdi-air-filter"},
            {"name": "Pequeños Electrodomésticos", "icon": "mdi mdi-blender"}
        ]
    },
    {
        "name": "Juguetes y Niños",
        "icon": "mdi mdi-baby",
        "active": false,
        "sub_categories": [
            {"name": "Juguetes para Niños", "icon": "mdi mdi-toy-brick"},
            {"name": "Ropa Infantil", "icon": "mdi mdi-baby-carriage"},
            {"name": "Bebés", "icon": "mdi mdi-baby-bottle"},
            {"name": "Juegos Educativos", "icon": "mdi mdi-puzzle"}
        ]
    }
];

export const SubCategories = [
    "Celulares y Smartphones",
    "Televisores",
    "Cámaras y Accesorios",
    "Audio y Sonido",
    "Computadoras y Laptops",
    "Muebles",
    "Electrodomésticos",
    "Decoración",
    "Iluminación",
    "Jardinería",
    "Ropa",
    "Zapatos",
    "Zapatillas",
    "Bolsos y Accesorios",
    "Relojes",
    "Joyas",
    "Equipamiento Deportivo",
    "Ropa Deportiva",
    "Camping y Excursionismo",
    "Ciclismo",
    "Fitness",
    "Libros",
    "Películas y Series",
    "Música",
    "Juegos de Mesa",
    "Instrumentos Musicales",
    "Maquillaje",
    "Cuidado de la Piel",
    "Perfumes",
    "Cuidado del Cabello",
    "Higiene Personal",
    "Lavadoras y Secadoras",
    "Refrigeradores",
    "Hornos y Estufas",
    "Pequeños Electrodomésticos",
    "Juguetes para Niños",
    "Ropa Infantil",
    "Bebés",
    "Juegos Educativos"
];


export type Category = {
    name: string,
    icon: string,
    active: boolean,
    sub_categories: SubCategory[]
}

export type SubCategory = {
    name: string,
    icon: string
}