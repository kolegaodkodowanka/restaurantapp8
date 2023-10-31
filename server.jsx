import { createServer, Model } from "miragejs"



createServer({
    models: {
        vans: Model,
    },

    seeds(server) {
        server.create("van", { id: "1", name: "Lumberjack Burger", price: 34, description: "with iceberg lettuce, tomatoes, onion rings, 150g of beef, fried egg, bacon, and garlic sauce.", type: "classic", imageUrl: "burger1.jpg" })
        server.create("van", { id: "2", name: "BBQ Burger", price: 32, description: " with iceberg lettuce, red onion, pickles, jalapeno, 150g beef, cheddar cheese, bacon, and BBQ sauce.", type: "classic", imageUrl: "burger2.jpg" })
        server.create("van", { id: "3", name: "Bacon Burger", price: 33, description: "Bacon Burger with iceberg lettuce, red onion, pickles, tomato, 150g beef, cheddar cheese, bacon, ketchup, and mayonnaise.", type: "classic", imageUrl: "burger3.jpg" })
        server.create("van", { id: "4", name: "Burger Classic", price: 29, description: "with iceberg lettuce, red onion, pickles, tomato, 150g beef, ketchup, and mayonnaise.", type: "classic", imageUrl: "burger4.jpg" })
        server.create("van", { id: "5", name: "Cheese Burger", price: 30, description: "with iceberg lettuce, red onion, pickles, tomato, 150g beef, cheddar cheese, ketchup, and mayonnaise.", type: "classic", imageUrl: "burger5.jpg" })
        server.create("van", { id: "6", name: "Hot Chilli Burger", price: 32, description: "with iceberg lettuce, red onion, pickles, tomato, jalapeno, 150g beef, cheddar cheese, and chili sauce.", type: "classic", imageUrl: "burger6.jpg" })
        server.create("van", { id: "7", name: "Vegan Delight Burger", price: 34, description: "with crispy iceberg lettuce, red onion, pickles, ripe tomato, a savory plant-based patty, vegan cheese, vegan mayo", type: "vegan", imageUrl: "burger6.jpg" })
        server.create("van", { id: "8", name: "Vegetarian Garden Burger", price: 32, description: "savor the freshness of iceberg lettuce, red onion, pickles, juicy tomato, a hearty veggie patty, cheddar cheese", type: "vegetarian", imageUrl: "burger6.jpg" })
    },

    routes() {
        this.namespace = "api"
        this.logging = false

        this.get("/vans", (schema, request) => {
            return schema.vans.all()
        })
        
        this.get("/vans/:id", (schema, request) => {
            const id = request.params.id
            return schema.vans.find(id)
        })
    }
})