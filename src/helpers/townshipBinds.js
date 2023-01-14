const townshipBinds = [
    {township: "Cerro",
    connections: [
        "Playa",
        "Plaza de la Revolución",
        "Diez de Octubre",
        "Boyeros",
        "Marianao",
        "Centro Habana",
        "Arroyo Naranjo"]
    },
    {township: "Diez de Octubre",
    connections: [
        "Habana Vieja",
        "San Miguel",
        "Arroyo Naranjo",
        "Cerro",
        "Centro Habana",
        "Boyeros",
        "Regla"]
    },
    {township: "Habana Vieja",
    connections: [
        "Centro Habana",
        "Regla",
        "Diez de Octubre",
        "San Miguel" ]
    },
    {township: "Centro Habana",
    connections: [
        "Habana Vieja",
        "Plaza de la Revolución",
        "Cerro"
    ]
    },
    {township: "Plaza de la Revolución",
    connections: [
                  "Marianao",
                  "Playa",
                  "Centro Habana",
                  "Cerro"
                 ]
    },
    {township: "Playa",
    connections: [
                  "Marianao",
                  "La Lisa",
                  "Plaza de la Revolución",
                  "Cerro"
                 ]
    },
    {township: "Marianao",
    connections: [
                  "Playa",
                  "La Lisa",
                  "Plaza de la Revolución",
                  "Cerro",
                  "Boyeros"
                 ]
    },
    {township: "La Lisa",
    connections: [
                  "Playa",
                  "Marianao",
                  "Boyeros"
                 ]
    },
    {township: "Boyeros",
    connections: [
                  "Marianao",
                  "La Lisa",
                  "Cerro",
                  "Diez de Octubre",
                  "Arroyo Naranjo"
                 ]
    },
    {township: "Arroyo Naranjo",
    connections: [
                  "Cerro",
                  "Diez de Octubre",
                  "Boyeros",
                  "San Miguel",
                  "Cotorro"
                 ]
    },
    {township: "San Miguel del Padrón",
    connections: [
                  "Habana Vieja",
                  "Diez de Octubre",
                  "Arroyo Naranjo",
                  "Cotorro",
                  "Regla",
                  "Guanabacoa"
                 ]
    },
    {township: "Cotorro",
    connections: [
                  "Arroyo Naranjo",
                  "San Miguel",
                  "Guanabacoa"
                 ]
    },
    {township: "Guanabacoa",
    connections: [
                  "Regla",
                  "San Miguel",
                  "Cotorro",
                  "Habana del Este"
                 ]
    },
    {township: "Habana del Este",
    connections: [
                  "Regla",
                  "Guanabacoa"
                 ]
    },
    {township: "Habana del Este",
    connections: [
                  "Regla",
                  "Guanabacoa"
                 ]
    },
    {township: "Regla",
    connections: [
                  "Habana Vieja",
                  "Habana del Este",
                  "Guanabacoa",
                  "Diez de Octubre",
                  "San Miguel del Padrón",
                 ]
    },
]
export default townshipBinds;