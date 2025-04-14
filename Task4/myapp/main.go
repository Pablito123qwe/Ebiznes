package main

import (
    "myapp/database"
    "myapp/controllers"
    "github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()
    database.Connect()

    // Routes
    e.GET("/products", controllers.GetProducts)
    e.POST("/products", controllers.CreateProduct)
	e.GET("/products/:id", controllers.GetProductByID)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)

    e.Logger.Fatal(e.Start(":8080"))
}
